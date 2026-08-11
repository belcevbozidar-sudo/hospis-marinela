import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convex, api } from "../_lib/convexServer.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const content = await convex.query(api.content.getAllPublic, {});

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  res.status(200).json({ content });
}
