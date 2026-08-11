import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ZodError } from "zod";
import { requireAuth } from "../../_lib/session.js";
import { convex, api, SERVER_SECRET } from "../../_lib/convexServer.js";
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
    const result = await convex.query(api.content.adminGet, { secret: SERVER_SECRET, key });
    res.status(200).json(result);
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

    await convex.mutation(api.content.adminSet, { secret: SERVER_SECRET, key, value });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "method_not_allowed" });
}
