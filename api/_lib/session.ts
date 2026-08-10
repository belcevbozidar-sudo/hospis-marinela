import crypto from "node:crypto";
import { parseCookie, stringifySetCookie } from "cookie";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseAdmin } from "./supabaseAdmin";

export const SESSION_COOKIE = "hm_admin_session";
const REMEMBER_MS = 14 * 24 * 60 * 60 * 1000; // 14 дни
const DEFAULT_MS = 8 * 60 * 60 * 1000; // 8 часа, ако не е чекнато "Запомни ме"

export function getSessionToken(req: VercelRequest): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  const cookies = parseCookie(header);
  return cookies[SESSION_COOKIE] ?? null;
}

export async function createSession(remember: boolean) {
  const token = crypto.randomBytes(32).toString("hex");
  const ttl = remember ? REMEMBER_MS : DEFAULT_MS;
  const expiresAt = new Date(Date.now() + ttl);

  const { error } = await supabaseAdmin.from("admin_sessions").insert({
    token,
    expires_at: expiresAt.toISOString(),
    remember,
  });
  if (error) throw error;

  return { token, expiresAt, remember };
}

export function setSessionCookie(
  res: VercelResponse,
  token: string,
  expiresAt: Date,
) {
  res.setHeader(
    "Set-Cookie",
    stringifySetCookie({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    }),
  );
}

export function clearSessionCookie(res: VercelResponse) {
  res.setHeader(
    "Set-Cookie",
    stringifySetCookie({
      name: SESSION_COOKIE,
      value: "",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    }),
  );
}

export async function verifySession(
  req: VercelRequest,
): Promise<boolean> {
  const token = getSessionToken(req);
  if (!token) return false;

  const { data, error } = await supabaseAdmin
    .from("admin_sessions")
    .select("expires_at")
    .eq("token", token)
    .maybeSingle();

  if (error || !data) return false;
  if (new Date(data.expires_at).getTime() < Date.now()) {
    // Изтекла сесия — изчистваме я
    await supabaseAdmin.from("admin_sessions").delete().eq("token", token);
    return false;
  }
  return true;
}

export async function destroySession(req: VercelRequest) {
  const token = getSessionToken(req);
  if (!token) return;
  await supabaseAdmin.from("admin_sessions").delete().eq("token", token);
}

/** Изисква валидна сесия; при липса пише 401 и връща false. */
export async function requireAuth(
  req: VercelRequest,
  res: VercelResponse,
): Promise<boolean> {
  const ok = await verifySession(req);
  if (!ok) {
    res.status(401).json({ error: "unauthorized" });
    return false;
  }
  return true;
}
