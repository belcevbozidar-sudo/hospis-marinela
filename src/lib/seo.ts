// Vercel's domain config 308-redirects the apex to www, so www is the
// URL that actually resolves with 200 — canonical/OG must match it to
// avoid sending crawlers through an extra redirect hop.
export const SITE_URL = "https://www.marinelahospis.com";
export const SITE_NAME = 'Хоспис "Маринела"';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

type RouteMeta = {
  title: string;
  description: string;
  noindex?: boolean;
};

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: 'Хоспис "Маринела" – денонощни грижи за възрастни хора в София',
    description:
      "Лицензиран хоспис в София, кв. Овча купел. Денонощни медицински и палиативни грижи за възрастни и лежащо болни. 60 легла, 15+ години опит. ☎ 0878 710 501",
  },
  "/about": {
    title: 'За нас – Хоспис "Маринела" – 15+ години грижа в София',
    description:
      'Хоспис "Маринела" е лицензирано лечебно заведение в София с над 15 години опит в денонощните грижи за възрастни, следоперативни и лежащо болни пациенти.',
  },
  "/services": {
    title: "Услуги – палиативни грижи и 24/7 медицинско обслужване",
    description:
      'Палиативни грижи, следболнично възстановяване, рехабилитация и денонощно медицинско наблюдение в Хоспис "Маринела", София – Овча купел.',
  },
  "/team": {
    title: 'Екипът ни – лекари и медицински специалисти | Хоспис "Маринела"',
    description:
      'Запознайте се с екипа на Хоспис "Маринела" – лекари, медицински сестри и болногледачи с дългогодишен опит в грижата за възрастни хора.',
  },
  "/contact": {
    title: 'Контакти – Хоспис "Маринела", кв. Овча купел, София',
    description:
      'Свържете се с Хоспис "Маринела": ул. "Любляна" 34Б, кв. Овча купел, София. Тел. 0878 710 501, 0883 920 422. Работим денонощно, 7 дни в седмицата.',
  },
  "/reviews": {
    title: 'Отзиви от близки на наши пациенти | Хоспис "Маринела"',
    description:
      'Прочетете отзиви и мнения от семейства, доверили грижата за своите близки на Хоспис "Маринела" в София.',
  },
  "/admission": {
    title: "Прием в хосписа – условия, документи и стъпки",
    description:
      'Как се приема пациент в Хоспис "Маринела": необходими документи, стъпки за настаняване и отговори на често задавани въпроси. Прием 7 дни в седмицата.',
  },
  "/prices": {
    title: 'Цени за настаняване и денонощни грижи | Хоспис "Маринела"',
    description:
      'Актуални цени за настаняване, денонощни медицински грижи и допълнителни услуги в Хоспис "Маринела", София. Прозрачно ценообразуване без скрити такси.',
  },
  "/gallery": {
    title: 'Галерия – базата на Хоспис "Маринела" в снимки',
    description:
      'Разгледайте снимки на стаите, общите пространства и градината на Хоспис "Маринела" в кв. Овча купел, София.',
  },
  "/404": {
    title: 'Страницата не е намерена | Хоспис "Маринела"',
    description:
      'Страницата, която търсите, не съществува. Разгледайте услугите и условията за прием в Хоспис "Маринела" – София.',
    noindex: true,
  },
};

/**
 * Builds the full React Router meta descriptor list for a route.
 * Canonical and og:url always point to the production domain so
 * preview deployments never leak alternate URLs to crawlers.
 */
export function buildMeta(path: keyof typeof ROUTE_META) {
  const { title, description, noindex } = ROUTE_META[path];
  const url = path === "/" || path === "/404" ? SITE_URL + "/" : SITE_URL + path;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "bg_BG" },
    { property: "og:image", content: DEFAULT_OG_IMAGE },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: DEFAULT_OG_IMAGE },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex" });
  } else {
    meta.push({ tagName: "link", rel: "canonical", href: url });
  }

  return meta;
}
