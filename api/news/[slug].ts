import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseAdmin } from "../_lib/supabaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const slug = String(req.query.slug);
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("id, title, slug, excerpt, content, images, cover_image_url, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  if (!data) {
    res.status(404).json({ error: "not_found" });
    return;
  }

  const news = {
    ...data,
    images:
      Array.isArray(data.images) && data.images.length > 0
        ? data.images
        : data.cover_image_url
          ? [data.cover_image_url]
          : [],
  };

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  res.status(200).json({ news });
}
