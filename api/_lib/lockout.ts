import { convex, api, SERVER_SECRET } from "./convexServer.js";

const MAX_ATTEMPTS = 5; // трябва да съвпада с convex/adminAuth.ts

export type AttemptState = {
  /** Секунди до отключване; 0 означава, че НЕ е заключено. */
  lockedForSeconds: number;
  /** Колко опита остават преди заключване. */
  attemptsRemaining: number;
};

/**
 * Регистрира опит за вход АТОМАРНО (виж convex/adminAuth.ts за защо
 * това е сигурно дори при паралелен залп заявки) и връща състоянието
 * след него. Извиква се ПРЕДИ проверката на паролата.
 */
export async function beginLoginAttempt(): Promise<AttemptState> {
  const result = await convex.mutation(api.adminAuth.beginLoginAttempt, {
    secret: SERVER_SECRET,
  });

  let lockedForSeconds = 0;
  if (result.lockedUntil) {
    const remainingMs = result.lockedUntil - Date.now();
    if (remainingMs > 0) lockedForSeconds = Math.ceil(remainingMs / 1000);
  }

  return {
    lockedForSeconds,
    attemptsRemaining: Math.max(0, MAX_ATTEMPTS - result.failedCount),
  };
}

/** Нулира брояча след успешен вход. */
export async function resetAttempts(): Promise<void> {
  await convex.mutation(api.adminAuth.resetLoginAttempts, { secret: SERVER_SECRET });
}
