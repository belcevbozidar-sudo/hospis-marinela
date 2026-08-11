import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireServerSecret } from "./lib/auth";

// ---------- Админ (изисква secret) ----------

export const adminList = query({
  args: { secret: v.string() },
  handler: async (ctx, { secret }) => {
    requireServerSecret(secret);
    const rows = await ctx.db.query("news").order("desc").collect();
    return rows;
  },
});

export const adminGet = query({
  args: { secret: v.string(), id: v.id("news") },
  handler: async (ctx, { secret, id }) => {
    requireServerSecret(secret);
    return await ctx.db.get(id);
  },
});

export const adminCreate = mutation({
  args: {
    secret: v.string(),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    images: v.array(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, { secret, title, slug, excerpt, content, images, published }) => {
    requireServerSecret(secret);
    const now = Date.now();

    let finalSlug = slug;
    const clashing = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", finalSlug))
      .first();
    if (clashing) finalSlug = `${slug}-${now.toString(36)}`;

    const id = await ctx.db.insert("news", {
      title,
      slug: finalSlug,
      excerpt,
      content,
      images,
      published,
      publishedAt: published ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });
    return await ctx.db.get(id);
  },
});

export const adminUpdate = mutation({
  args: {
    secret: v.string(),
    id: v.id("news"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, { secret, id, ...patch }) => {
    requireServerSecret(secret);
    const current = await ctx.db.get(id);
    if (!current) return null;

    const update: Record<string, unknown> = { updatedAt: Date.now() };
    if (patch.title !== undefined) update.title = patch.title;
    if (patch.excerpt !== undefined) update.excerpt = patch.excerpt;
    if (patch.content !== undefined) update.content = patch.content;
    if (patch.images !== undefined) update.images = patch.images;
    if (patch.slug !== undefined) update.slug = patch.slug;
    if (patch.published !== undefined) {
      update.published = patch.published;
      if (patch.published && !current.publishedAt) update.publishedAt = Date.now();
    }

    await ctx.db.patch(id, update);
    return await ctx.db.get(id);
  },
});

export const adminDelete = mutation({
  args: { secret: v.string(), id: v.id("news") },
  handler: async (ctx, { secret, id }) => {
    requireServerSecret(secret);
    await ctx.db.delete(id);
  },
});

// ---------- Публично (без secret — вижда го всеки посетител) ----------

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("news")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
    return rows.map((r) => ({
      id: r._id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt ?? null,
      images: r.images,
      publishedAt: r.publishedAt ?? null,
    }));
  },
});

export const getPublishedBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const row = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!row || !row.published) return null;
    return {
      id: row._id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt ?? null,
      content: row.content,
      images: row.images,
      publishedAt: row.publishedAt ?? null,
    };
  },
});
