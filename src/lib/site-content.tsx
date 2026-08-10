import { createContext, useContext, useEffect, useState } from "react";

/**
 * Редактируемото съдържание на сайта.
 *
 * Съдържанието се пази в базата, но всяка секция има и стойност по
 * подразбиране, записана в кода. Ако базата е празна или заявката
 * се провали, страницата показва стойността по подразбиране — сайтът
 * никога не остава празен заради проблем с базата.
 */

export type PricesContent = {
  priceFrom: string;
  priceTo: string;
  currency: string;
  secondaryNote: string;
  intro: string;
  note: string;
  factors: string[];
  included: string[];
  notIncluded: string[];
  documents: string[];
};

export type ReviewContent = {
  name: string;
  date: string;
  text: string;
  highlight?: string;
};

export type GalleryContent = {
  src: string;
  alt: string;
};

export type TeamMemberContent = {
  name: string;
  role: string;
  description?: string;
  image: string;
};

export type SiteContent = {
  prices?: PricesContent;
  reviews?: ReviewContent[];
  gallery?: GalleryContent[];
  team?: TeamMemberContent[];
};

const SiteContentContext = createContext<SiteContent>({});

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("failed"))))
      .then((data) => {
        if (!cancelled && data?.content) setContent(data.content as SiteContent);
      })
      .catch(() => {
        // Тихо: страниците вече показват съдържанието по подразбиране.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>
  );
}

/**
 * Връща съдържанието за дадена секция, или `fallback`, ако в базата
 * още няма записано нищо.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent<K extends keyof SiteContent>(
  key: K,
  fallback: NonNullable<SiteContent[K]>,
): NonNullable<SiteContent[K]> {
  const content = useContext(SiteContentContext);
  const value = content[key];
  if (value === undefined || value === null) return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value as NonNullable<SiteContent[K]>;
}
