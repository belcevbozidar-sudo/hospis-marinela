import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../_lib/session.js";
import { convex, api, SERVER_SECRET } from "../_lib/convexServer.js";

const MAX_BASE64_CHARS = 6 * 1024 * 1024 * 1.4; // грубо горно ограничение преди декодиране

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  const contentType: unknown = body.contentType;
  const dataBase64: unknown = body.dataBase64;

  if (typeof contentType !== "string" || !ALLOWED_TYPES.has(contentType)) {
    res.status(400).json({ error: "unsupported_type" });
    return;
  }
  if (typeof dataBase64 !== "string" || dataBase64.length === 0) {
    res.status(400).json({ error: "missing_data" });
    return;
  }
  if (dataBase64.length > MAX_BASE64_CHARS) {
    res.status(413).json({ error: "payload_too_large" });
    return;
  }

  try {
    const { url } = await convex.action(api.files.upload, {
      secret: SERVER_SECRET,
      contentType,
      dataBase64,
    });
    res.status(200).json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "upload_failed";
    if (message.includes("payload_too_large")) {
      res.status(413).json({ error: "payload_too_large" });
      return;
    }
    if (message.includes("unsupported_type")) {
      res.status(400).json({ error: "unsupported_type" });
      return;
    }
    res.status(500).json({ error: "upload_failed" });
  }
}
