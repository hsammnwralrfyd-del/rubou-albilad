import { useState, useMemo, useEffect, useCallback } from "react";
import {
  ZoomIn,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  PhoneCall,
  MessageCircle,
  Eye,
  ChevronLeft,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Pause,
  Play,
  Maximize2,
  Layers,
  Award,
  Compass,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { client, contactLinks } from "@/config/client";
import { assetPath } from "@/lib/assetPath";
import { Link } from "react-router-dom";

// Types
export type GalleryCategory =
  | "all"
  | "canopies"
  | "shutters"
  | "pergolas"
  | "warehouses"
  | "sandwich"
  | "fencing";

export interface ProjectItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  categoryBadge: string;
  image: string;
  route: string;
  location: string;
}

export interface ShowcaseSlide {
  id: string;
  number: string;
  categoryKey: GalleryCategory;
  categoryBadge: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  route: string;
  specs: string[];
  location: string;
}

// 1. القالب السينمائي الفخم جداً لعرض الأقسام الستة الأساسية
const showcaseSlides: ShowcaseSlide[] = [
  {
    id: "showcase-canopies",
    number: "01",
    categoryKey: "canopies",
    categoryBadge: "مظلات سيارات ومواقف",
    shortLabel: "مظلات السيارات",
    title: "مظلات سيارات فاخرة بتغطيات معزولة وتصاميم هندسية عصرية",
    subtitle: "عزل حراري عالي الكفاءة وحماية ممتازة من أشعة الشمس المباشرة",
    description:
      "تنفيذ أحدث مظلات مواقف السيارات بتصاميم كابولي وهرمية ومخروطية، باستخدام خامات بي في سي وبولي إيثيلين ألمانية وكورية فائقة المتانة ومقاومة لعوامل الرياح والأمطار.",
    image: "/pyramidal-car-canopies/1.webp",
    route: "/car-canopies",
    specs: ["عزل حراري عالي الكفاءة", "أقمشة ألمانية وكورية أصلية", "خيارات ضمان بحسب الاتفاق والمواصفات"],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "showcase-shutters",
    number: "02",
    categoryKey: "shutters",
    categoryBadge: "سواتر خصوصية وحماية",
    shortLabel: "السواتر والخصوصية",
    title: "سواتر شرائح ومجدول لحجب الرؤية وتأمين خصوصية الفلل",
    subtitle: "دهانات نارية حرارية مقاومة للصدأ والتآكل بتثبيت هندسي صلب",
    description:
      "تصميم وتركيب سواتر حديد وبلاستيك معالج بأعلى معايير الأمان لحجب الرؤية وتوفير خصوصية عالية للفلل والقصور مع مقاومة ممتازة لسرعات الرياح والعوامل الجوية.",
    image: "/shutters/1.webp",
    route: "/shutters",
    specs: ["حجب رؤية ممتاز", "دهانات فرن حرارية نارية", "تثبيت آمن ومدروس هندسياً"],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "showcase-pergolas",
    number: "03",
    categoryKey: "pergolas",
    categoryBadge: "برجولات وجلسات حدائق",
    shortLabel: "البرجولات والحدائق",
    title: "برجولات حديد بتشطيب خشبي فخم وتغطيات لكسان شفافة",
    subtitle: "جلسات أسطح وحدائق راقية تجمع بين صلابة الحديد ومظهر الخشب",
    description:
      "إبداع في تنفيذ برجولات الجلسات الخارجية بتشطيب دهان حراري بمظهر الخشب الطبيعي الراقي، مع تغطيات لكسان معزولة ضد الكسر ومقاومة للأشعة فوق البنفسجية والأمطار.",
    image: "/Pergolas1/1.webp",
    route: "/pergolas",
    specs: ["تشطيب خشبي أنيق وعصري", "تغطيات لكسان أصلية ضد الكسر", "جلسات خارجية مقاومة للمناخ"],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "showcase-warehouses",
    number: "04",
    categoryKey: "warehouses",
    categoryBadge: "هناجر ومستودعات تجارية",
    shortLabel: "الهناجر والمستودعات",
    title: "تشييد وبناء الهناجر الحديدية والمستودعات بمواصفات معتمدة",
    subtitle: "هياكل حديدية وجسور متينة مطابقة لمخططات الدفاع المدني",
    description:
      "بناء المستودعات والمخازن الصناعية والورش بأفضل معايير السلامة الهندسية وتوزيع الأحمال، مع تجهيز أنظمة التصريف والعزل والتهوية المتكاملة بموجب المخططات.",
    image: "/WarehousesDetail1/1.webp",
    route: "/warehouses",
    specs: ["جسور فولاذية مطابقة للمواصفات", "موافقة لاشتراطات الدفاع المدني", "تسليم هندسي دقيق بالموقع"],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "showcase-sandwich",
    number: "05",
    categoryKey: "sandwich",
    categoryBadge: "ساندوتش بانل عازل",
    shortLabel: "الساندوتش بانل",
    title: "تركيب ألواح الساندوتش بانل فائقة العزل للحرارة والبرودة",
    subtitle: "حلول بناء حديثة وسريعة لغرف التبريد والمستودعات والملاحق",
    description:
      "تغطية وبناء الأسقف والغرف المعزولة بألواح ساندوتش بانل محشوة بفوم بولي يوريثان عالي الكثافة، المقاوم للحرائق وتسربات المياه، لتحقيق أقصى درجات كفاءة الطاقة.",
    image: "/sandwich-warehouses/1.webp",
    route: "/sandwich-panel",
    specs: ["عزل حراري وصوتي ممتاز", "فوم بولي يوريثان عالي الكثافة", "مقاوم للحرائق وعوامل التآكل"],
    location: "مكة المكرمة والمدينة المنورة",
  },
  {
    id: "showcase-fencing",
    number: "06",
    categoryKey: "fencing",
    categoryBadge: "شبوك وتسوير أراضي",
    shortLabel: "الشبوك والتسوير",
    title: "تسوير وتحويش الأراضي والمزارع بشبوك مجلفنة عالية التحمل",
    subtitle: "قواعد خرسانية صلبة وأسلاك شائكة لحماية وتأمين الممتلكات",
    description:
      "تنفيذ أعمال التحويش والتسوير الأمني للمخططات السكنية والتجارية والمزارع بشبوك مجلفنة أصلية مقاومة للصدأ، مع صبات خرسانية قوية وتثبيت مشدود باحترافية.",
    image: "/fencing/1.webp",
    route: "/fencing",
    specs: ["شبوك مجلفنة أصلية ضد الصدأ", "قواعد خرسانية صلبة ومحكمة", "أسلاك شائكة للحماية الأمنية"],
    location: "مكة المكرمة والمدينة المنورة",
  },
];

