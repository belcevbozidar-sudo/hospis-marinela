import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireServerSecret } from "./lib/auth";

export const adminGet = query({
  args: { secret: v.string(), key: v.string() },
  handler: async (ctx, { secret, key }) => {
    requireServerSecret(secret);
    const row = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    return row ? { value: row.value, updatedAt: row.updatedAt } : { value: null, updatedAt: null };
  },
});

export const adminSet = mutation({
  args: { secret: v.string(), key: v.string(), value: v.any() },
  handler: async (ctx, { secret, key, value }) => {
    requireServerSecret(secret);
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    const updatedAt = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { value, updatedAt });
    } else {
      await ctx.db.insert("siteContent", { key, value, updatedAt });
    }
  },
});

/** Публично: цялото редактируемо съдържание наведнъж, за посетителите. */
export const getAllPublic = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("siteContent").collect();
    const content: Record<string, unknown> = {};
    for (const row of rows) content[row.key] = row.value;
    return content;
  },
});
