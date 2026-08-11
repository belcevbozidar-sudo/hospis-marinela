import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convex, api } from "../_lib/convexServer.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const slug = String(req.query.slug);
  const news = await convex.query(api.news.getPublishedBySlug, { slug });

  if (!news) {
    res.status(404).json({ error: "not_found" });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  res.status(200).json({ news });
}
