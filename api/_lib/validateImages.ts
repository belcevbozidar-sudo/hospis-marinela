const MAX_IMAGES = 20;

/**
 * Разрешава само относителни пътища (/assets/...) или https:// адреси.
 * Отрязва javascript:, data: и подобни схеми, през които иначе би
 * могло да се вкара скрипт.
 */
function isSafeImageUrl(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/** Валидира масив от адреси на снимки (за новини). Хвърля при проблем. */
export function validateImages(value: unknown): string[] {
  if (!Array.isArray(value)) throw new Error("images_must_be_array");
  if (value.length > MAX_IMAGES) throw new Error("too_many_images");

  return value.map((item) => {
    if (typeof item !== "string" || item.length === 0 || item.length > 500) {
      throw new Error("invalid_image_url");
    }
    if (!isSafeImageUrl(item)) throw new Error("invalid_image_url");
    return item;
  });
}
