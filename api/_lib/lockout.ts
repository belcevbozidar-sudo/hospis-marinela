import { supabaseAdmin } from "./supabaseAdmin.js";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 60; // 1 час
const LOCKOUT_ID = "global";

export type AttemptState = {
  /** Секунди до отключване; 0 означава, че НЕ е заключено. */
  lockedForSeconds: number;
  /** Колко опита остават преди заключване. */
  attemptsRemaining: number;
};

/**
 * Регистрира опит за вход АТОМАРНО и връща състоянието след него.
 *
 * Извиква се ПРЕДИ проверката на паролата. Причината: ако първо
 * проверявахме дали е заключено и чак после броихме неуспеха, залп
 * от паралелни заявки щеше да мине проверката едновременно и да
 * получи много повече от 5 опита. Тук всеки опит се отчита в една
 * атомарна SQL заявка (Postgres заключва реда), така че паралелните
 * заявки се нареждат една след друга и нито един опит не се губи.
 *
 * При вече заключен акаунт броячът не се увеличава — само се връща
 * оставащото време.
 */
export async function beginLoginAttempt(): Promise<AttemptState> {
  const { data, error } = await supabaseAdmin.rpc("begin_login_attempt", {
    max_attempts: MAX_ATTEMPTS,
    lock_minutes: LOCK_MINUTES,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    // Редът липсва (не би трябвало) — държим се консервативно и заключваме.
    throw new Error("admin_lockout row missing");
  }

  const lockedUntil: string | null = row.locked_until;
  const failedCount: number = row.failed_count ?? 0;

  let lockedForSeconds = 0;
  if (lockedUntil) {
    const remainingMs = new Date(lockedUntil).getTime() - Date.now();
    if (remainingMs > 0) lockedForSeconds = Math.ceil(remainingMs / 1000);
  }

  return {
    lockedForSeconds,
    attemptsRemaining: Math.max(0, MAX_ATTEMPTS - failedCount),
  };
}

/** Нулира брояча след успешен вход. */
export async function resetAttempts(): Promise<void> {
  await supabaseAdmin
    .from("admin_lockout")
    .update({
      failed_count: 0,
      locked_until: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", LOCKOUT_ID);
}
