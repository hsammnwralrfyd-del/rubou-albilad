import { Phone, MessageCircle, ArrowDown, Shield, CheckCircle } from "lucide-react";
import { client, contactLinks } from "@/config/client";

export const Hero = () => {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-[calc(100dvh-72px)] overflow-hidden bg-gradient-to-br from-background via-white to-primary/5 pt-20 sm:pt-24"
    >
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
        <div className="grid min-h-[calc(100dvh-8rem)] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
                <Shield size={16} className="text-accent-dark" />
                <span className="text-sm font-bold text-accent-dark">
                  {client.tagline}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl">
                  {client.hero.title}
                  <span className="mt-2 block text-gradient-luxury">
                    {client.hero.subtitle}
                  </span>
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-secondary sm:text-xl">
                  {client.hero.paragraph1}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["جودة عالية", "أسعار تنافسية", "تنفيذ سريع", "ضمان شامل"].map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-xl border border-primary/10 bg-white/80 px-3 py-2 text-sm font-semibold text-secondary shadow-sm"
                    >
                      <CheckCircle size={16} className="shrink-0 text-accent" />
                      <span>{feature}</span>
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
                  <Phone size={20} className="shrink-0" />
                  اتصل الآن
                </a>
              </div>

              <div className="border-t border-primary/10 pt-4">
                <p className="text-sm font-semibold text-secondary-light">
                  نخدم: {client.serviceAreas.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 rotate-2 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/20" />
              <div className="relative overflow-hidden rounded-3xl border border-primary/10 shadow-2xl">
                <img
                  src="/hero-bg.webp"
                  alt={`${client.shortName} — مظلات وسواتر في ${client.city}`}
                  className="h-[360px] w-full object-cover sm:h-[480px] lg:h-[560px]"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 left-5 rounded-2xl border border-white/20 bg-white/90 p-4 backdrop-blur-md sm:right-auto sm:max-w-xs">
                  <p className="text-sm font-extrabold text-primary">{client.shortName}</p>
                  <p className="mt-1 text-xs font-semibold text-secondary">
                    {client.phoneDisplay} · {client.city}
                  </p>
                </div>
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
