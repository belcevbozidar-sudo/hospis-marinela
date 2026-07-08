import { SITE_URL, SITE_NAME } from "./seo.ts";

/**
 * Schema.org JSON-LD builders. `MedicalBusiness` is the closest
 * LocalBusiness subtype for a hospice (schema.org has no Hospice type);
 * it keeps eligibility for Local Business results without claiming to
 * be a Hospital.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Hospice Marinela",
    legalName: 'ХОСПИС "МАРИНЕЛА" 2008 ООД',
    description:
      "Лицензиран хоспис в София за денонощни медицински и палиативни грижи за възрастни и лежащо болни пациенти. 60 легла, медицинско наблюдение 24/7.",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/file_G5Y3AadLPoi80wWKp3JyQ7jt.webp`,
    image: `${SITE_URL}/assets/file_lBXpTenPGbaaSA7KeWBi1MjL.webp`,
    telephone: "+359878710501",
    email: "office@marinelahospis.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: 'ул. "Любляна" № 34Б, кв. Овча купел',
      addressLocality: "София",
      postalCode: "1618",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.671787,
      longitude: 23.260235,
    },
    hasMap: "https://www.google.com/maps?q=42.671787,23.260235",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+359878710501",
        contactType: "customer service",
        availableLanguage: "bg",
      },
      {
        "@type": "ContactPoint",
        telephone: "+359883920422",
        contactType: "customer service",
        availableLanguage: "bg",
      },
    ],
    sameAs: ["https://www.facebook.com/groups/445912405601083"],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "bg",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Начало",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function reviewsSchema(
  reviews: Array<{ author: string; text: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      itemReviewed: { "@id": `${SITE_URL}/#organization` },
    })),
  };
}
