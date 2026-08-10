import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getContent, saveContent, type ContentKey } from "@/lib/admin-api.ts";

/**
 * Зарежда съдържанието на дадена секция за редакция.
 *
 * Ако в базата още няма записано нищо, започваме от стойността по
 * подразбиране (тази, която в момента се вижда на сайта) — така
 * редакцията винаги тръгва от реалното съдържание.
 */
export function useContentEditor<T>(key: ContentKey, fallback: T) {
  const [value, setValue] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getContent<T>(key)
      .then(({ value }) => {
        if (cancelled) return;
        setValue(value ?? structuredClone(fallback));
      })
      .catch(() => {
        if (cancelled) return;
        toast.error("Грешка при зареждане");
        setValue(structuredClone(fallback));
      });
    return () => {
      cancelled = true;
    };
    // fallback е константа от кода — не участва в зависимостите
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  function change(next: T) {
    setValue(next);
    setDirty(true);
  }

  async function save() {
    if (value === null) return;
    setSaving(true);
    try {
      await saveContent(key, value);
      setDirty(false);
      toast.success("Запазено — промените са видими на сайта");
    } catch (err) {
      const anyErr = err as { payload?: { error?: string } };
      if (anyErr.payload?.error === "validation_failed") {
        toast.error("Има непопълнени или невалидни полета");
      } else {
        toast.error("Неуспешно запазване");
      }
    } finally {
      setSaving(false);
    }
  }

  function resetToDefaults() {
    setValue(structuredClone(fallback));
    setDirty(true);
  }

  return { value, change, save, saving, dirty, resetToDefaults };
}
