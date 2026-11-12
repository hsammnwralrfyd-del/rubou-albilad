
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Layers,
  Maximize2,
  MessageCircle,
  Pause,
  Play,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { client, contactLinks } from "@/config/client";
import { assetPath } from "@/lib/assetPath";

type GalleryCategory =
  | "canopies"
  | "shutters"
  | "pergolas"
  | "warehouses"
  | "sandwich"
  | "fencing";

type ProjectItem = {
  id: string;
  title: string;
  image: string;
  category: GalleryCategory;
  categoryLabel: string;
  location: string;
  route: string;
};

type ShowcaseSlide = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  route: string;
  category: GalleryCategory;
  categoryLabel: string;
  specs: string[];
  location: string;
};

const categoryTabs: {
  id: GalleryCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "جميع الأعمال" },
  { id: "canopies", label: "المظلات" },
  { id: "shutters", label: "السواتر" },
  { id: "pergolas", label: "البرجولات" },
  { id: "warehouses", label: "الهناجر" },
  { id: "sandwich", label: "الساندوتش بانل" },
  { id: "fencing", label: "التسوير والشبوك" },
];

const showcaseSlides: ShowcaseSlide[] = [
  {
    id: "canopies",
    number: "01",
    title: "مظلات سيارات فاخرة بتصاميم هندسية عصرية",
    subtitle: "حماية وأناقة تليق بمساحتك",
    description:
      "تنفيذ مظلات سيارات بتصاميم متنوعة وخامات مناسبة للاستخدام الخارجي، مع الاهتمام بجودة التشطيب ودقة التركيب.",
    image: "/pyramidal-car-canopies/1.webp",
    route: "/car-canopies",
    category: "canopies",
    categoryLabel: "المظلات",
    specs: [
      "تصاميم هندسية متنوعة",
      "خامات مناسبة للاستخدام الخارجي",
      "تنفيذ وتركيب باهتمام بالتفاصيل",
    ],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "shutters",
    number: "02",
    title: "سواتر شرائح ومجدول لخصوصية متكاملة",
    subtitle: "حلول عملية بتشطيبات أنيقة",
    description:
      "تنفيذ السواتر بمختلف أنواعها لتوفير الخصوصية وتنظيم المساحات الخارجية بتصاميم وتشطيبات متنوعة.",
    image: "/shutters/1.webp",
    route: "/shutters",
    category: "shutters",
    categoryLabel: "السواتر",
    specs: [
      "خيارات متنوعة من السواتر",
      "تشطيبات مقاومة للعوامل الخارجية",
      "تركيب متقن وثابت",
    ],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "pergolas",
    number: "03",
    title: "برجولات حديد بتصاميم عصرية وتشطيبات فاخرة",
    subtitle: "مساحات خارجية بطابع معماري مميز",
    description:
      "تصميم وتنفيذ البرجولات للحدائق والأسطح والجلسات الخارجية، مع خيارات متعددة للتغطية والتشطيب.",
    image: "/Pergolas1/1.webp",
    route: "/pergolas",
    category: "pergolas",
    categoryLabel: "البرجولات",
    specs: [
      "تصاميم عصرية ومتنوعة",
      "خيارات تشطيب متعددة",
      "مناسبة للحدائق والأسطح",
    ],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "warehouses",
    number: "04",
    title: "هناجر ومستودعات بهياكل حديدية متينة",
    subtitle: "تنفيذ عملي بمواصفات مدروسة",
    description:
      "تنفيذ الهناجر والمستودعات والهياكل الحديدية بمختلف الاستخدامات، مع الاهتمام بجودة التصنيع والتركيب.",
    image: "/WarehousesDetail1/1.webp",
    route: "/warehouses",
    category: "warehouses",
    categoryLabel: "الهناجر",
    specs: [
      "هياكل حديدية متينة",
      "تنفيذ حسب طبيعة المشروع",
      "اهتمام بدقة التركيب",
    ],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "sandwich",
    number: "05",
    title: "تركيب ألواح الساندوتش بانل للعزل والحماية",
    subtitle: "حلول بناء وعزل متعددة الاستخدامات",
    description:
      "تنفيذ وتركيب ألواح الساندوتش بانل للمستودعات والغرف والملاحق، مع خيارات متنوعة حسب احتياج المشروع.",
    image: "/sandwich-warehouses/1.webp",
    route: "/sandwich-panel",
    category: "sandwich",
    categoryLabel: "الساندوتش بانل",
    specs: [
      "ألواح متعددة الاستخدامات",
      "خيارات عزل متنوعة",
      "تركيب باهتمام بالتفاصيل",
    ],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "fencing",
    number: "06",
    title: "تسوير الأراضي والمزارع بالشبوك",
    subtitle: "حماية وتنظيم للمساحات الخارجية",
    description:
      "تنفيذ أعمال التسوير والتحويش والشبوك للأراضي والمزارع والمواقع المختلفة بخيارات متعددة.",
    image: "/fencing/1.webp",
    route: "/fencing",
    category: "fencing",
    categoryLabel: "التسوير والشبوك",
    specs: [
      "خيارات شبوك متعددة",
      "مناسبة للأراضي والمزارع",
      "تنفيذ وتركيب حسب الموقع",
    ],
    location: "مكة المكرمة والمدينة المنورة",
  },
];

