import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../../_lib/session.js";
import { supabaseAdmin } from "../../_lib/supabaseAdmin.js";
import { slugify } from "../../_lib/slug.js";
import { validateImages } from "../../_lib/validateImages.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  const id = String(req.query.id);

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("news")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (!data) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    res.status(200).json({ news: data });
    return;
  }

  if (req.method === "PUT") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (typeof body.title === "string") update.title = body.title.trim();
    if (typeof body.content === "string") update.content = body.content.trim();
    if (typeof body.excerpt === "string") update.excerpt = body.excerpt.trim() || null;
    if (typeof body.slug === "string" && body.slug.trim()) update.slug = slugify(body.slug);

    if (body.images !== undefined) {
      let images: string[];
      try {
        images = validateImages(body.images);
      } catch {
        res.status(400).json({ error: "invalid_images" });
        return;
      }
      update.images = images;
      update.cover_image_url = images[0] ?? null;
    }

    if (typeof body.published === "boolean") {
      update.published = body.published;
      if (body.published) {
        const { data: current } = await supabaseAdmin
          .from("news")
          .select("published_at")
          .eq("id", id)
          .maybeSingle();
        if (!current?.published_at) {
          update.published_at = new Date().toISOString();
        }
      }
    }

    const { data, error } = await supabaseAdmin
      .from("news")
      .update(update)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (!data) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    res.status(200).json({ news: data });
    return;
  }

  if (req.method === "DELETE") {
    const { error } = await supabaseAdmin.from("news").delete().eq("id", id);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "method_not_allowed" });
}
