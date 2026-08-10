import { supabaseAdmin } from "./supabaseAdmin";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 60 * 60 * 1000; // 1 час
const LOCKOUT_ID = "global";

type LockoutRow = {
  failed_count: number;
  locked_until: string | null;
};

async function getRow(): Promise<LockoutRow> {
  const { data, error } = await supabaseAdmin
    .from("admin_lockout")
    .select("failed_count, locked_until")
    .eq("id", LOCKOUT_ID)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    await supabaseAdmin
      .from("admin_lockout")
      .insert({ id: LOCKOUT_ID })
      .select()
      .single();
    return { failed_count: 0, locked_until: null };
  }
  return data;
}

/** Връща оставащи секунди до отключване, или 0 ако не е заключено.
 *  Тази проверка е независима от коректността на паролата — дори
 *  верният отговор се отхвърля, докато трае заключването. */
export async function checkLockout(): Promise<number> {
  const row = await getRow();
  if (row.locked_until) {
    const remainingMs = new Date(row.locked_until).getTime() - Date.now();
    if (remainingMs > 0) {
      return Math.ceil(remainingMs / 1000);
    }
  }
  return 0;
}

export async function registerFailedAttempt(): Promise<{
  lockedNow: boolean;
  attemptsRemaining: number;
}> {
  const row = await getRow();
  const failedCount = row.failed_count + 1;

  if (failedCount >= MAX_ATTEMPTS) {
    const lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
    await supabaseAdmin
      .from("admin_lockout")
      .update({
        failed_count: failedCount,
        locked_until: lockedUntil.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", LOCKOUT_ID);
    return { lockedNow: true, attemptsRemaining: 0 };
  }

  await supabaseAdmin
    .from("admin_lockout")
    .update({ failed_count: failedCount, updated_at: new Date().toISOString() })
    .eq("id", LOCKOUT_ID);

  return { lockedNow: false, attemptsRemaining: MAX_ATTEMPTS - failedCount };
}

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
