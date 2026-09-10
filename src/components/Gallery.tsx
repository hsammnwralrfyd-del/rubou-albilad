import { useState } from "react";
import { X, ZoomIn, Grid3x3, ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { servicesList } from "@/config/services";
import { assetPath } from "@/lib/assetPath";

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a combined gallery from all services
  const allImages = servicesList.flatMap((service) =>
    Array.from({ length: service.galleryImageCount }, (_, index) => ({
      src: assetPath(`/${service.folder}/${index + 1}.webp`),
      alt: `${service.title} - صورة ${index + 1}`,
      service: service.shortTitle,
    }))
  );

  const categories = ["الكل", ...Array.from(new Set(allImages.map((img) => img.service)))];
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredImages =
    selectedCategory === "الكل"
      ? allImages
      : allImages.filter((img) => img.service === selectedCategory);

  const handleImageClick = (src: string) => {
    const index = filteredImages.findIndex((img) => img.src === src);
    setCurrentIndex(index);
    setSelectedImage(src);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex].src);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex].src);
  };

  return (
    <section className="section-padding bg-background" dir="rtl">
      <div className="section-container">
        <div className="mb-12 text-center">
          <div className="section-badge mb-5 mx-auto w-fit">
            <Grid3x3 size={14} className="shrink-0 text-accent" />
            <span>معرض الأعمال</span>
          </div>

          <h2 className="section-title mb-4">
            معرض مشاريعنا
            <span className="mt-2 block text-gradient-luxury">
              نفتخر بما قدمناه
            </span>
          </h2>

          <p className="section-desc mx-auto">
            استعرض مجموعة من مشاريعنا المنفذة في مكة المكرمة والمدينة المنورة
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                selectedCategory === category
                  ? "bg-accent text-white shadow-lg"
                  : "bg-white text-secondary border-2 border-primary/10 hover:border-primary/20 hover:bg-primary/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => handleImageClick(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <ZoomIn className="text-white" size={32} />
              </div>
              <div className="absolute bottom-0 right-0 left-0 p-4 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-white text-sm font-bold">{image.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg hover:bg-primary/5 transition-colors"
          >
            <X size={28} />
          </button>
          
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="معرض الصور"
                className="w-full h-auto rounded-lg"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg hover:bg-white transition-colors"
              >
                <ArrowRight size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg hover:bg-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;