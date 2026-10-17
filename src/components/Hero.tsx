import { PhoneCall, MessageCircle, ArrowDown, Shield, CheckCircle } from "lucide-react";
import { client, contactLinks } from "@/config/client";
import { assetPath } from "@/lib/assetPath";

export const Hero = () => {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-[calc(100dvh-72px)] overflow-hidden pt-20 sm:pt-24"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={assetPath("/hero-bg.webp")}
          alt={`${client.shortName} — مظلات وسواتر في ${client.city}`}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>

      <div className="absolute inset-0 bg-pattern-dots opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-start">
          <div className="max-w-2xl">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2">
                <Shield size={16} className="text-[#D9A441]" style={{ textShadow: "2px 2px 4px rgba(62, 39, 35, 0.8)" }} />
                <span className="text-sm font-bold text-[#FFF4DC]" style={{ textShadow: "2px 2px 4px rgba(62, 39, 35, 0.8)" }}>
                  {client.tagline}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold leading-tight text-[#FFF4DC] sm:text-5xl lg:text-6xl" style={{ textShadow: "3px 3px 6px rgba(62, 39, 35, 0.8)" }}>
                  {client.hero.title}
                  <span className="mt-2 block text-[#D9A441]" style={{ textShadow: "3px 3px 6px rgba(62, 39, 35, 0.8)" }}>
                    {client.hero.subtitle}
                  </span>
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-[#F8EBD0] sm:text-xl" style={{ textShadow: "2px 2px 4px rgba(62, 39, 35, 0.8)" }}>
                  {client.hero.paragraph1}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["جودة عالية", "أسعار تنافسية", "تنفيذ سريع", "ضمان شامل"].map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/20 px-3 py-2 text-sm font-semibold text-[#FFF4DC] shadow-sm"
                    >
                      <CheckCircle size={16} className="shrink-0 text-[#D9A441]" style={{ textShadow: "2px 2px 4px rgba(62, 39, 35, 0.8)" }} />
                      <span style={{ textShadow: "2px 2px 4px rgba(62, 39, 35, 0.8)" }}>{feature}</span>
                    </div>
                  )
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent w-full sm:w-auto"
                >
                  <MessageCircle size={20} className="shrink-0" />
                  تواصل عبر واتساب
                </a>
                <a href={contactLinks.phone} className="btn-primary w-full sm:w-auto">
                  <PhoneCall size={20} className="shrink-0" />
                  اتصل الآن
                </a>
              </div>

              <div className="border-t border-white/40 pt-4">
                <p className="text-sm font-semibold text-[#E8D5B5]" style={{ textShadow: "2px 2px 4px rgba(62, 39, 35, 0.8)" }}>
                  نخدم: {client.serviceAreas.join(" · ")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <a
        href="#services"
        className="group absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="الانتقال إلى الخدمات"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-white shadow-lg transition-all hover:scale-110 hover:border-accent">
          <ArrowDown
            size={24}
            className="text-primary transition-transform group-hover:translate-y-1"
          />
        </div>
      </a>
    </section>
  );
};

export default Hero;
