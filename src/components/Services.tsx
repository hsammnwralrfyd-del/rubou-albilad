import { ArrowLeft, CheckCircle2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesList, getServiceGalleryPaths } from "@/config/services";
import { client } from "@/config/client";
import { assetPath } from "@/lib/assetPath";

export const Services = () => {
  return (
    <section
      id="services"
      dir="rtl"
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="bg-pattern-dots absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="section-badge mb-5">
            <Settings size={14} className="shrink-0 text-accent" />
            <span>خدماتنا المتكاملة</span>
          </div>

          <h2 className="section-title mb-4">
            خدماتنا
            <span className="mt-2 block text-gradient-luxury">
              في مكة المكرمة والمدينة المنورة
            </span>
          </h2>

          <p className="section-desc mx-auto">
            نقدم مجموعة متكاملة من خدمات المظلات والسواتر والبرجولات والهناجر
            والساندوتش بانل والشبوك بأعلى معايير الجودة.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const galleryImages = getServiceGalleryPaths(service);

            return (
              <Link
                key={service.id}
                to={service.route}
                className="group block"
              >
                <article className="card-new h-full">
                  {/* Images Grid */}
                  <div className="grid grid-cols-2 gap-1 p-1">
                    {galleryImages.slice(0, 4).map((image, imgIndex) => (
                      <div key={imgIndex} className="relative h-24 overflow-hidden sm:h-28">
                        <img
                          src={assetPath(image)}
                          alt={`${service.title} — صورة ${imgIndex + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="icon-new !h-11 !w-11 shrink-0">
                        <Icon size={20} className="shrink-0" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-extrabold leading-tight text-primary sm:text-xl">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-accent">
                          {service.badge}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-secondary sm:text-base">
                      {service.introDescription.slice(0, 100)}...
                    </p>

                    <ul className="mb-5 space-y-2">
                      {service.benefits.slice(0, 3).map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs text-secondary sm:text-sm"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-accent"
                          />
                          <span className="min-w-0 break-words">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 border-t border-primary/10 pt-4 text-sm font-bold text-primary transition-colors group-hover:text-accent">
                      تفاصيل الخدمة
                      <ArrowLeft
                        size={18}
                        className="shrink-0 transition-transform group-hover:-translate-x-1"
                      />
                    </div>
                  </div>
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