// 2. قائمة المشاريع الكاملة (مقاس موحد للصور بنسبة 100% وبدون بيوت شعر أو قراميد)
const rawProjects: ProjectItem[] = [
  // 1. مظلات وسيارات
  {
    id: "canopies-1",
    title: "مظلات سيارات كابولي حديثة للمواقف",
    category: "canopies",
    categoryLabel: "مظلات سيارات",
    categoryBadge: "مظلات",
    image: "/pyramidal-car-canopies/1.webp",
    route: "/car-canopies",
    location: "مكة المكرمة",
  },
  {
    id: "canopies-2",
    title: "مظلات سيارات هرمية بتغطية بي في سي",
    category: "canopies",
    categoryLabel: "مظلات هرمية",
    categoryBadge: "مظلات",
    image: "/pyramidal-car-canopies/2.webp",
    route: "/pyramidal-car-canopies",
    location: "المدينة المنورة",
  },
  {
    id: "canopies-3",
    title: "مظلات قوس فرنسي لمداخل الفلل والمنازل",
    category: "canopies",
    categoryLabel: "قوس فرنسي",
    categoryBadge: "مظلات",
    image: "/french-arch-canopies/1.webp",
    route: "/french-arch-canopies",
    location: "مكة المكرمة",
  },
  {
    id: "canopies-4",
    title: "مظلات حدائق وجلسات خارجية معزولة",
    category: "canopies",
    categoryLabel: "مظلات حدائق",
    categoryBadge: "مظلات",
    image: "/garden-canopies/1.webp",
    route: "/garden-canopies",
    location: "المدينة المنورة",
  },
  {
    id: "canopies-5",
    title: "مظلات خارجية بتغطيات مقاومة للشمس",
    category: "canopies",
    categoryLabel: "مظلات خارجية",
    categoryBadge: "مظلات",
    image: "/french-arch-canopies/2.webp",
    route: "/canopies",
    location: "مكة المكرمة",
  },
  {
    id: "canopies-6",
    title: "مظلات سيارات عصرية للمباني السكنية",
    category: "canopies",
    categoryLabel: "مظلات سكنية",
    categoryBadge: "مظلات",
    image: "/canopies/1.webp",
    route: "/car-canopies",
    location: "المدينة المنورة",
  },

  // 2. سواتر خصوصية
  {
    id: "shutters-1",
    title: "سواتر حديد مجدول لحجب الرؤية التام",
    category: "shutters",
    categoryLabel: "سواتر أحواش",
    categoryBadge: "سواتر",
    image: "/shutters/1.webp",
    route: "/shutters",
    location: "مكة المكرمة",
  },
  {
    id: "shutters-2",
    title: "سواتر شرائح خصوصية للفلل والأسوار",
    category: "shutters",
    categoryLabel: "سواتر فلل",
    categoryBadge: "سواتر",
    image: "/shutters/2.webp",
    route: "/shutters",
    location: "المدينة المنورة",
  },
  {
    id: "shutters-3",
    title: "سواتر أمان وحماية للأسوار الخارجية",
    category: "shutters",
    categoryLabel: "سواتر أمان",
    categoryBadge: "سواتر",
    image: "/fencing-shutters/1.webp",
    route: "/fencing-shutters",
    location: "مكة المكرمة",
  },
  {
    id: "shutters-4",
    title: "سواتر أسطح ومداخل خارجية بتشطيب متين",
    category: "shutters",
    categoryLabel: "سواتر أسطح",
    categoryBadge: "سواتر",
    image: "/shutters/3.webp",
    route: "/shutters",
    location: "المدينة المنورة",
  },

  // 3. برجولات وتلبيسات خشبية
  {
    id: "pergolas-1",
    title: "برجولات حديد بتشطيب خشبي للحدائق",
    category: "pergolas",
    categoryLabel: "برجولات حدائق",
    categoryBadge: "برجولات",
    image: "/Pergolas1/1.webp",
    route: "/pergolas",
    location: "مكة المكرمة",
  },
  {
    id: "pergolas-2",
    title: "جلسات خارجية وبرجولات أسطح عصرية",
    category: "pergolas",
    categoryLabel: "جلسات أسطح",
    categoryBadge: "برجولات",
    image: "/Pergolas1/2.webp",
    route: "/pergolas",
    location: "المدينة المنورة",
  },
  {
    id: "pergolas-3",
    title: "تلبيسات خشبية وديكورات واجهات خارجية",
    category: "pergolas",
    categoryLabel: "تلبيسات خشب",
    categoryBadge: "برجولات",
    image: "/WoodCladding1/1.webp",
    route: "/wood-cladding",
    location: "مكة المكرمة",
  },
  {
    id: "pergolas-4",
    title: "برجولات مودرن بتصميم هندسي متقن",
    category: "pergolas",
    categoryLabel: "برجولات مودرن",
    categoryBadge: "برجولات",
    image: "/Pergolas1/3.webp",
    route: "/pergolas",
    location: "المدينة المنورة",
  },

  // 4. هناجر ومستودعات
  {
    id: "warehouses-1",
    title: "تشييد هناجر حديد ومستودعات تجارية وصناعية",
    category: "warehouses",
    categoryLabel: "هناجر ومستودعات",
    categoryBadge: "هناجر",
    image: "/WarehousesDetail1/1.webp",
    route: "/warehouses",
    location: "مكة المكرمة",
  },
  {
    id: "warehouses-2",
    title: "هياكل حديدية وجسور معزولة للورش والمخازن",
    category: "warehouses",
    categoryLabel: "هياكل حديد",
    categoryBadge: "هناجر",
    image: "/WarehousesDetail1/2.webp",
    route: "/warehouses-detail",
    location: "المدينة المنورة",
  },
  {
    id: "warehouses-3",
    title: "جمالونات ومستودعات تخزين ضخمة معتمدة",
    category: "warehouses",
    categoryLabel: "جمالونات تخزين",
    categoryBadge: "هناجر",
    image: "/WarehousesDetail1/3.webp",
    route: "/warehouses",
    location: "مكة المكرمة",
  },

  // 5. ساندوتش بانل
  {
    id: "sandwich-1",
    title: "بناء مستودعات ساندوتش بانل عازلة للحرارة",
    category: "sandwich",
    categoryLabel: "مستودعات معزولة",
    categoryBadge: "ساندوتش بانل",
    image: "/sandwich-warehouses/1.webp",
    route: "/sandwich-warehouses",
    location: "مكة المكرمة",
  },
  {
    id: "sandwich-2",
    title: "تغطيات وأسقف ساندوتش بانل حرارية وصوتية",
    category: "sandwich",
    categoryLabel: "تغطيات ساندوتش",
    categoryBadge: "ساندوتش بانل",
    image: "/sandwich-warehouses/2.webp",
    route: "/sandwich-panel",
    location: "المدينة المنورة",
  },
  {
    id: "sandwich-3",
    title: "غرف وملاحق ومخازن ساندوتش بانل سريعة التركيب",
    category: "sandwich",
    categoryLabel: "غرف وملاحق",
    categoryBadge: "ساندوتش بانل",
    image: "/sandwich-warehouses/3.webp",
    route: "/sandwich-panel",
    location: "مكة المكرمة",
  },

  // 6. شبوك وتسوير أراضي ومزارع
  {
    id: "fencing-1",
    title: "تسوير وتحويش أراضي ومزارع بشبوك مجلفنة معتمدة",
    category: "fencing",
    categoryLabel: "تحويش أراضي",
    categoryBadge: "شبوك وتسوير",
    image: "/fencing/1.webp",
    route: "/fencing",
    location: "مكة المكرمة",
  },
  {
    id: "fencing-2",
    title: "شبوك أمنية وسياج للمباني والمنشآت والمواقع",
    category: "fencing",
    categoryLabel: "شبوك مباني",
    categoryBadge: "شبوك وتسوير",
    image: "/building-fencing/1.webp",
    route: "/building-fencing",
    location: "المدينة المنورة",
  },
  {
    id: "fencing-3",
    title: "تسوير أراضي ومخططات سكنية وتجارية بأسلاك شائكة",
    category: "fencing",
    categoryLabel: "تسوير مخططات",
    categoryBadge: "شبوك وتسوير",
    image: "/fencing/2.webp",
    route: "/fencing",
    location: "مكة المكرمة",
  },
  {
    id: "fencing-4",
    title: "سياج حديدي مجلفن وحواجز أمنية للمشاريع",
    category: "fencing",
    categoryLabel: "سياج مجلفن",
    categoryBadge: "شبوك وتسوير",
    image: "/building-fencing/2.webp",
    route: "/building-fencing",
    location: "المدينة المنورة",
  },
];

