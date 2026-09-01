import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SITE_URL = "https://canopies-makkah.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.webp`;

export const useSEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
  structuredData,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (
      name: string,
      content: string,
      property = false
    ) => {
      const attribute = property ? "property" : "name";

      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Basic SEO
    updateMetaTag("title", title);
    updateMetaTag("description", description);

    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:locale", "ar_SA", true);
    updateMetaTag("og:site_name", "حداد مظلات وسواتر", true);

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Theme
    updateMetaTag("theme-color", "#0F5C4C");

    // Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);

    // Structured Data
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-seo="true"]'
    );

    existingScripts.forEach((script) => script.remove());

    if (structuredData) {
      const scriptElement = document.createElement("script");

      scriptElement.type = "application/ld+json";
      scriptElement.setAttribute("data-seo", "true");
      scriptElement.textContent = JSON.stringify(structuredData);

      document.head.appendChild(scriptElement);
    }

    return () => {
      existingScripts.forEach((script) => script.remove());
    };
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    structuredData,
  ]);
};