import type { Config } from "@react-router/dev/config";
import { existsSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// No vercelPreset() here: that preset writes the Build Output API directly
// and takes exclusive ownership of `.vercel/output`, which silently skips
// Vercel's zero-config detection of the sibling /api serverless functions.
// Plain static output + vercel.json rewrites (see below) keeps both working.
export default {
  appDirectory: "src",
  ssr: false,
  // Every public route is prerendered to a static HTML file at build time
  // so crawlers and social scrapers receive full content without JS.
  prerender: async () => {
    const staticPages = [
      "/",
      "/about",
      "/services",
      "/team",
      "/contact",
      "/reviews",
      "/admission",
      "/prices",
      "/gallery",
      "/news",
      "/grizhi-sled-insult",
      "/palliativni-grizhi",
      "/demenciya-alzhaimer",
      "/sledoperativno-vazstanovyavane",
      // Path is arbitrary here (matched by the catch-all route below) — what
      // matters is buildEnd copies the resulting HTML to build/client/404.html,
      // which Vercel auto-serves (with a real 404 status) for unmatched paths.
      "/404",
    ];

    // Every news article gets its own prerendered page, generated from
    // whatever was published as of the last build (see scripts/prebuild.mjs).
    // Articles published after the last deploy still work for visitors via
    // the client-side fetch in src/pages/news/Article.tsx — they just won't
    // have their own static snapshot for crawlers until the next deploy.
    const snapshotPath = join(__dirname, "src/lib/news-snapshot.generated.ts");
    let newsSlugs: string[] = [];
    if (existsSync(snapshotPath)) {
      const { NEWS_SNAPSHOT } = await import("./src/lib/news-snapshot.generated.ts");
      newsSlugs = NEWS_SNAPSHOT.map((item) => `/news/${item.slug}`);
    }

    return [...staticPages, ...newsSlugs];
  },
  // Copies the prerendered /404 page to build/client/404.html — Vercel's
  // static hosting auto-serves this file (with an actual 404 status code)
  // for any request that matches no rewrite and no real file, instead of
  // the whole site silently returning 200 for broken links (see vercel.json).
  buildEnd: async ({ buildManifest }) => {
    if (!buildManifest) return;
    const clientDir = join(__dirname, "build/client");
    const from = join(clientDir, "404", "index.html");
    const to = join(clientDir, "404.html");
    if (existsSync(from)) {
      cpSync(from, to);
    }
  },
} satisfies Config;
