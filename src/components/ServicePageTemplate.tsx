import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceGallery } from "@/components/ServiceGallery";
import { contactLinks, client } from "@/config/client";
import {
  getServiceGalleryPaths,
  getServiceHeroPath,
  type ServiceDefinition,
} from "@/config/services";
import { useSEO } from "@/hooks/useSEO";
import { seoData, generateStructuredData } from "@/utils/seo/seoData";
import {
  Phone,
  MessageCircle,
  HardHat,
  Sparkles,
  CheckCircle2,
  Award,
  MapPin,
} from "lucide-react";

interface ServicePageTemplateProps {
  service: ServiceDefinition;
}

export const ServicePageTemplate = ({ service }: ServicePageTemplateProps) => {
  const seoInfo = seoData[service.id];
  const heroImage = getServiceHeroPath(service);
  const galleryImages = getServiceGalleryPaths(service);

  useSEO({
    title: seoInfo.title,
    description: seoInfo.description,
    keywords: seoInfo.keywords,
    url: seoInfo.url,
    image: `${client.siteUrl}${heroImage}`,
    structuredData: generateStructuredData(
      service.id,
      seoInfo.title,
      seoInfo.description
    ),
  });

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-ivory text-charcoal">
      <Header />

      <section className="relative overflow-hidden bg-ivory pt-20 sm:pt-24">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-56 sm:h-72 lg:h-auto lg:min-h-[420px]">
            <img
              src={heroImage}
              alt={service.title}
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
            />
          </div>

          <div className="flex items-center px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
            <div className="w-full max-w-xl">
              <div className="section-badge mb-6">
                <HardHat size={14} className="shrink-0 text-bronze" />
                <span>{service.badge}</span>
              </div>

              <h1 className="section-title mb-5 text-charcoal">
                {service.title}
                <span className="mt-2 block text-gradient-luxury">
                  {service.heroSubtitle}
                </span>
              </h1>

              <p className="section-desc mb-8">{service.introDescription}</p>

              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury w-full sm:w-auto"
                >
                  <MessageCircle size={20} className="shrink-0" />
                  تواصل عبر واتساب
                  <Sparkles size={16} className="shrink-0 opacity-80" />
                </a>
                <a href={contactLinks.phone} className="btn-modern w-full sm:w-auto">
                  <Phone size={20} className="shrink-0 text-bronze" />
                  اتصل الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title mb-5">{service.introTitle}</h2>
            <p className="section-desc mx-auto">{service.introDescription}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {service.features.map((feature) => (
              <div key={feature.title} className="group premium-card p-5 sm:p-6">
                <div className="icon-new mb-4">
                  <Award size={22} className="shrink-0" />
                </div>
                <h3 className="mb-2 text-base font-extrabold text-charcoal sm:text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-charcoal-soft/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceGallery
        images={galleryImages}
        title={service.galleryTitle}
        description={service.galleryDescription}
        serviceName={service.shortTitle}
      />

      <section className="section-padding bg-ivory">
        <div className="section-container">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="section-title">
              أنواع {service.shortTitle}
              <span className="mt-2 block text-gradient-luxury">التي نقدمها</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {service.serviceTypes.map((item) => (
              <div key={item.title} className="premium-card p-5">
                <h3 className="mb-2 text-base font-extrabold text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-charcoal-soft/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="section-title">
              تفاصيل خدمات {service.shortTitle}
            </h2>
          </div>

          <div className="space-y-10 sm:space-y-14">
            {service.contentSections.map((section, index) => {
              const image = galleryImages[section.imageIndex] ?? galleryImages[0];
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={section.title}
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                    isReversed ? "lg:[direction:ltr]" : ""
                  }`}
                >
                  <div className={`min-w-0 ${isReversed ? "lg:[direction:rtl]" : ""}`}>
                    <div className="overflow-hidden rounded-2xl border border-bronze/15 shadow-sm">
                      <img
                        src={image}
                        alt={section.title}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`min-w-0 ${isReversed ? "lg:[direction:rtl]" : ""}`}>
                    <h3 className="mb-3 text-xl font-extrabold text-charcoal sm:text-2xl">
                      {section.title}
                    </h3>
                    <p className="text-sm leading-8 text-charcoal-soft/80 sm:text-base">
                      {section.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="section-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <h2 className="section-title mb-6">
                {service.benefitsTitle}
                <span className="mt-2 block text-gradient-luxury">
                  من {client.shortName}
                </span>
              </h2>
              <div className="space-y-3">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bronze/15">
                      <CheckCircle2 size={14} className="text-bronze-dark" />
                    </div>
                    <span className="text-sm text-charcoal-soft/85 sm:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="overflow-hidden rounded-2xl border border-bronze/15 shadow-md">
                <img
                  src={galleryImages[0]}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover sm:h-[380px]"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-bronze/15 bg-white p-4 shadow-sm sm:absolute sm:-bottom-6 sm:left-4 sm:mt-0 sm:max-w-[260px] lg:left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bronze text-white">
                    <Award size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-charcoal sm:text-base">
                      ضمان شامل
                    </div>
                    <div className="text-xs text-charcoal-soft/65 sm:text-sm">
                      على جميع الأعمال
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-bronze/15 bg-white py-12 sm:py-16">
        <div className="section-container text-center">
          <MapPin className="mx-auto mb-4 h-9 w-9 text-bronze" />
          <h2 className="mb-3 text-xl font-extrabold text-charcoal sm:text-2xl">
            نغطي جميع مناطق المملكة
          </h2>
          <p className="section-desc mx-auto mb-6">{service.areasText}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {client.serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-bronze/20 bg-ivory px-3 py-1.5 text-xs font-semibold text-bronze-dark sm:text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="section-container text-center">
          <div className="section-badge mb-5 border-bronze/30 bg-charcoal-soft text-bronze-light">
            <HardHat size={14} className="shrink-0" />
            <span>ابدأ مشروعك الآن</span>
          </div>

          <h2 className="section-title mb-4 text-white">جاهزون لتنفيذ مشروعك؟</h2>
          <p className="section-desc mx-auto mb-8 text-ivory/70">
            احصل على عرض سعر مجاني ومعاينة فورية من {client.companyName}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury w-full sm:w-auto"
            >
              <MessageCircle size={20} className="shrink-0" />
              اطلب عرض سعر مجاني
            </a>
            <a
              href={contactLinks.phone}
              className="btn-modern w-full border-ivory/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
            >
              <Phone size={20} className="shrink-0" />
              اتصل بنا الآن
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageTemplate;
