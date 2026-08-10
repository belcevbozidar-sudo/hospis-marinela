import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../../_lib/session.js";
import { supabaseAdmin } from "../../_lib/supabaseAdmin.js";
import { slugify } from "../../_lib/slug.js";
import { validateImages } from "../../_lib/validateImages.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ news: data });
    return;
  }

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const excerpt = body.excerpt ? String(body.excerpt).trim() : null;
    const published = Boolean(body.published);

    if (!title || !content) {
      res.status(400).json({ error: "title_and_content_required" });
      return;
    }

    let images: string[];
    try {
      images = validateImages(body.images ?? []);
    } catch {
      res.status(400).json({ error: "invalid_images" });
      return;
    }

    let slug = body.slug ? slugify(String(body.slug)) : slugify(title);
    if (!slug) slug = `novina-${Date.now()}`;

    // Гарантираме уникален slug
    const { data: existing } = await supabaseAdmin
      .from("news")
      .select("slug")
      .ilike("slug", `${slug}%`);
    if (existing && existing.some((r) => r.slug === slug)) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const { data, error } = await supabaseAdmin
      .from("news")
      .insert({
        title,
        slug,
        excerpt,
        content,
        images,
        cover_image_url: images[0] ?? null,
        published,
        published_at: published ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ news: data });
    return;
  }

  res.status(405).json({ error: "method_not_allowed" });
}
