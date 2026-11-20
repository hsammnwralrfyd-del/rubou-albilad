import { useEffect } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import FAQ from "@/components/FAQ";

import { useSEO, SITE_URL } from "@/hooks/useSEO";
import { seoData } from "@/utils/seo/seoData";
import { useSiteData } from "@/contexts/SiteDataContext";

const Index = () => {
  const { siteSettings } = useSiteData();

  const seoTitle =
    siteSettings?.seo_title?.trim() ||
    seoData.home.title;

  const seoDescription =
    siteSettings?.seo_description?.trim() ||
    seoData.home.description;

  const seoKeywords =
    siteSettings?.seo_keywords?.trim() ||
    seoData.home.keywords;

  const seoImage =
    siteSettings?.hero_image?.trim() ||
    seoData.home.image;

  const siteName =
    siteSettings?.site_name?.trim() ||
    "مظلات وسواتر المدينة المنورة";

  useSEO({
    ...seoData.home,
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    image: seoImage,
    url: SITE_URL,
    siteName,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-background text-primary"
    >
      <Header />

      <main>
        <Hero />
        <Services />
        <WhyChoose />

        <section id="portfolio">
          <Gallery />
        </section>

        <About />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
