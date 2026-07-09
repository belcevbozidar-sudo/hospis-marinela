import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { DefaultProviders } from "./components/providers/default.tsx";
import "./index.css";

const GTAG_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18070778544');
`;

// Detect dark mode preference and set the class before next-themes loads.
// This avoids a flash of unstyled content (FOUC) when the page loads.
const THEME_INIT = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "system" || !theme) {
      var prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      theme = prefersDark ? "dark" : "light";
    }
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
`;

export function meta() {
  return [
    { title: 'Хоспис "Маринела"' },
    { name: "description", content: "Домът на нашите пациенти" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Хоспис Маринела" />
        <meta name="theme-color" content="#1f7a4d" />
        <meta
          name="google-site-verification"
          content="PSocSfbNvq1F1p6-kV02YURDDL-zgflwzdBXUAd_gwI"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="preload"
          as="image"
          href="/assets/file_uOIGeWFxMLGIjEndEi7clGVj.webp"
        />
        <Meta />
        <Links />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18070778544"
        />
        <script dangerouslySetInnerHTML={{ __html: GTAG_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <DefaultProviders>
      <Outlet />
    </DefaultProviders>
  );
}
