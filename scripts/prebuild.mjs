// Изпълнява се преди всеки build (виж package.json → "build").
//
// 1) Взима текущите публикувани новини от Convex и ги записва в
//    src/lib/news-snapshot.generated.ts — react-router prerender-ва
//    страниците с новини статично от този файл (виж react-router.config.ts),
//    за да могат Google и другите търсачки да виждат реалното съдържание,
//    а не празна обвивка, която се пълни едва след JavaScript.
// 2) Генерира публична public/sitemap.xml с всички статични страници
//    и всяка публикувана новина — вместо ръчно поддържан файл, който
//    лесно остарява.
//
// Ако Convex е недостъпен, build-ът НЕ трябва да се чупи — записва се
// празен списък новини и се извежда предупреждение. Реалните посетители
// продължават да виждат новините през /api/news (виж src/pages/news/List.tsx),
// което е независимо от този скрипт.

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS_SNAPSHOT_FILE = join(__dirname, "../src/lib/news-snapshot.generated.ts");
const SITEMAP_FILE = join(__dirname, "../public/sitemap.xml");
const SITE_URL = "https://www.marinelahospis.com";

// Plain `node` (unlike Vite) doesn't auto-load .env.local — load it here so
// local `pnpm run build` picks up VITE_CONVEX_URL. On Vercel the file simply
// doesn't exist (it's gitignored) and env vars come from process.env already.
function loadDotEnvLocal() {
  const envPath = join(__dirname, "../.env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    const [, key, rawValue = ""] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}
loadDotEnvLocal();

const api = anyApi;

// Трябва да отразява пререндираните статични пътища в react-router.config.ts.
const STATIC_PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/services", priority: "0.9" },
  { path: "/admission", priority: "0.9" },
  { path: "/prices", priority: "0.9" },
  { path: "/team", priority: "0.7" },
  { path: "/gallery", priority: "0.6" },
  { path: "/reviews", priority: "0.7" },
  { path: "/contact", priority: "0.8" },
  { path: "/news", priority: "0.7" },
  { path: "/grizhi-sled-insult", priority: "0.8" },
  { path: "/palliativni-grizhi", priority: "0.8" },
  { path: "/demenciya-alzhaimer", priority: "0.8" },
  { path: "/sledoperativno-vazstanovyavane", priority: "0.8" },
];

async function fetchNews() {
  const url = process.env.VITE_CONVEX_URL;
  if (!url) {
    console.warn(
      "[prebuild] VITE_CONVEX_URL не е зададен — пропускам новините (build продължава).",
    );
    return [];
  }

  const convex = new ConvexHttpClient(url);
  const list = await convex.query(api.news.listPublished, {});

  const full = await Promise.all(
    list.map((item) => convex.query(api.news.getPublishedBySlug, { slug: item.slug })),
  );

  return full.filter((item) => item !== null);
}

function writeNewsSnapshot(news) {
  const body = `/* eslint-disable */
// АВТОМАТИЧНО ГЕНЕРИРАН ФАЙЛ — не редактирайте на ръка.
// Регенерира се при всеки \`pnpm run build\` от scripts/prebuild.mjs.
// Съдържа снимка на публикуваните новини към момента на последния build,
// вградена статично в страниците, за да ги виждат търсачките веднага.

export type NewsSnapshotItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  images: string[];
  publishedAt: number | null;
};

export const NEWS_SNAPSHOT: NewsSnapshotItem[] = ${JSON.stringify(news)};
`;

  mkdirSync(dirname(NEWS_SNAPSHOT_FILE), { recursive: true });
  writeFileSync(NEWS_SNAPSHOT_FILE, body, "utf-8");
  console.log(`[prebuild] Записани ${news.length} новини в ${NEWS_SNAPSHOT_FILE}`);
}

function isoDate(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function writeSitemap(news) {
  const today = isoDate(Date.now());

  const staticUrls = STATIC_PAGES.map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`,
  );

  const newsUrls = news.map((item) => {
    const lastmod = item.publishedAt ? isoDate(item.publishedAt) : today;
    return `  <url>
    <loc>${SITE_URL}/news/${item.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Автоматично генериран от scripts/prebuild.mjs при всеки build. Не редактирайте на ръка. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...newsUrls].join("\n")}
</urlset>
`;

  writeFileSync(SITEMAP_FILE, xml, "utf-8");
  console.log(`[prebuild] sitemap.xml записан с ${STATIC_PAGES.length + news.length} адреса`);
}

async function main() {
  let news = [];
  try {
    news = await fetchNews();
  } catch (err) {
    console.warn(
      "[prebuild] Неуспешно взимане на новини от Convex — продължавам с празен списък:",
      err instanceof Error ? err.message : err,
    );
    news = [];
  }

  writeNewsSnapshot(news);
  writeSitemap(news);
}

main();
