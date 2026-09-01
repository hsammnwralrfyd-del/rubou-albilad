import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceGalleryProps {
  images: string[];
  title: string;
  description: string;
  serviceName: string;
}

export const ServiceGallery = ({
  images,
  title,
  description,
  serviceName,
}: ServiceGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goNext();
      if (event.key === "ArrowRight") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  if (images.length === 0) return null;

  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="mb-10 text-center sm:mb-14">
            <div className="section-badge mb-5 mx-auto w-fit">
              <Camera size={14} className="shrink-0 text-bronze" />
              <span>معرض الصور</span>
            </div>
            <h2 className="section-title mb-4">
              {title}
              <span className="mt-2 block text-gradient-luxury">{serviceName}</span>
            </h2>
            <p className="section-desc mx-auto">{description}</p>
          </div>

          {/* شبكة صور نظيفة */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group overflow-hidden rounded-xl border border-bronze/15 bg-ivory text-right shadow-sm transition-all hover:border-bronze/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
                aria-label={`عرض صورة ${index + 1} من ${images.length}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={`${serviceName} - صورة ${index + 1}`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-xs font-bold text-charcoal-soft/60">
                    {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </span>
                  <Maximize2 size={14} className="shrink-0 text-bronze opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="عرض الصورة بحجم كامل"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white sm:left-4 sm:top-4"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white sm:h-11 sm:w-11"
                aria-label="الصورة السابقة"
              >
                <ChevronRight size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white sm:h-11 sm:w-11"
                aria-label="الصورة التالية"
              >
                <ChevronLeft size={20} />
              </button>
            </>
          )}

          <div
            className={cn("relative w-full max-w-4xl animate-scale-in")}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${serviceName} - صورة ${lightboxIndex + 1}`}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-sm font-bold text-white/80">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceGallery;
