import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { checkLockout, registerFailedAttempt, resetAttempts } from "../_lib/lockout.js";
import { createSession, setSessionCookie } from "../_lib/session.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const remainingLockSeconds = await checkLockout();
  if (remainingLockSeconds > 0) {
    res.status(429).json({
      error: "locked",
      retryAfterSeconds: remainingLockSeconds,
    });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
  const password: unknown = body.password;
  const remember = Boolean(body.remember);

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    res.status(500).json({ error: "server_misconfigured" });
    return;
  }

  const isValid =
    typeof password === "string" && password.length > 0 && bcrypt.compareSync(password, hash);

  if (!isValid) {
    const { lockedNow, attemptsRemaining } = await registerFailedAttempt();
    if (lockedNow) {
      res.status(429).json({ error: "locked", retryAfterSeconds: 60 * 60 });
      return;
    }
    res.status(401).json({ error: "invalid_password", attemptsRemaining });
    return;
  }

  await resetAttempts();
  const { token, expiresAt } = await createSession(remember);
  setSessionCookie(res, token, expiresAt);
  res.status(200).json({ ok: true });
}
