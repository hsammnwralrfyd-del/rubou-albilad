import { KeywordResearch } from "@/types/seo.types";

export const generateLocalBusinessSchema = (_pageData: unknown, keywords: KeywordResearch) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `مقاول برجولات الرياض | ${keywords.primary}`,
    image: "https://muthallat.com/WoodCladding1/1.webp",
    description: `متخصصون في تصميم وتركيب ${keywords.primary} - ${keywords.secondary.join(" | ")}`,
    url: "https://muthallat.com/woodcladding-detail",
    telephone: "+966502566093",
    address: {
      "@type": "PostalAddress",
      streetAddress: "الرياض",
      addressLocality: "الرياض",
      addressRegion: "منطقة الرياض",
      postalCode: "32241",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.4207",
      longitude: "50.0888",
    },
    openingHours: ["Mo-Sa 08:00-20:00", "Su 09:00-14:00"],
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "الرياض",
    },
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
