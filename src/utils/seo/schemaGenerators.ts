export interface KeywordResearchItem {
  primary: string;
  secondary: string[];
  longTail: string[];
}

export const generateLocalBusinessSchema = (_pageData: unknown, keywords: KeywordResearchItem) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `مظلات وسواتر مكة والمدينة | ${keywords.primary}`,
    image: "https://hsammnwralrfyd-del.github.io/rubou-albilad/hero-bg.webp",
    description: `متخصصون في تصميم وتركيب ${keywords.primary} - ${keywords.secondary.join(" | ")} في مكة المكرمة والمدينة المنورة.`,
    url: "https://hsammnwralrfyd-del.github.io/rubou-albilad/",
    telephone: "+966548561357",
    address: {
      "@type": "PostalAddress",
      streetAddress: "مكة المكرمة",
      addressLocality: "مكة المكرمة",
      addressRegion: "منطقة مكة المكرمة",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "21.4225",
      longitude: "39.8262",
    },
    openingHours: ["Sa-Th 08:00-21:00"],
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: "مكة المكرمة",
      },
      {
        "@type": "City",
        name: "المدينة المنورة",
      },
    ],
    keywords: keywords.longTail.slice(0, 5).join(", "),
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
