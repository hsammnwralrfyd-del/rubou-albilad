
import {
  PhoneCall,
  MessageCircle,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  ArrowUpLeft,
  Sparkles,
  MapPin,
} from "lucide-react";

import { useSiteData } from "@/contexts/SiteDataContext";
import { assetPath } from "@/lib/assetPath";

export const Hero = () => {
  const { client, contactLinks, siteSettings } = useSiteData();

  const heroTitle = String(
    siteSettings?.hero_title || client.hero.title || ""
  );

  const heroSubtitle = String(
    siteSettings?.hero_subtitle || client.hero.subtitle || ""
  );

  const heroParagraph = String(
    siteSettings?.hero_paragraph1 || client.hero.paragraph1 || ""
  );

  const heroImage = String(
    siteSettings?.hero_image || "/hero-bg.webp"
  );

  const tagline = String(client.tagline ?? "");
  const shortName = String(client.shortName ?? "");

  const features = [
    "جودة عالية",
    "أسعار تنافسية",
    "تنفيذ احترافي",
    "اهتمام بالتفاصيل",
  ];

  return (
    <section
      id="home"
      dir="rtl"
      className="relative isolate flex min-h-[700px] items-center overflow-hidden bg-[#172331] text-white sm:min-h-[740px] lg:min-h-[780px] xl:min-h-[820px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src={assetPath(heroImage)}
          alt={`${shortName || "ربوع البلاد"} - مظلات وسواتر`}
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Light Transparent Overlays */}
      <div className="absolute inset-0 -z-10 bg-[#101B29]/25" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#101B29]/65 via-[#101B29]/25 to-transparent" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101B29]/40 via-transparent to-transparent" />

      {/* Soft Golden Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-64 w-64 rounded-full bg-[#D5B77E]/10 blur-[100px] sm:h-80 sm:w-80"
      />

      {/* Content Container */}
      <div className="section-container relative w-full py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl">

          {/* Tagline */}
          <div className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#E4C58E]/45 bg-black/15 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:mb-8 sm:gap-3 sm:px-5 sm:py-3">
            <Sparkles
              size={17}
              className="shrink-0 text-[#E8C98F]"
            />

            <span className="text-xs font-semibold tracking-wide text-[#F5E6C9] sm:text-sm">
              {tagline || "حلول هندسية بمعايير راقية"}
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 sm:space-y-5">
            <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.65] tracking-tight text-white sm:text-5xl sm:leading-[1.5] lg:text-6xl lg:leading-[1.4] xl:text-7xl">
              {heroTitle}

              {heroSubtitle && (
                <span className="mt-1 block text-[#E8C98F]">
                  {heroSubtitle}
                </span>
              )}
            </h1>

            <p className="max-w-2xl text-sm font-medium leading-8 text-white/90 sm:text-base sm:leading-9 lg:text-lg lg:leading-10">
              {heroParagraph}
            </p>
          </div>

          {/* Features */}
          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-x-3 gap-y-4 sm:mt-9 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-5 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex min-w-0 items-center gap-2"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E8C98F]/50 bg-[#D9B777]/20">
                  <CheckCircle2
                    size={14}
                    className="text-[#F0D39D]"
                  />
                </span>

                <span className="text-xs font-semibold text-white sm:text-sm">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Contact Buttons */}
          <div className="mt-9 flex w-full flex-col gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:gap-4">

            {/* WhatsApp Button */}
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل معنا عبر واتساب"
              className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#20B96B] px-6 py-3.5 font-bold text-white shadow-[0_10px_30px_rgba(32,185,107,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#18A75F] hover:shadow-[0_14px_35px_rgba(32,185,107,0.32)] sm:min-h-[62px] sm:w-auto sm:rounded-2xl sm:px-8"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MessageCircle size={21} />
              </span>

              <span className="whitespace-nowrap text-sm sm:text-base">
                تواصل عبر واتساب
              </span>

              <ArrowUpLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* Phone Button */}
            <a
              href={contactLinks.phone}
              aria-label="اتصل بنا"
              className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl border border-white/45 bg-white/15 px-6 py-3.5 font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8C98F] hover:bg-white/25 sm:min-h-[62px] sm:w-auto sm:rounded-2xl sm:px-8"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9B777]/25">
                <PhoneCall
                  size={20}
                  className="text-[#F0D39D]"
                />
              </span>

              <span className="whitespace-nowrap text-sm sm:text-base">
                اتصل الآن
              </span>
            </a>
          </div>

          {/* Service Areas */}
          <div className="mt-9 flex flex-col gap-3 border-t border-white/25 pt-6 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:pt-7">
            <div className="flex items-center gap-2 text-[#E8C98F]">
              <MapPin size={19} className="shrink-0" />

              <span className="text-sm font-bold">
                نطاق خدماتنا
              </span>
            </div>

            <span className="hidden h-5 w-px bg-white/30 sm:block" />

            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
              <span>المدينة المنورة</span>

              <span className="h-1 w-1 rounded-full bg-[#E8C98F]" />

              <span>مكة المكرمة</span>
            </div>

            <div className="hidden items-center gap-2 text-xs text-white/75 lg:flex lg:mr-auto">
              <ShieldCheck
                size={16}
                className="text-[#E8C98F]"
              />

              <span>{shortName || "ربوع البلاد"}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href="#services"
            aria-label="الانتقال إلى الخدمات"
            className="group flex items-center gap-3 rounded-full border border-white/30 bg-black/10 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#E8C98F] hover:bg-white/15 hover:text-white sm:py-3"
          >
            اكتشف خدماتنا

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D9B777]/25 transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown
                size={17}
                className="text-[#F0D39D]"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
