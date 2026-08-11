import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Тази база се вика единствено от нашия Vercel API слой (виж
 * convex/lib/auth.ts) — никога директно от браузъра. Затова тук няма
 * Convex Auth/RLS: пазенето е на границата Vercel <-> браузър
 * (httpOnly сесийна бисквитка), а Vercel <-> Convex е защитено със
 * споделена тайна (SERVER_SECRET), проверявана във всяка функция.
 */
export default defineSchema({
  news: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    // Подредени адреси на снимки; първият е корицата/главната снимка.
    images: v.array(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"])
    .index("by_published", ["published", "publishedAt"]),

  // Редактируемо съдържание по секции (отзиви, галерия, цени, екип).
  siteContent: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
    remember: v.boolean(),
    createdAt: v.number(),
  }).index("by_token", ["token"]),

  // Единствен ред (глобално заключване, не е по потребител/IP —
  // виж бележката в convex/adminAuth.ts защо е нарочно така).
  adminLockout: defineTable({
    failedCount: v.number(),
    lockedUntil: v.optional(v.number()),
    updatedAt: v.number(),
  }),
});
