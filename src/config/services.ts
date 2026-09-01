import type { LucideIcon } from "lucide-react";
import {
  Sun,
  Shield,
  Armchair,
  Warehouse,
  Layers,
  Fence,
  Car,
  TreePine,
} from "lucide-react";

export type ServiceSeoKey =
  | "canopies"
  | "shutters"
  | "pergolas"
  | "warehouses"
  | "sandwichPanel"
  | "fencing"
  | "carCanopies"
  | "gardenCanopies";

export interface ServiceDefinition {
  id: ServiceSeoKey;
  slug: string;
  route: string;
  folder: string;
  title: string;
  shortTitle: string;
  badge: string;
  heroSubtitle: string;
  introTitle: string;
  introDescription: string;
  galleryTitle: string;
  galleryDescription: string;
  benefitsTitle: string;
  hasHeaderImage: boolean;
  galleryImageCount: number;
  cardImage: string;
  icon: LucideIcon;
  features: Array<{ title: string; description: string }>;
  benefits: string[];
  serviceTypes: Array<{ title: string; description: string }>;
  contentSections: Array<{ title: string; description: string; imageIndex: number }>;
  areasText: string;
}

/** Hero uses header.webp when available; gallery uses numbered images only. */
export function getServiceHeroPath(service: ServiceDefinition): string {
  if (service.hasHeaderImage) {
    return `/${service.folder}/header.webp`;
  }
  return `/${service.folder}/1.webp`;
}

export function getServiceGalleryPaths(service: ServiceDefinition): string[] {
  return Array.from(
    { length: service.galleryImageCount },
    (_, index) => `/${service.folder}/${index + 1}.webp`
  );
}

const defaultFeatures = [
  {
    title: "خبرة واسعة",
    description: "سنوات من الخبرة في تنفيذ المشاريع بجودة عالية في مكة والمدينة",
  },
  {
    title: "جودة مضمونة",
    description: "استخدام مواد عالية الجودة مناسبة لمناخ المملكة",
  },
  {
    title: "أسعار تنافسية",
    description: "أفضل الأسعار مع ضمان الجودة والتنفيذ الاحترافي",
  },
  {
    title: "خدمة سريعة",
    description: "فريق عمل محترف يلتزم بمواعيد التسليم المتفق عليها",
  },
];