const rawProjects: ProjectItem[] = [
  {
    id: "canopies-1",
    title: "مظلة سيارات بتصميم هرمي",
    image: "/pyramidal-car-canopies/1.webp",
    category: "canopies",
    categoryLabel: "المظلات",
    location: "مكة المكرمة",
    route: "/car-canopies",
  },
  {
    id: "canopies-2",
    title: "مظلة سيارات بتصميم هرمي",
    image: "/pyramidal-car-canopies/2.webp",
    category: "canopies",
    categoryLabel: "المظلات",
    location: "المدينة المنورة",
    route: "/pyramidal-car-canopies",
  },
  {
    id: "canopies-3",
    title: "مظلة سيارات قوس فرنسي",
    image: "/french-arch-canopies/1.webp",
    category: "canopies",
    categoryLabel: "المظلات",
    location: "مكة المكرمة",
    route: "/french-arch-canopies",
  },
  {
    id: "canopies-4",
    title: "مظلة حدائق خارجية",
    image: "/garden-canopies/1.webp",
    category: "canopies",
    categoryLabel: "المظلات",
    location: "المدينة المنورة",
    route: "/garden-canopies",
  },
  {
    id: "canopies-5",
    title: "مظلة بتصميم قوس فرنسي",
    image: "/french-arch-canopies/2.webp",
    category: "canopies",
    categoryLabel: "المظلات",
    location: "مكة المكرمة",
    route: "/canopies",
  },
  {
    id: "canopies-6",
    title: "تنفيذ مظلة سيارات",
    image: "/canopies/1.webp",
    category: "canopies",
    categoryLabel: "المظلات",
    location: "المدينة المنورة",
    route: "/car-canopies",
  },
  {
    id: "shutters-1",
    title: "ساتر شرائح",
    image: "/shutters/1.webp",
    category: "shutters",
    categoryLabel: "السواتر",
    location: "مكة المكرمة",
    route: "/shutters",
  },
  {
    id: "shutters-2",
    title: "ساتر خارجي",
    image: "/shutters/2.webp",
    category: "shutters",
    categoryLabel: "السواتر",
    location: "المدينة المنورة",
    route: "/shutters",
  },
  {
    id: "shutters-3",
    title: "ساتر مع أعمال تسوير",
    image: "/fencing-shutters/1.webp",
    category: "shutters",
    categoryLabel: "السواتر",
    location: "مكة المكرمة",
    route: "/fencing-shutters",
  },
  {
    id: "shutters-4",
    title: "تنفيذ ساتر خارجي",
    image: "/shutters/3.webp",
    category: "shutters",
    categoryLabel: "السواتر",
    location: "المدينة المنورة",
    route: "/shutters",
  },
  {
    id: "pergolas-1",
    title: "برجولة حديد",
    image: "/Pergolas1/1.webp",
    category: "pergolas",
    categoryLabel: "البرجولات",
    location: "مكة المكرمة",
    route: "/pergolas",
  },
  {
    id: "pergolas-2",
    title: "برجولة بتصميم عصري",
    image: "/Pergolas1/2.webp",
    category: "pergolas",
    categoryLabel: "البرجولات",
    location: "المدينة المنورة",
    route: "/pergolas",
  },
  {
    id: "pergolas-3",
    title: "كسوة خشبية خارجية",
    image: "/WoodCladding1/1.webp",
    category: "pergolas",
    categoryLabel: "البرجولات",
    location: "مكة المكرمة",
    route: "/wood-cladding",
  },
  {
    id: "pergolas-4",
    title: "برجولة خارجية",
    image: "/Pergolas1/3.webp",
    category: "pergolas",
    categoryLabel: "البرجولات",
    location: "المدينة المنورة",
    route: "/pergolas",
  },
  {
    id: "warehouses-1",
    title: "هنجر حديد",
    image: "/WarehousesDetail1/1.webp",
    category: "warehouses",
    categoryLabel: "الهناجر",
    location: "مكة المكرمة",
    route: "/warehouses",
  },
  {
    id: "warehouses-2",
    title: "تنفيذ مستودع حديد",
    image: "/WarehousesDetail1/2.webp",
    category: "warehouses",
    categoryLabel: "الهناجر",
    location: "المدينة المنورة",
    route: "/warehouses-detail",
  },
  {
    id: "warehouses-3",
    title: "هيكل هنجر حديدي",
    image: "/WarehousesDetail1/3.webp",
    category: "warehouses",
    categoryLabel: "الهناجر",
    location: "مكة المكرمة",
    route: "/warehouses",
  },
  {
    id: "sandwich-1",
    title: "مستودع ساندوتش بانل",
    image: "/sandwich-warehouses/1.webp",
    category: "sandwich",
    categoryLabel: "الساندوتش بانل",
    location: "المدينة المنورة",
    route: "/sandwich-warehouses",
  },
  {
    id: "sandwich-2",
    title: "تركيب ألواح ساندوتش بانل",
    image: "/sandwich-warehouses/2.webp",
    category: "sandwich",
    categoryLabel: "الساندوتش بانل",
    location: "مكة المكرمة",
    route: "/sandwich-panel",
  },
  {
    id: "sandwich-3",
    title: "تنفيذ مستودع معزول",
    image: "/sandwich-warehouses/3.webp",
    category: "sandwich",
    categoryLabel: "الساندوتش بانل",
    location: "المدينة المنورة",
    route: "/sandwich-panel",
  },
  {
    id: "fencing-1",
    title: "تسوير أرض بالشبوك",
    image: "/fencing/1.webp",
    category: "fencing",
    categoryLabel: "التسوير والشبوك",
    location: "مكة المكرمة",
    route: "/fencing",
  },
  {
    id: "fencing-2",
    title: "تسوير موقع",
    image: "/building-fencing/1.webp",
    category: "fencing",
    categoryLabel: "التسوير والشبوك",
    location: "المدينة المنورة",
    route: "/building-fencing",
  },
  {
    id: "fencing-3",
    title: "تنفيذ شبك حماية",
    image: "/fencing/2.webp",
    category: "fencing",
    categoryLabel: "التسوير والشبوك",
    location: "مكة المكرمة",
    route: "/fencing",
  },
  {
    id: "fencing-4",
    title: "تسوير مبنى",
    image: "/building-fencing/2.webp",
    category: "fencing",
    categoryLabel: "التسوير والشبوك",
    location: "المدينة المنورة",
    route: "/building-fencing",
  },
];

