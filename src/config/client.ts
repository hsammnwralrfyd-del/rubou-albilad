/** بيانات مظلات وسواتر مكة والمدينة مظلات سيارات — مكة والمدينة */
export const client = {
  companyName: "مظلات وسواتر مكة والمدينة مظلات سيارات",
  shortName: "مظلات وسواتر مكة والمدينة",
  ownerName: "م/حسام الرفيد",
  designerName: "م/حسام الرفيد",
  designerWhatsapp: "967779098659",
  tagline: "مظلات · سواتر · برجولات · هناجر",
  city: "مكة المكرمة",
  phone: "548561357",
  phoneIntl: "966548561357",
  phoneDisplay: "054 856 1357",
  siteUrl: "https://canopies-makkah.com",
  instagram: "",
  mapsUrl: "https://maps.google.com/?q=مكة+المكرمة",
  accentColor: "#E8A017",
  primaryColor: "#0F5C4C",
  ivoryColor: "#F5F8F6",
  bronzeDark: "#C48910",
  geo: {
    region: "SA-14",
    latitude: "21.4225",
    longitude: "39.8262",
  },
  description:
    "مظلات وسواتر مكة والمدينة مظلات سيارات متخصص في تصميم وتنفيذ وتركيب المظلات والسواتر والبرجولات والهناجر والساندوتش بانل والشبوك في مكة المكرمة والمدينة المنورة بجودة عالية وأسعار تنافسية.",
  hero: {
    title: "مظلات وسواتر مكة والمدينة مظلات سيارات",
    subtitle: "في مكة المكرمة والمدينة المنورة",
    paragraph1:
      "نصمّم وننفّذ ونركّب المظلات والسواتر والبرجولات والهناجر بأحدث المواصفات، مع ضمان الجودة والالتزام بالمواعيد في مكة المكرمة والمدينة المنورة.",
    paragraph2:
      "جودة عالية · تنفيذ احترافي · أسعار تنافسية · خدمة سريعة وضمان شامل على جميع الأعمال.",
  },
  services: [
    { title: "المظلات", description: "مظلات السيارات والحدائق والمدارس" },
    { title: "السواتر", description: "سواتر الخصوصية للمنازل والفلل بتصاميم متنوعة" },
    { title: "البرجولات", description: "برجولات وجلسات خارجية بتصاميم عصرية" },
    { title: "الهناجر", description: "هناجر ومستودعات ساندوتش بانل بعزل حراري" },
    { title: "الشبوك", description: "تركيب الشبوك وتسوير المباني والمزارع" },
    { title: "ساندوتش بانل", description: "ألواح ساندوتش بانل للعزل الحراري والصوتي" },
    { title: "مظلات السيارات", description: "مظلات سيارات بتصاميم هرمية ومقوسة" },
    { title: "مظلات الحدائق", description: "مظلات للحدائق والمساحات الخارجية" },
  ],
  navLinks: [
    { label: "الرئيسية", to: "/" },
    { label: "المظلات", to: "/canopies" },
    { label: "السواتر", to: "/shutters" },
    { label: "البرجولات", to: "/pergolas" },
    { label: "الهناجر", to: "/warehouses" },
    { label: "ساندوتش بانل", to: "/sandwich-panel" },
    { label: "الشبوك", to: "/fencing" },
    { label: "مظلات السيارات", to: "/car-canopies" },
    { label: "مظلات الحدائق", to: "/garden-canopies" },
  ],
  projects: [
    {
      title: "مظلات مكة المكرمة",
      description: "تنفيذ مظلات متنوعة في مكة المكرمة بجودة عالية وتصاميم عصرية.",
      link: "/canopies",
    },
    {
      title: "سواتر المدينة المنورة",
      description: "سواتر خصوصية بتصاميم أنيقة للمنازل والفلل.",
      link: "/shutters",
    },
    {
      title: "برجولات وجلسات",
      description: "برجولات وجلسات خارجية فاخرة للمساحات الخارجية.",
      link: "/pergolas",
    },
    {
      title: "هناجر ساندوتش بانل",
      description: "هناجر ومستودعات ساندوتش بانل بعزل حراري ممتاز.",
      link: "/warehouses",
    },
    {
      title: "مظلات سيارات",
      description: "مظلات سيارات بتصاميم هرمية ومقوسة متنوعة.",
      link: "/car-canopies",
    },
    {
      title: "الشبوك والتسوير",
      description: "تركيب الشبوك وتسوير المباني والمزارع والأراضي.",
      link: "/fencing",
    },
  ],
  socialMedia: {
    tiktok: "",
    facebook: "",
    instagram: "",
    googleMaps: "https://maps.google.com/?q=مكة+المكرمة",
  },
  serviceAreas: ["مكة المكرمة", "المدينة المنورة", "جدة", "الطائف"],
} as const;

export const contactLinks = {
  phone: `tel:+966${client.phone}`,
  whatsapp: `https://wa.me/${client.phoneIntl}?text=${encodeURIComponent("مرحباً، أرغب في الاستفسار عن خدمات مظلات وسواتر مكة والمدينة مظلات سيارات")}`,
  whatsappShort: `https://wa.me/${client.phoneIntl}`,
  designerWhatsapp: `https://wa.me/${client.designerWhatsapp}?text=${encodeURIComponent("مرحباً م/حسام الرفيد")}`,
  instagram: client.instagram,
};
