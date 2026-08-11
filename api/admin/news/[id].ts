import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../../_lib/session.js";
import { convex, api, SERVER_SECRET } from "../../_lib/convexServer.js";
import { slugify } from "../../_lib/slug.js";
import { validateImages } from "../../_lib/validateImages.js";
import type { Id } from "../../../convex/_generated/dataModel.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  const id = req.query.id as Id<"news">;

  if (req.method === "GET") {
    const row = await convex.query(api.news.adminGet, { secret: SERVER_SECRET, id });
    if (!row) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    res.status(200).json({ news: row });
    return;
  }

  if (req.method === "PUT") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
    const patch: {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      images?: string[];
      published?: boolean;
    } = {};

    if (typeof body.title === "string") patch.title = body.title.trim();
    if (typeof body.content === "string") patch.content = body.content.trim();
    if (typeof body.excerpt === "string") patch.excerpt = body.excerpt.trim();
    if (typeof body.slug === "string" && body.slug.trim()) patch.slug = slugify(body.slug);
    if (typeof body.published === "boolean") patch.published = body.published;

    if (body.images !== undefined) {
      try {
        patch.images = validateImages(body.images);
      } catch {
        res.status(400).json({ error: "invalid_images" });
        return;
      }
    }

    const updated = await convex.mutation(api.news.adminUpdate, {
      secret: SERVER_SECRET,
      id,
      ...patch,
    });

    if (!updated) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    res.status(200).json({ news: updated });
    return;
  }

  if (req.method === "DELETE") {
    await convex.mutation(api.news.adminDelete, { secret: SERVER_SECRET, id });
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "method_not_allowed" });
}
