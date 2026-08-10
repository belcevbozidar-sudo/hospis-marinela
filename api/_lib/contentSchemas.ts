import { z } from "zod";

/**
 * Всяка секция, която може да се редактира от административното табло.
 *
 * Всичко минава през тези схеми, преди да стигне до базата данни:
 * непознат ключ, непознато поле или прекалено дълъг текст се отхвърля.
 * Така админ панелът не може да се използва като вход за произволни
 * данни, дори ако някой се сдобие с достъп до него.
 */

// Максимални дължини — пазят базата и публичните страници от
// прекомерно голямо съдържание.
const shortText = z.string().trim().min(1).max(300);
const mediumText = z.string().trim().min(1).max(2000);
const longText = z.string().trim().min(1).max(20000);
const optionalShort = z.string().trim().max(300).optional().or(z.literal(""));

/**
 * Разрешава само безопасни адреси за изображения:
 * относителен път от самия сайт (/assets/...) или https:// адрес.
 * Изрично отрязва javascript:, data:, vbscript: и подобни схеми,
 * които иначе биха могли да се използват за вграждане на скрипт.
 */
const imageUrl = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => {
      if (value === "") return true;
      if (value.startsWith("/") && !value.startsWith("//")) return true;
      try {
        const parsed = new URL(value);
        return parsed.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Позволени са само относителни пътища (/assets/...) или https:// адреси" },
  );

const pricesSchema = z.object({
  priceFrom: shortText,
  priceTo: shortText,
  currency: shortText,
  secondaryNote: optionalShort,
  intro: mediumText,
  note: mediumText,
  factors: z.array(shortText).max(20),
  included: z.array(mediumText).max(40),
  notIncluded: z.array(mediumText).max(40),
  documents: z.array(mediumText).max(40),
});

const reviewsSchema = z.array(
  z.object({
    name: shortText,
    date: shortText,
    text: longText,
    highlight: optionalShort,
  }),
).max(200);

const gallerySchema = z.array(
  z.object({
    src: imageUrl,
    alt: shortText,
  }),
).max(200);

const teamSchema = z.array(
  z.object({
    name: shortText,
    role: shortText,
    description: z.string().trim().max(4000).optional().or(z.literal("")),
    image: imageUrl,
  }),
).max(60);

export const CONTENT_SCHEMAS = {
  prices: pricesSchema,
  reviews: reviewsSchema,
  gallery: gallerySchema,
  team: teamSchema,
} as const;

export type ContentKey = keyof typeof CONTENT_SCHEMAS;

export const CONTENT_KEYS = Object.keys(CONTENT_SCHEMAS) as ContentKey[];

export function isContentKey(value: string): value is ContentKey {
  return Object.prototype.hasOwnProperty.call(CONTENT_SCHEMAS, value);
}

/** Валидира стойност за даден ключ. Хвърля ZodError при проблем. */
export function validateContent(key: ContentKey, value: unknown) {
  return CONTENT_SCHEMAS[key].parse(value);
}
