import type { Config } from "@react-router/dev/config";

// No vercelPreset() here: that preset writes the Build Output API directly
// and takes exclusive ownership of `.vercel/output`, which silently skips
// Vercel's zero-config detection of the sibling /api serverless functions.
// Plain static output + vercel.json rewrites (see below) keeps both working.
export default {
  appDirectory: "src",
  ssr: false,
  // Every public route is prerendered to a static HTML file at build time
  // so crawlers and social scrapers receive full content without JS.
  prerender: [
    "/",
    "/about",
    "/services",
    "/team",
    "/contact",
    "/reviews",
    "/admission",
    "/prices",
    "/gallery",
  ],
} satisfies Config;
