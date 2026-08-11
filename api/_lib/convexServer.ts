import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api.js";

// Само сървърът говори с Convex — браузърът никога не вижда нито
// SERVER_SECRET, нито дори convex URL-а пряко (минава винаги през
// нашите /api routes). Convex функциите проверяват тази тайна във
// всеки свой handler (виж convex/lib/auth.ts).
const url = process.env.VITE_CONVEX_URL;
const secret = process.env.SERVER_SECRET;

if (!url || !secret) {
  throw new Error("Missing VITE_CONVEX_URL or SERVER_SECRET env vars");
}

export const convex = new ConvexHttpClient(url);
export const SERVER_SECRET = secret;
export { api };
