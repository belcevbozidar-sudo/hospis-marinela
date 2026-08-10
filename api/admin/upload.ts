import crypto from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../_lib/session.js";
import { supabaseAdmin } from "../_lib/supabaseAdmin.js";

const BUCKET = "site-images";
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB декодирани — далеч над нуждите след клиентско компресиране

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  const contentType: unknown = body.contentType;
  const dataBase64: unknown = body.dataBase64;

  if (typeof contentType !== "string" || !ALLOWED_TYPES[contentType]) {
    res.status(400).json({ error: "unsupported_type" });
    return;
  }
  if (typeof dataBase64 !== "string" || dataBase64.length === 0) {
    res.status(400).json({ error: "missing_data" });
    return;
  }

  // Груба горна граница на base64 низа, преди изобщо да го декодираме
  // (base64 е ~4/3 от размера на суровите байтове).
  if (dataBase64.length > MAX_BYTES * 1.4) {
    res.status(413).json({ error: "payload_too_large" });
    return;
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(dataBase64, "base64");
  } catch {
    res.status(400).json({ error: "invalid_base64" });
    return;
  }

  if (buffer.length === 0 || buffer.length > MAX_BYTES) {
    res.status(413).json({ error: "payload_too_large" });
    return;
  }

  const ext = ALLOWED_TYPES[contentType];
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    upsert: false,
  });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  res.status(200).json({ url: data.publicUrl });
}
