/**
 * Всяка публична Convex функция в този проект приема `secret` като
 * първи аргумент и извиква това веднага. SERVER_SECRET е зададен само
 * в Convex (env var) и в нашия Vercel проект (env var) — никога не
 * стига до браузъра. Това е единственият пазач: Convex функциите са
 * технически публично извикваеми (Convex няма вграден "service role"
 * концепт като Supabase), затова тайната играе точно тази роля.
 */
export function requireServerSecret(secret: string): void {
  const expected = process.env.SERVER_SECRET;
  if (!expected) {
    throw new Error("SERVER_SECRET не е конфигуриран в Convex");
  }
  if (secret !== expected) {
    throw new Error("unauthorized");
  }
}
