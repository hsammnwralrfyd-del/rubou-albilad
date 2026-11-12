
import {
  ArrowLeft,
  CheckCircle2,
  Settings,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getServiceGalleryPaths } from "@/config/services";
import { useSiteData } from "@/contexts/SiteDataContext";
import { assetPath } from "@/lib/assetPath";

export const Services = () => {
  const { services } = useSiteData();

  const displayedServices = services.slice(0, 8);

  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden bg-[#F7F5F0] py-20 text-[#172B3A] sm:py-28 lg:py-32"
    >
      {/* Architectural background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#D9C49A]/15 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#D8E0DF]/40 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#172B3A_1px,transparent_1px),linear-gradient(90deg,#172B3A_1px,transparent_1px)] [background-size:75px_75px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#B99A60]/30 bg-white/70 px-5 py-2.5 shadow-sm">
            <Sparkles size={15} className="text-[#B18B48]" />
            <span className="text-[11px] font-bold tracking-[0.16em] text-[#9B783D]">
              RUBOU ALBILAD
            </span>
          </div>

          <h2 className="text-3xl font-black leading-[1.5] tracking-tight text-[#172B3A] sm:text-5xl lg:text-6xl">
            نصنع المساحات
            <span className="block text-[#B18B48]">
              بمعايير استثنائية
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#64717A] sm:text-base sm:leading-9">
            حلول متكاملة للمظلات والسواتر والبرجولات والهناجر،
            بتصاميم تجمع بين قوة التنفيذ وجمال التفاصيل.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-20 bg-gradient-to-l from-transparent via-[#B99A60] to-transparent" />
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
          {displayedServices.map((service, index) => {
            const Icon =
              service.icon &&
              (typeof service.icon === "function" ||
                (typeof service.icon === "object" &&
                  "$$typeof" in service.icon))
                ? service.icon
                : Settings;

            const galleryImages = getServiceGalleryPaths(service);
            const mainImage = galleryImages[0];

            return (
              <Link
                key={service.id}
                to={service.route}
                className="group block min-w-0"
              >
                <article className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[24px] border border-[#E5E0D5] bg-white shadow-[0_8px_35px_rgba(23,43,58,0.045)] transition-all duration-700 hover:-translate-y-2 hover:border-[#C5A66D]/70 hover:shadow-[0_25px_60px_rgba(23,43,58,0.12)]">

                  {/* Image */}
                  <div className="relative h-[250px] shrink-0 overflow-hidden bg-[#E9E7E0] sm:h-[270px]">
                    {mainImage && (
                      <img
                        src={assetPath(mainImage)}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        width="900"
                        height="700"
                        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/35 via-transparent to-transparent" />

                    {/* Number */}
                    <span className="absolute right-5 top-5 flex h-10 min-w-10 items-center justify-center rounded-full border border-white/50 bg-white/90 px-3 font-mono text-xs font-bold text-[#9B783D] shadow-sm backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/90 text-[#A78343] shadow-lg backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[#B99A60] group-hover:text-white">
                      <Icon size={21} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-[2px] w-7 bg-[#B99A60]" />
                      <span className="text-[10px] font-bold tracking-[0.15em] text-[#A78343]">
                        RUBOU ALBILAD
                      </span>
                    </div>

                    <h3 className="break-words text-xl font-black leading-relaxed text-[#172B3A] transition-colors duration-300 group-hover:text-[#A78343] sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#77828A]">
                      {service.introDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {service.benefits.slice(0, 2).map((point) => (
                        <span
                          key={point}
                          className="inline-flex min-w-0 items-center gap-2 text-xs text-[#697780]"
                        >
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-[#B99A60]"
                          />
                          <span className="line-clamp-1">{point}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-[#EEEAE2] pt-5 mt-6">
                      <span className="text-sm font-bold text-[#A78343] transition-colors group-hover:text-[#172B3A]">
                        اكتشف تفاصيل الخدمة
                      </span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8C8A8] text-[#A78343] transition-all duration-500 group-hover:-translate-x-1 group-hover:border-[#B99A60] group-hover:bg-[#B99A60] group-hover:text-white">
                        <ArrowLeft size={18} />
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 right-0 h-[3px] w-0 bg-[#B99A60] transition-all duration-700 group-hover:w-full" />
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
