import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifySession } from "../_lib/session.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const authenticated = await verifySession(req);
  res.status(200).json({ authenticated });
}
