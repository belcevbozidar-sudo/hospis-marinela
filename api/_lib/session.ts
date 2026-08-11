import crypto from "node:crypto";
import { parseCookie, stringifySetCookie } from "cookie";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convex, api, SERVER_SECRET } from "./convexServer.js";

export const SESSION_COOKIE = "hm_admin_session";

export function getSessionToken(req: VercelRequest): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  const cookies = parseCookie(header);
  return cookies[SESSION_COOKIE] ?? null;
}

export async function createSession(remember: boolean) {
  const token = crypto.randomBytes(32).toString("hex");
  const { expiresAt } = await convex.mutation(api.adminAuth.createSession, {
    secret: SERVER_SECRET,
    token,
    remember,
  });
  return { token, expiresAt: new Date(expiresAt), remember };
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

export async function verifySession(req: VercelRequest): Promise<boolean> {
  const token = getSessionToken(req);
  if (!token) return false;
  return await convex.query(api.adminAuth.verifySession, { secret: SERVER_SECRET, token });
}

export async function destroySession(req: VercelRequest) {
  const token = getSessionToken(req);
  if (!token) return;
  await convex.mutation(api.adminAuth.destroySession, { secret: SERVER_SECRET, token });
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