type LightboxItem = {
  title: string;
  image: string;
  categoryLabel: string;
  location: string;
  route: string;
};

export const Gallery = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<
    GalleryCategory | "all"
  >("all");
  const [lightboxProject, setLightboxProject] =
    useState<LightboxItem | null>(null);

  const currentSlide = showcaseSlides[currentSlideIndex];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return rawProjects;
    return rawProjects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    return {
      all: rawProjects.length,
      canopies: rawProjects.filter((p) => p.category === "canopies").length,
      shutters: rawProjects.filter((p) => p.category === "shutters").length,
      pergolas: rawProjects.filter((p) => p.category === "pergolas").length,
      warehouses: rawProjects.filter((p) => p.category === "warehouses").length,
      sandwich: rawProjects.filter((p) => p.category === "sandwich").length,
      fencing: rawProjects.filter((p) => p.category === "fencing").length,
    };
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((previous) => (
      previous + 1
    ) % showcaseSlides.length);
    setSlideProgress(0);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((previous) => (
      previous - 1 + showcaseSlides.length
    ) % showcaseSlides.length);
    setSlideProgress(0);
  }, []);

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setSlideProgress(0);
  };

  const handleOpenProjectLightbox = (project: ProjectItem) => {
    setLightboxProject({
      title: project.title,
      image: project.image,
      categoryLabel: project.categoryLabel,
      location: project.location,
      route: project.route,
    });
  };

  const handleOpenSlideLightbox = () => {
    setLightboxProject({
      title: currentSlide.title,
      image: currentSlide.image,
      categoryLabel: currentSlide.categoryLabel,
      location: currentSlide.location,
      route: currentSlide.route,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxProject(null);
  };

  useEffect(() => {
    if (isPaused || lightboxProject) return;

    const interval = window.setInterval(() => {
      setSlideProgress((previous) => {
        if (previous >= 100) {
          setCurrentSlideIndex((index) => (
            index + 1
          ) % showcaseSlides.length);
          return 0;
        }
        return previous + 100 / 110;
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [isPaused, lightboxProject]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseLightbox();

      if (lightboxProject) return;

      if (event.key === "ArrowRight") handlePrevSlide();
      if (event.key === "ArrowLeft") handleNextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxProject, handleNextSlide, handlePrevSlide]);

  const whatsappUrl = contactLinks.whatsapp;
  const phoneUrl = contactLinks.phone;

  return (
    <section
      id="portfolio"
      dir="rtl"
      className="relative overflow-hidden bg-[#F8F7F3] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#D8C39A]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#D8C39A]/10 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C8AA72]/35 bg-white px-5 py-2 text-sm font-medium text-[#94733D] shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>أعمال نفخر بتنفيذها</span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#17283D] sm:text-4xl lg:text-5xl">
            معرض أعمالنا
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C8AA72]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8AA72]" />
            <span className="h-px w-12 bg-[#C8AA72]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#687383] sm:text-lg">
            نماذج من أعمالنا في المظلات والسواتر والبرجولات والهناجر
            والتسوير في مكة المكرمة والمدينة المنورة.
          </p>
        </div>

        {/* Featured showcase */}
        <div className="relative mb-16 overflow-hidden rounded-[28px] border border-[#E7E0D3] bg-white shadow-[0_24px_70px_rgba(23,40,61,0.10)]">
          <div className="relative min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[610px]">
            <img
              key={currentSlide.image}
              src={assetPath(currentSlide.image)}
              alt={currentSlide.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D]/95 via-[#101D2D]/55 to-[#101D2D]/10" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#101D2D]/55 via-transparent to-transparent" />

            {/* Showcase top bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-5 sm:p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-md">
                <Award className="h-4 w-4 text-[#E4C78F]" />
                <span>{currentSlide.categoryLabel}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaused((value) => !value)}
                  aria-label={isPaused ? "تشغيل العرض" : "إيقاف العرض"}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                >
                  {isPaused ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOpenSlideLightbox}
                  aria-label="تكبير الصورة"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Showcase content */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-9 lg:p-12">
              <div className="max-w-3xl">
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-sm font-semibold tracking-[0.25em] text-[#E5C991]">
                    PROJECT {currentSlide.number}
                  </span>
                  <span className="h-px w-12 bg-[#E5C991]/70" />
                </div>

                <h3 className="max-w-2xl break-words text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl">
                  {currentSlide.title}
                </h3>

                <p className="mt-3 text-base font-medium leading-8 text-[#E7D8B9] sm:text-lg">
                  {currentSlide.subtitle}
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">
                  {currentSlide.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {currentSlide.specs.map((spec) => (
                    <div
                      key={spec}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur-sm sm:text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E5C991]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to={currentSlide.route}
                    className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#D6B77C] px-6 py-3 text-sm font-bold text-[#17283D] shadow-lg transition hover:bg-[#E5C991]"
                  >
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleOpenSlideLightbox}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <ZoomIn className="h-4 w-4" />
                    مشاهدة الصورة
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="المشروع السابق"
              className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20 sm:flex"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="المشروع التالي"
              className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20 sm:flex"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Progress */}
            <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/20">
              <div
                className="h-full bg-[#D6B77C] transition-[width] duration-100"
                style={{ width: `${slideProgress}%` }}
              />
            </div>
          </div>

          {/* Showcase thumbnails */}
          <div className="grid grid-cols-3 gap-2 border-t border-[#EEE8DC] bg-white p-3 sm:grid-cols-6 sm:gap-3 sm:p-4">
            {showcaseSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelectSlide(index)}
                className={`group relative overflow-hidden rounded-xl text-right transition ${
                  currentSlideIndex === index
                    ? "ring-2 ring-[#C6A66C] ring-offset-2"
                    : "opacity-65 hover:opacity-100"
                }`}
              >
                <img
                  src={assetPath(slide.image)}
                  alt={slide.categoryLabel}
                  className="h-16 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D]/80 to-transparent" />
                <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-white sm:text-xs">
                  {slide.categoryLabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#A1834F]">
              <Layers className="h-4 w-4" />
              <span>نماذج من تنفيذنا</span>
            </div>

            <h3 className="text-2xl font-bold text-[#17283D] sm:text-3xl">
              استكشف مشاريعنا
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-[#7B8490]">
            <Building2 className="h-4 w-4 text-[#B99A61]" />
            <span>{filteredProjects.length} مشروع</span>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-9 flex gap-2 overflow-x-auto pb-3">
          {categoryTabs.map((tab) => {
            const count =
              categoryCounts[tab.id as keyof typeof categoryCounts];

            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "border-[#17283D] bg-[#17283D] text-white shadow-md"
                    : "border-[#E3DCCF] bg-white text-[#657080] hover:border-[#C6A66C] hover:text-[#17283D]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-white/15 text-[#E5C991]"
                      : "bg-[#F2EFE8] text-[#8A7757]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white shadow-[0_8px_30px_rgba(23,40,61,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D2BD93] hover:shadow-[0_18px_45px_rgba(23,40,61,0.11)]"
              style={{
                animationDelay: `${index * 40}ms`,
              }}
            >
              <button
                type="button"
                onClick={() => handleOpenProjectLightbox(project)}
                className="relative block aspect-[4/3] w-full overflow-hidden text-right"
                aria-label={`مشاهدة ${project.title}`}
              >
                <img
                  src={assetPath(project.image)}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D]/65 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#17283D] shadow-sm backdrop-blur">
                  {project.categoryLabel}
                </span>

                <span className="absolute bottom-4 left-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-[#D6B77C] text-[#17283D] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5" />
                </span>
              </button>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-xs text-[#9A835D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66C]" />
                  {project.location}
                </div>

                <h4 className="min-h-[52px] text-base font-bold leading-7 text-[#17283D] transition-colors group-hover:text-[#9A7945]">
                  {project.title}
                </h4>

                <div className="mt-4 flex items-center justify-between border-t border-[#F0ECE5] pt-4">
                  <Link
                    to={project.route}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A7945] transition hover:text-[#17283D]"
                  >
                    تفاصيل الخدمة
                    <ChevronLeft className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleOpenProjectLightbox(project)}
                    aria-label="عرض الصورة"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F2EC] text-[#8F754A] transition hover:bg-[#17283D] hover:text-white"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="relative mt-20 overflow-hidden rounded-[28px] bg-[#17283D] px-6 py-10 shadow-[0_20px_55px_rgba(23,40,61,0.16)] sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -left-10 -top-16 h-52 w-52 rounded-full border border-[#D6B77C]/20" />

          <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-right">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#E5C991]">
                <ShieldCheck className="h-5 w-5" />
                <span>نبدأ مشروعك بخطوات واضحة</span>
              </div>

              <h3 className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                هل لديك مشروع ترغب في تنفيذه؟
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
                تواصل معنا لمناقشة متطلبات مشروعك في مكة المكرمة أو المدينة المنورة.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#D6B77C] px-7 py-3 text-sm font-bold text-[#17283D] transition hover:bg-[#E5C991]"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل عبر واتساب
              </a>

              <a
                href={phoneUrl}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <PhoneCall className="h-5 w-5" />
                اتصال مباشر
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image lightbox */}
      <Dialog
        open={!!lightboxProject}
        onOpenChange={(open) => {
          if (!open) handleCloseLightbox();
        }}
      >
        <DialogContent className="max-h-[95vh] w-[calc(100%-24px)] max-w-5xl overflow-hidden rounded-2xl border border-[#D8C9AC] bg-[#F8F7F3] p-0">
          {lightboxProject && (
            <div className="relative">
              <div className="relative flex min-h-[250px] max-h-[72vh] items-center justify-center overflow-hidden bg-[#101D2D]">
                <img
                  src={assetPath(lightboxProject.image)}
                  alt={lightboxProject.title}
                  className="max-h-[72vh] w-full object-contain"
                />

                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  aria-label="إغلاق الصورة"
                  className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#EDE5D6] px-3 py-1.5 text-xs font-semibold text-[#8B7044]">
                    {lightboxProject.categoryLabel}
                  </span>

                  <span className="text-sm text-[#7C8794]">
                    {lightboxProject.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-relaxed text-[#17283D] sm:text-2xl">
                  {lightboxProject.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={lightboxProject.route}
                    onClick={handleCloseLightbox}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#17283D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#263E59]"
                  >
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4" />
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D8C9AC] bg-white px-6 py-3 text-sm font-semibold text-[#8B7044] transition hover:bg-[#F1EBDD]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    اطلب تنفيذ عمل مشابه
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