// أزرار فلاتر المعرض المحدثة
const categoryTabs = [
  { key: "all" as const, label: "جميع الأعمال", count: rawProjects.length },
  { key: "canopies" as const, label: "المظلات", count: rawProjects.filter((p) => p.category === "canopies").length },
  { key: "shutters" as const, label: "السواتر", count: rawProjects.filter((p) => p.category === "shutters").length },
  { key: "pergolas" as const, label: "البرجولات", count: rawProjects.filter((p) => p.category === "pergolas").length },
  { key: "warehouses" as const, label: "الهناجر", count: rawProjects.filter((p) => p.category === "warehouses").length },
  { key: "sandwich" as const, label: "الساندوتش بانل", count: rawProjects.filter((p) => p.category === "sandwich").length },
  { key: "fencing" as const, label: "التسوير والشبوك", count: rawProjects.filter((p) => p.category === "fencing").length },
];

export const Gallery = () => {
  // State for Showcase Slider
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  // State for Filter & Lightbox
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxProject, setLightboxProject] = useState<{
    title: string;
    image: string;
    badge: string;
    location: string;
    categoryLabel: string;
    route: string;
  } | null>(null);

  const SLIDE_DURATION_MS = 5500;
  const PROGRESS_INTERVAL_MS = 50;

  const activeSlide = showcaseSlides[currentSlideIndex];

  // Auto-play timer for Showcase
  useEffect(() => {
    if (isPaused) return;

    const progressStep = (PROGRESS_INTERVAL_MS / SLIDE_DURATION_MS) * 100;
    const progressTimer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((oldIndex) => (oldIndex + 1) % showcaseSlides.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, PROGRESS_INTERVAL_MS);

    return () => clearInterval(progressTimer);
  }, [isPaused]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setSlideProgress(0);
  };

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % showcaseSlides.length);
    setSlideProgress(0);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
    setSlideProgress(0);
  }, []);

  // Filter projects by active tab
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return rawProjects;
    return rawProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Lightbox handlers
  const handleOpenProjectLightbox = (project: ProjectItem) => {
    setLightboxProject({
      title: project.title,
      image: project.image,
      badge: project.categoryBadge,
      location: project.location,
      categoryLabel: project.categoryLabel,
      route: project.route,
    });
  };

  const handleOpenSlideLightbox = (slide: ShowcaseSlide) => {
    setLightboxProject({
      title: slide.title,
      image: slide.image,
      badge: slide.categoryBadge,
      location: slide.location,
      categoryLabel: slide.categoryBadge,
      route: slide.route,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxProject(null);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxProject]);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-[#040812] text-white" dir="rtl">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 -right-48 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 h-[600px] w-[600px] rounded-full bg-[#E8A017]/10 blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-[#F6CF7A] backdrop-blur-md mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#E8A017]" />
            <span>تنفيذ معتمد • مكة المكرمة والمدينة المنورة</span>
          </div>

          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight mb-4">
            معرض المشاريع والأعمال
            <span className="block mt-2 bg-gradient-to-r from-[#E8A017] via-[#FCE39E] to-[#E8A017] bg-clip-text text-transparent">
              بأعلى معايير الجودة والضمان
            </span>
          </h2>

          <p className="text-base text-slate-300 sm:text-lg leading-relaxed max-w-2xl mx-auto">
            نوثق لكم أحدث مشاريعنا المنجزة في المظلات، السواتر، البرجولات، الهناجر، الساندوتش بانل، والتسوير بأيدي كوادر هندسية محترفة.
          </p>

          {/* Quick Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 shadow-sm">
              <ShieldCheck size={16} className="text-[#E8A017]" />
              جودة في التنفيذ على كافة الأعمال
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 shadow-sm">
              <Building2 size={16} className="text-accent" />
              تنفيذ هندسي دقيق بالموقع
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 shadow-sm">
              <CheckCircle2 size={16} className="text-emerald-400" />
              خامات مطابقة للمواصفات القياسية
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* قالب العرض السينمائي الفخم جداً (Ultra-Luxury Showcase Stage) */}
        {/* ========================================================================= */}
        <div className="mb-20 lg:mb-28">
          {/* Stage Container */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-[#060D1A] shadow-[0_25px_80px_-15px_rgba(232,160,23,0.18)] transition-all duration-700"
          >
            {/* Top Amber Glowing Accent Line */}
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8A017] to-transparent z-40 opacity-80" />

            {/* Top Linear Animated Progress Bar */}
            <div className="absolute top-[2px] right-0 left-0 h-1 bg-white/10 z-40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E8A017] via-amber-400 to-emerald-400 transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(232,160,23,0.8)]"
                style={{ width: `${slideProgress}%` }}
              />
            </div>

            {/* Main Stage Grid */}
            <div className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col justify-between overflow-hidden">
              {/* Full Panoramic Background Image with Ken Burns Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  key={activeSlide.id}
                  src={assetPath(activeSlide.image)}
                  alt={activeSlide.title}
                  className="h-full w-full object-cover object-center scale-105 transition-all duration-1000 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* طبقة شفافة خفيفة جداً تكاد لا تُرى لظهور الصورة بألوانها الحقيقية والطبيعية بنسبة 100% */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Stage Top Bar: Controls & Status */}
              <div className="relative z-30 flex items-center justify-between p-4 sm:p-6">
                {/* Live Showcase Indicator & Badge */}
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/20 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-bold text-white">
                      {activeSlide.categoryBadge}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs text-amber-400 font-bold bg-black/50 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                    {activeSlide.number} / 06
                  </span>
                </div>

                {/* Right Top Controls: Pause/Play & Zoom */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-black/50 hover:bg-black/75 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md transition-colors shadow-lg"
                    title={isPaused ? "تشغيل التبديل التلقائي" : "إيقاف مؤقت للتبديل التلقائي"}
                  >
                    {isPaused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} className="text-[#E8A017]" />}
                    <span className="text-[11px] font-semibold">{isPaused ? "تشغيل" : "إيقاف مؤقت"}</span>
                  </button>

                  <button
                    onClick={() => handleOpenSlideLightbox(activeSlide)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-white/20 bg-black/50 hover:bg-black/75 text-white backdrop-blur-md transition-colors shadow-lg"
                    title="تكبير الصورة بالحجم الكامل"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Clickable Center Area to Open Full Lightbox */}
              <div
                onClick={() => handleOpenSlideLightbox(activeSlide)}
                className="relative z-20 flex-1 flex items-center justify-center cursor-pointer group"
                title="انقر لتكبير الصورة ومعاينتها كاملة"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 rounded-full bg-black/60 border border-white/25 backdrop-blur-md px-4 py-2 text-xs font-bold text-white shadow-2xl scale-95 group-hover:scale-100">
                  <ZoomIn size={16} className="text-[#E8A017]" />
                  <span>انقر لتكبير الصورة</span>
                </div>
              </div>

              {/* Floating Prev & Next Arrows on Desktop */}
              <button
                onClick={handlePrevSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/60 hover:bg-accent text-white border border-white/20 shadow-2xl backdrop-blur-xl transition-all hover:scale-110 z-30"
                aria-label="القسم السابق"
              >
                <ArrowRight size={22} />
              </button>

              <button
                onClick={handleNextSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/60 hover:bg-accent text-white border border-white/20 shadow-2xl backdrop-blur-xl transition-all hover:scale-110 z-30"
                aria-label="القسم التالي"
              >
                <ArrowLeft size={22} />
              </button>

              {/* =================================================================== */}
              {/* شريط المعاينة المصغرة الفاخر (Luxury Thumbnail Dock Strip) */}
              {/* =================================================================== */}
              <div className="relative z-30 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl p-3 sm:p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                  {showcaseSlides.map((slide, idx) => {
                    const isCurrent = idx === currentSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`group relative overflow-hidden rounded-xl text-right transition-all duration-300 p-2 flex items-center gap-2.5 ${
                          isCurrent
                            ? "bg-gradient-to-r from-amber-500/25 to-accent/25 border-2 border-[#E8A017] shadow-[0_0_20px_rgba(232,160,23,0.35)] scale-[1.02]"
                            : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        {/* Mini Thumbnail */}
                        <div className="h-11 w-11 rounded-lg overflow-hidden shrink-0 relative border border-white/15">
                          <img
                            src={assetPath(slide.image)}
                            alt={slide.shortLabel}
                            className="h-full w-full object-cover object-center"
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-amber-500/20" />
                          )}
                        </div>

                        {/* Text Details */}
                        <div className="overflow-hidden min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[10px] font-mono font-bold ${
                                isCurrent ? "text-[#E8A017]" : "text-slate-400"
                              }`}
                            >
                              {slide.number}
                            </span>
                            {isCurrent && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A017] animate-pulse" />
                            )}
                          </div>
                          <p
                            className={`text-xs font-extrabold truncate ${
                              isCurrent ? "text-white" : "text-slate-300 group-hover:text-white"
                            }`}
                          >
                            {slide.shortLabel}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* شبكة المعرض الكاملة المنظمة (Uniform Symmetrical Gallery Catalog) */}
        {/* ========================================================================= */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8A017] mb-2 uppercase tracking-wider">
              <Layers size={14} />
              <span>كتالوج المشاريع الميدانية</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              استكشف كافة الأعمال المنفذة
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            جميع الصور من أرض الواقع لمشاريع تم تسليمها في مكة المكرمة والمدينة المنورة بمقاسات موحدة وتفاصيل هندسية دقيقة.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 sm:gap-3">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-accent to-accent-strong text-white shadow-lg shadow-accent/25 scale-[1.02] border border-white/20"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* شبكة الصور الموحدة بنسبة 100% (Uniform Grid - Identical Size For All Cards) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => handleOpenProjectLightbox(project)}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900/90 border border-white/10 hover:border-amber-500/50 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
              >
                {/* Uniform Image Container (كل الصور بنفس الارتفاع والمقاس تماماً) */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
                  <img
                    src={assetPath(project.image)}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Deep Gradient Overlays for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/20 transition-opacity duration-300 group-hover:via-slate-950/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-bold text-[#FCE39E] shadow-sm">
                      <Sparkles size={12} className="text-[#E8A017]" />
                      {project.categoryBadge}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-medium text-slate-300 shadow-sm">
                      {project.location}
                    </span>
                  </div>

                  {/* Center Zoom Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                    <div className="flex h-13 w-13 items-center justify-center rounded-full bg-accent/90 text-white shadow-2xl backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn size={22} />
                    </div>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 right-0 left-0 p-5 z-10">
                    <span className="text-[11px] font-bold text-[#E8A017] tracking-wider uppercase mb-1 block">
                      {project.categoryLabel}
                    </span>
                    <h4 className="text-base font-extrabold text-white leading-snug drop-shadow-md line-clamp-2">
                      {project.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-300">
                      <span className="inline-flex items-center gap-1.5 text-slate-300 group-hover:text-[#FCE39E] transition-colors">
                        <Eye size={14} />
                        معاينة وتكبير الصورة
                      </span>
                      <span className="text-slate-400 group-hover:text-white transition-colors">
                        مكة والمدينة
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* قسم الدعوة للتواصل (Call to Action) في نهاية المعرض */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-24 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0C1525] to-slate-900 border border-amber-500/25 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#E8A017]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              هل ترغب في تنفيذ مشروعك بأعلى درجات الفخامة والإتقان؟
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              فريقنا جاهز للمعاينة الميدانية ورفع المقاسات وتقديم أفضل عروض الأسعار والتصاميم ثلاثية الأبعاد في مكة المكرمة والمدينة المنورة.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-7 py-3.5 text-sm font-extrabold shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle size={18} />
                <span>طلب معاينة عبر واتساب</span>
              </a>

              <a
                href={contactLinks.phone}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 px-7 py-3.5 text-sm font-extrabold transition-all hover:scale-[1.02]"
              >
                <PhoneCall size={18} className="text-[#E8A017]" />
                <span>اتصال مباشر: {client.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* عارض الصور المكبّر (Lightbox Modal) */}
      {/* ========================================================================= */}
      <Dialog open={lightboxProject !== null} onOpenChange={handleCloseLightbox}>
        <DialogContent className="max-w-4xl sm:max-w-5xl w-full p-0 bg-slate-950/95 border border-white/15 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden" dir="rtl">
          {lightboxProject && (
            <div className="relative flex flex-col">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-accent/20 text-accent-light border border-accent/30 px-3 py-1 text-xs font-bold">
                    {lightboxProject.badge}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-white truncate max-w-[200px] sm:max-w-md">
                    {lightboxProject.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseLightbox}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-red-500/80 transition-colors"
                    aria-label="إغلاق المعاينة"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative flex items-center justify-center bg-black/70 min-h-[300px] sm:min-h-[460px] max-h-[75vh] p-2">
                <img
                  src={assetPath(lightboxProject.image)}
                  alt={lightboxProject.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Footer Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-slate-900/80">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span>الموقع: {lightboxProject.location}</span>
                  <span>•</span>
                  <span>التصنيف: {lightboxProject.categoryLabel}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    to={lightboxProject.route}
                    onClick={handleCloseLightbox}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white px-4 py-2 text-xs font-bold transition-all"
                  >
                    <span>تفاصيل قسم {lightboxProject.badge}</span>
                    <ChevronLeft size={14} />
                  </Link>

                  <a
                    href={`${contactLinks.whatsapp}?text=${encodeURIComponent(
                      `السلام عليكم، استفسار بخصوص عمل: ${lightboxProject.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-bold transition-all shadow-md"
                  >
                    <MessageCircle size={14} />
                    <span>طلب مثل هذا العمل</span>
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