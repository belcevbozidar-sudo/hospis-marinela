import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

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
  presets: [vercelPreset()],
} satisfies Config;
