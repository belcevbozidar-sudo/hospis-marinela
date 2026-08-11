import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireServerSecret } from "./lib/auth";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 60 * 60 * 1000; // 1 час
const REMEMBER_MS = 14 * 24 * 60 * 60 * 1000; // 14 дни
const DEFAULT_SESSION_MS = 8 * 60 * 60 * 1000; // 8 часа

async function getOrCreateLockoutRow(ctx: { db: any }) {
  const existing = await ctx.db.query("adminLockout").first();
  if (existing) return existing;
  const id = await ctx.db.insert("adminLockout", {
    failedCount: 0,
    lockedUntil: undefined,
    updatedAt: Date.now(),
  });
  return await ctx.db.get(id);
}

/**
 * Регистрира опит за вход и връща състоянието СЛЕД него. Извиква се
 * ПРЕДИ проверката на паролата — виж бележката в api/admin/login.ts.
 *
 * Convex mutations са сериализуеми (optimistic concurrency control):
 * ако два паралелни извиквания се опитат да прочетат и презапишат
 * един и същ ред едновременно, Convex автоматично повтаря единия,
 * докато не се изпълнят едно след друго. Затова — за разлика от
 * обикновена "прочети после запиши" логика — тук няма race condition
 * дори при залп от едновременни заявки.
 */
export const beginLoginAttempt = mutation({
  args: { secret: v.string() },
  handler: async (ctx, { secret }) => {
    requireServerSecret(secret);
    const row = await getOrCreateLockoutRow(ctx);
    const now = Date.now();

    const alreadyLocked = row.lockedUntil !== undefined && row.lockedUntil > now;
    const failedCount = alreadyLocked ? row.failedCount : row.failedCount + 1;
    const lockedUntil = alreadyLocked
      ? row.lockedUntil
      : failedCount >= MAX_ATTEMPTS
        ? now + LOCK_MS
        : row.lockedUntil;

    await ctx.db.patch(row._id, { failedCount, lockedUntil, updatedAt: now });
    return { failedCount, lockedUntil: lockedUntil ?? null };
  },
});

export const resetLoginAttempts = mutation({
  args: { secret: v.string() },
  handler: async (ctx, { secret }) => {
    requireServerSecret(secret);
    const row = await getOrCreateLockoutRow(ctx);
    await ctx.db.patch(row._id, {
      failedCount: 0,
      lockedUntil: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const createSession = mutation({
  args: { secret: v.string(), token: v.string(), remember: v.boolean() },
  handler: async (ctx, { secret, token, remember }) => {
    requireServerSecret(secret);
    const now = Date.now();

    // Хигиена: чистим изтеклите сесии при всеки нов вход.
    const all = await ctx.db.query("adminSessions").collect();
    for (const s of all) {
      if (s.expiresAt < now) await ctx.db.delete(s._id);
    }

    const expiresAt = now + (remember ? REMEMBER_MS : DEFAULT_SESSION_MS);
    await ctx.db.insert("adminSessions", { token, expiresAt, remember, createdAt: now });
    return { expiresAt };
  },
});

export const verifySession = query({
  args: { secret: v.string(), token: v.string() },
  handler: async (ctx, { secret, token }) => {
    requireServerSecret(secret);
    const row = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q: any) => q.eq("token", token))
      .first();
    if (!row) return false;
    return row.expiresAt > Date.now();
  },
});

export const destroySession = mutation({
  args: { secret: v.string(), token: v.string() },
  handler: async (ctx, { secret, token }) => {
    requireServerSecret(secret);
    const row = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q: any) => q.eq("token", token))
      .first();
    if (row) await ctx.db.delete(row._id);
  },
});
