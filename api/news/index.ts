import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseAdmin } from "../_lib/supabaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("news")
    .select("id, title, slug, excerpt, images, cover_image_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  // Съвместимост със записи отпреди множествените снимки: ако
  // `images` е празен, но старото поле `cover_image_url` е зададено,
  // го показваме като единствена снимка.
  const news = (data ?? []).map((item) => ({
    ...item,
    images:
      Array.isArray(item.images) && item.images.length > 0
        ? item.images
        : item.cover_image_url
          ? [item.cover_image_url]
          : [],
  }));

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  res.status(200).json({ news });
}
