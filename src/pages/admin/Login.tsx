import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.tsx";
import { login } from "@/lib/admin-api.ts";

function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [lockSeconds, setLockSeconds] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (lockSeconds === null) return;
    if (lockSeconds <= 0) {
      setLockSeconds(null);
      return;
    }
    intervalRef.current = setInterval(() => {
      setLockSeconds((prev) => (prev === null ? null : Math.max(0, prev - 1)));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lockSeconds]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(password, remember);
      onSuccess();
    } catch (err) {
      const anyErr = err as { status?: number; payload?: { error?: string; retryAfterSeconds?: number; attemptsRemaining?: number } };
      if (anyErr.status === 429) {
        setLockSeconds(anyErr.payload?.retryAfterSeconds ?? 3600);
        setError("Твърде много неуспешни опити. Изчакайте, докато таймерът изтече.");
      } else if (anyErr.status === 401) {
        setAttemptsRemaining(anyErr.payload?.attemptsRemaining ?? null);
        setError("Грешна парола.");
      } else {
        setError("Възникна грешка. Опитайте отново.");
      }
    } finally {
      setLoading(false);
      setPassword("");
    }
  }

  const locked = lockSeconds !== null && lockSeconds > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Административен вход</CardTitle>
          <CardDescription>Хоспис Маринела — само за оторизиран персонал</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="admin-password">Парола</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={locked || loading}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(v === true)}
                disabled={locked || loading}
              />
              <Label htmlFor="remember" className="font-normal cursor-pointer">
                Запомни ме за 14 дни
              </Label>
            </div>

            {locked && (
              <p className="text-sm text-destructive font-medium">
                Заключено. Опитайте отново след {formatCountdown(lockSeconds!)}
              </p>
            )}
            {!locked && error && <p className="text-sm text-destructive">{error}</p>}
            {!locked && attemptsRemaining !== null && attemptsRemaining > 0 && (
              <p className="text-xs text-muted-foreground">
                Оставащи опити преди заключване: {attemptsRemaining}
              </p>
            )}

            <Button type="submit" disabled={locked || loading || !password} className="w-full">
              {loading ? "Влизане..." : "Вход"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