export const servicesList: ServiceDefinition[] = [
  {
    id: "canopies",
    slug: "canopies",
    route: "/canopies",
    folder: "canopies",
    title: "المظلات",
    shortTitle: "المظلات",
    badge: "مقاول مظلات",
    heroSubtitle: "حماية شاملة من الشمس",
    introTitle: "المظلات في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تنفيذ مظلات متنوعة بجودة عالية وأسعار منافسة في مكة المكرمة والمدينة المنورة. تصاميم عصرية وهياكل متينة توفر حماية فعالة من الشمس والأمطار.",
    galleryTitle: "معرض أعمال المظلات",
    galleryDescription: "نماذج من مشاريع المظلات المنفذة بجودة عالية",
    benefitsTitle: "مميزات المظلات",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/canopies/1.webp",
    icon: Sun,
    features: defaultFeatures,
    benefits: [
      "حماية من أشعة الشمس القوية",
      "مقاومة للعوامل الجوية والأمطار",
      "تصاميم عصرية فاخرة",
      "هياكل حديدية متينة",
      "سهولة الصيانة والتنظيف",
      "ضمان شامل على جميع الأعمال",
    ],
    serviceTypes: [
      { title: "مظلات قماش", description: "مظلات بقماش PVC عالي الجودة مقاوم للعوامل الجوية" },
      { title: "مظلات بولي كربونيت", description: "ألواح شفافة توفر حماية ممتازة مع إضاءة طبيعية" },
      { title: "مظلات حديدية", description: "هياكل حديدية متينة تدوم طويلاً" },
      { title: "مظلات للمساحات المختلفة", description: "حلول مخصصة لمساحات متنوعة" },
    ],
    contentSections: [
      { title: "مظلات للمواقف", description: "تنفيذ مظلات لمواقف السيارات بتصاميم عصرية تجمع بين الجمال والمتانة.", imageIndex: 0 },
      { title: "مظلات للفلل", description: "حلول أنيقة للفلل والمنازل توفر الظل والحماية مع مظهر خارجي فاخر.", imageIndex: 1 },
      { title: "مظلات مودرن", description: "تصميمات عصرية بمواد خفيفة وأقمشة مقاومة للأشعة فوق البنفسجية.", imageIndex: 2 },
      { title: "تنفيذ احترافي", description: "فريق متخصص في القياس والتصميم والتركيب وفق المواصفات الهندسية.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "shutters",
    slug: "shutters",
    route: "/shutters",
    folder: "shutters",
    title: "السواتر",
    shortTitle: "السواتر",
    badge: "مقاول سواتر",
    heroSubtitle: "خصوصية وحماية",
    introTitle: "السواتر في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تركيب سواتر خصوصية بتصاميم متنوعة توفر الحماية والخصوصية للمنازل والفلل والمنشآت في مكة المكرمة والمدينة المنورة.",
    galleryTitle: "معرض أعمال السواتر",
    galleryDescription: "نماذج من مشاريع السواتر المختلفة",
    benefitsTitle: "مميزات السواتر",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/shutters/1.webp",
    icon: Shield,
    features: defaultFeatures,
    benefits: [
      "خصوصية كاملة",
      "تصاميم عصرية متنوعة",
      "حماية وعزل بصري",
      "خامات مقاومة للصدأ",
      "تنفيذ حسب المساحة",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "سواتر حديد", description: "سواتر حديدية متينة" },
      { title: "سواتر شينكو", description: "سواتر بألواح الشينكو" },
      { title: "سواتر خشبية", description: "سواتر خشبية للفلل" },
      { title: "سواتر ليزر", description: "تصاميم ليزر عصرية" },
    ],
    contentSections: [
      { title: "سواتر للفلل", description: "سواتر خصوصية للفلل والقصور.", imageIndex: 0 },
      { title: "سواتر للمنازل", description: "حلول للمنازل والاستراحات.", imageIndex: 1 },
      { title: "سواتر للأسطح", description: "تغطية للأسطح والمداخل.", imageIndex: 2 },
      { title: "تصميم مخصص", description: "تنفيذ حسب مساحة وموقع العميل.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "pergolas",
    slug: "pergolas",
    route: "/pergolas",
    folder: "pergolas",
    title: "البرجولات والجلسات",
    shortTitle: "البرجولات",
    badge: "مقاول برجولات",
    heroSubtitle: "جمال وظل للمساحات الخارجية",
    introTitle: "البرجولات والجلسات في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تنفيذ جلسات خارجية وبرجولات خشبية وحديدية بتصاميم عصرية تناسب الحدائق والاستراحات والفلل في مكة المكرمة والمدينة المنورة.",
    galleryTitle: "معرض أعمال البرجولات",
    galleryDescription: "نماذج من مشاريع البرجولات والجلسات الخارجية",
    benefitsTitle: "مميزات البرجولات",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/pergolas/1.webp",
    icon: Armchair,
    features: defaultFeatures,
    benefits: [
      "تصاميم عصرية أنيقة",
      "خشب طبيعي وحديد متين",
      "ظل مريح للجلسات",
      "تعزيز قيمة المكان",
      "تنفيذ حسب المساحة",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "برجولات خشبية", description: "خشب طبيعي بجودة عالية" },
      { title: "برجولات حديدية", description: "هياكل حديدية بتصاميم عصرية" },
      { title: "جلسات خارجية", description: "جلسات للحدائق والاستراحات" },
      { title: "تصميم مخصص", description: "حسب ذوق العميل ومساحة المكان" },
    ],
    contentSections: [
      { title: "برجولات للفلل", description: "برجولات فاخرة للفلل والقصور.", imageIndex: 0 },
      { title: "جلسات للاستراحات", description: "جلسات خارجية مريحة للاستراحات.", imageIndex: 1 },
      { title: "برجولات للحدائق", description: "حلول ظل للحدائق والمساحات الخضراء.", imageIndex: 2 },
      { title: "تشطيبات فاخرة", description: "تفاصيل دقيقة بلمسات فنية راقية.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "warehouses",
    slug: "warehouses",
    route: "/warehouses",
    folder: "warehouses",
    title: "الهناجر والمستودعات",
    shortTitle: "الهناجر",
    badge: "مقاول هناجر",
    heroSubtitle: "مساحات واسعة محمية",
    introTitle: "الهناجر والمستودعات في مكة المكرمة والمدينة المنورة",
    introDescription:
      "بناء هناجر ومستودعات بمساحات مختلفة مع عزل حراري وتنفيذ احترافي للمشاريع الصناعية والتجارية والزراعية في مكة المكرمة والمدينة المنورة.",
    galleryTitle: "معرض أعمال الهناجر والمستودعات",
    galleryDescription: "نماذج من مشاريع الهناجر والمستودعات",
    benefitsTitle: "مميزات الهناجر والمستودعات",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/warehouses/1.webp",
    icon: Warehouse,
    features: defaultFeatures,
    benefits: [
      "عزل حراري وصوتي ممتاز",
      "بناء سريع واقتصادي",
      "مساحات مختلفة",
      "هياكل حديدية متينة",
      "مناسبة للمشاريع الصناعية",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "هناجر صناعية", description: "هناجر للمصانع والورش" },
      { title: "مستودعات تجارية", description: "مستودعات للتخزين والتوزيع" },
      { title: "هناجر زراعية", description: "حلول للمزارع والمشاريع الزراعية" },
      { title: "تصميم هندسي", description: "تصميم حسب متطلبات المشروع" },
    ],
    contentSections: [
      { title: "هناجر صناعية", description: "هناجر للمصانع والورش بمواصفات عالية.", imageIndex: 0 },
      { title: "مستودعات تجارية", description: "مستودعات للتخزين والتوزيع.", imageIndex: 1 },
      { title: "هناجر زراعية", description: "حلول للمزارع والمشاريع الزراعية.", imageIndex: 2 },
      { title: "تنفيذ شامل", description: "من التصميم حتى التسليم النهائي.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "sandwichPanel",
    slug: "sandwich-panel",
    route: "/sandwich-panel",
    folder: "sandwich-panel",
    title: "ساندوتش بانل",
    shortTitle: "ساندوتش بانل",
    badge: "مقاول ساندوتش بانل",
    heroSubtitle: "عزل حراري ممتاز",
    introTitle: "ساندوتش بانل في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تنفيذ ألواح ساندوتش بانل للعزل الحراري والصوتي في المباني والهناجر والمستودعات في مكة المكرمة والمدينة المنورة بأعلى معايير الجودة.",
    galleryTitle: "معرض أعمال ساندوتش بانل",
    galleryDescription: "نماذج من مشاريع ساندوتش بانل",
    benefitsTitle: "مميزات ساندوتش بانل",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/sandwich-panel/1.webp",
    icon: Layers,
    features: defaultFeatures,
    benefits: [
      "عزل حراري وصوتي ممتاز",
      "خفيف الوزن وسهل التركيب",
      "مقاومة للعوامل الجوية",
      "عمر افتراضي طويل",
      "توفير الطاقة",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "ألواح ساندوتش بانل", description: "ألواح عازلة للحرارة والصوت" },
      { title: "أسقف ساندوتش بانل", description: "تغطية الأسقف بألواح عازلة" },
      { title: "جدران ساندوتش بانل", description: "بناء الجدران العازلة" },
      { title: "تصميم مخصص", description: "حسب متطلبات المشروع" },
    ],
    contentSections: [
      { title: "أسقف عازلة", description: "تغطية الأسقف بألواح ساندوتش بانل عازلة.", imageIndex: 0 },
      { title: "جدران عازلة", description: "بناء الجدران بألواح ساندوتش بانل.", imageIndex: 1 },
      { title: "هناجر عازلة", description: "هناجر بساندوتش بانل للعزل الحراري.", imageIndex: 2 },
      { title: "تنفيذ احترافي", description: "تركيب دقيق وفق المواصفات.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "fencing",
    slug: "fencing",
    route: "/fencing",
    folder: "fencing",
    title: "الشبوك والتسوير",
    shortTitle: "الشبوك",
    badge: "مقاول شبوك",
    heroSubtitle: "حماية أمنية احترافية",
    introTitle: "الشبوك والتسوير في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تنفيذ شبوك وتسوير للمباني والأراضي والمزارع ومواقع المشاريع في مكة المكرمة والمدينة المنورة بأعلى معايير الجودة.",
    galleryTitle: "معرض أعمال الشبوك والتسوير",
    galleryDescription: "نماذج من مشاريع الشبوك وتسوير المباني",
    benefitsTitle: "مميزات الشبوك والتسوير",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/fencing/1.webp",
    icon: Fence,
    features: defaultFeatures,
    benefits: [
      "حماية أمنية للمواقع",
      "شبوك بأشكال متنوعة",
      "تسوير احترافي للأراضي",
      "مواد مقاومة للصدأ",
      "تنفيذ حسب الموقع",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "شبوك حديدية", description: "شبوك حديدية متينة" },
      { title: "تسوير المباني", description: "تسوير للفلل والمنشآت" },
      { title: "شبوك للمصانع", description: "حلول للمواقع الصناعية" },
      { title: "تصميم مخصص", description: "حسب مساحة وطبيعة الموقع" },
    ],
    contentSections: [
      { title: "شبوك حديدية فاخرة", description: "شبوك بتصاميم عصرية وجودة عالية.", imageIndex: 0 },
      { title: "تسوير المباني", description: "تسوير أنيق للفلل والمنازل.", imageIndex: 1 },
      { title: "شبوك للمزارع", description: "تسوير للمزارع والأراضي الزراعية.", imageIndex: 2 },
      { title: "شبوك للمصانع", description: "حلول أمنية للمواقع الصناعية.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "carCanopies",
    slug: "car-canopies",
    route: "/car-canopies",
    folder: "car-canopies",
    title: "مظلات السيارات",
    shortTitle: "مظلات سيارات",
    badge: "مقاول مظلات سيارات",
    heroSubtitle: "حماية لسيارتك",
    introTitle: "مظلات السيارات في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تنفيذ مظلات سيارات بتصاميم متنوعة في مكة المكرمة والمدينة المنورة. تصاميم هرمية ومقوسة توفر حماية فعالة من الشمس والأمطار.",
    galleryTitle: "معرض أعمال مظلات السيارات",
    galleryDescription: "نماذج من مشاريع مظلات السيارات",
    benefitsTitle: "مميزات مظلات السيارات",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/car-canopies/1.webp",
    icon: Car,
    features: defaultFeatures,
    benefits: [
      "حماية من أشعة الشمس",
      "مقاومة للعوامل الجوية",
      "تصاميم عصرية متنوعة",
      "هياكل حديدية متينة",
      "سهولة التركيب",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "مظلات هرمية", description: "مظلات سيارات هرمية بتصاميم عصرية" },
      { title: "مظلات مقوسة", description: "مظلات سيارات مقوسة أنيقة" },
      { title: "مظلات للمواقف", description: "حلول لمواقف السيارات العامة والخاصة" },
      { title: "تصميم مخصص", description: "حسب مساحة الموقف" },
    ],
    contentSections: [
      { title: "مظلات للمنازل", description: "مظلات سيارات للمنازل والفلل.", imageIndex: 0 },
      { title: "مظلات للمواقف", description: "حلول لمواقف السيارات العامة.", imageIndex: 1 },
      { title: "مظلات للشركات", description: "مظلات لمواقف الشركات والمؤسسات.", imageIndex: 2 },
      { title: "تنفيذ احترافي", description: "تركيب دقيق وفق المواصفات.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
  {
    id: "gardenCanopies",
    slug: "garden-canopies",
    route: "/garden-canopies",
    folder: "garden-canopies",
    title: "مظلات الحدائق",
    shortTitle: "مظلات حدائق",
    badge: "مقاول مظلات حدائق",
    heroSubtitle: "ظل مريح للمساحات الخضراء",
    introTitle: "مظلات الحدائق في مكة المكرمة والمدينة المنورة",
    introDescription:
      "تركيب مظلات للحدائق والمساحات الخارجية في مكة المكرمة والمدينة المنورة بأشكال متنوعة توفر الظل وتضيف جمالًا للمكان.",
    galleryTitle: "معرض أعمال مظلات الحدائق",
    galleryDescription: "نماذج من مشاريع مظلات الحدائق",
    benefitsTitle: "مميزات مظلات الحدائق",
    hasHeaderImage: false,
    galleryImageCount: 4,
    cardImage: "/garden-canopies/1.webp",
    icon: TreePine,
    features: defaultFeatures,
    benefits: [
      "ظل مريح للحدائق",
      "تصاميم متنوعة",
      "مواد مقاومة للعوامل الجوية",
      "تعزيز المظهر الجمالي",
      "تركيب احترافي",
      "ضمان شامل على الأعمال",
    ],
    serviceTypes: [
      { title: "مظلات حدائق قماش", description: "أقمشة عالية الجودة للحدائق" },
      { title: "مظلات حدائق حديد", description: "هياكل حديدية متينة" },
      { title: "مظلات للجلسات", description: "حلول ظل للجلسات الخارجية" },
      { title: "تصميم مخصص", description: "حسب مساحة وشكل الحديقة" },
    ],
    contentSections: [
      { title: "مظلات للحدائق المنزلية", description: "حلول ظل للحدائق المنزلية.", imageIndex: 0 },
      { title: "مظلات للاستراحات", description: "مظلات للاستراحات والمساحات الترفيهية.", imageIndex: 1 },
      { title: "مظلات للمساحات العامة", description: "تغطية للمساحات الخضراء.", imageIndex: 2 },
      { title: "تنفيذ حسب الموقع", description: "قياس وتصميم حسب طبيعة المكان.", imageIndex: 3 },
    ],
    areasText: "نخدم مكة المكرمة والمدينة المنورة والمدن المجاورة",
  },
];

export const servicesById = Object.fromEntries(
  servicesList.map((service) => [service.id, service])
) as Record<ServiceSeoKey, ServiceDefinition>;
