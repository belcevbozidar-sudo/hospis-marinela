import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ZodError } from "zod";
import { requireAuth } from "../../_lib/session.js";
import { supabaseAdmin } from "../../_lib/supabaseAdmin.js";
import { isContentKey, validateContent } from "../../_lib/contentSchemas.js";

const MAX_BODY_BYTES = 512 * 1024; // 512 KB — далеч над реалната нужда

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  const key = String(req.query.key);
  if (!isContentKey(key)) {
    res.status(404).json({ error: "unknown_content_key" });
    return;
  }

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("value, updated_at")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ value: data?.value ?? null, updatedAt: data?.updated_at ?? null });
    return;
  }

  if (req.method === "PUT") {
    const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      res.status(413).json({ error: "payload_too_large" });
      return;
    }

    let body: { value?: unknown };
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
    } catch {
      res.status(400).json({ error: "invalid_json" });
      return;
    }

    let value: unknown;
    try {
      value = validateContent(key, body.value);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: "validation_failed", issues: err.issues });
        return;
      }
      throw err;
    }

    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "method_not_allowed" });
}
