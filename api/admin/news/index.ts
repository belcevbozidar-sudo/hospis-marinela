import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../../_lib/session.js";
import { convex, api, SERVER_SECRET } from "../../_lib/convexServer.js";
import { slugify } from "../../_lib/slug.js";
import { validateImages } from "../../_lib/validateImages.js";
import { triggerRedeploy } from "../../_lib/deployHook.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  if (req.method === "GET") {
    const rows = await convex.query(api.news.adminList, { secret: SERVER_SECRET });
    res.status(200).json({ news: rows });
    return;
  }

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const excerpt = body.excerpt ? String(body.excerpt).trim() : undefined;
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

    const created = await convex.mutation(api.news.adminCreate, {
      secret: SERVER_SECRET,
      title,
      slug,
      excerpt,
      content,
      images,
      published,
    });

    res.status(201).json({ news: created });

    if (published) void triggerRedeploy("news created & published");
    return;
  }

  res.status(405).json({ error: "method_not_allowed" });
}
