import featuresBg from "@/assets/features-bg-new.jpg";
import { assetPath } from "@/lib/assetPath";

const features = [
  {
    image: "/canopies/1.webp",
    title: "جودة في التنفيذ",
    description:
      "نحرص على تنفيذ الأعمال بجودة عالية واختيار الخامات المناسبة لكل مشروع.",
  },
  {
    image: "/fencing/1.webp",
    title: "تصاميم متنوعة",
    description:
      "حلول وتصاميم متعددة تناسب المنازل والفلل والاستراحات والمنشآت.",
  },
  {
    image: "/Pergolas1/1.webp",
    title: "تنفيذ حسب الموقع",
    description:
      "ننفذ كل مشروع وفق المساحة وطبيعة الموقع والاحتياج الفعلي للعميل.",
  },
  {
    image: "/shutters/1.webp",
    title: "خامات مناسبة",
    description:
      "نوفر خيارات متعددة من الخامات المناسبة للاستخدام الخارجي والمشاريع المختلفة.",
  },
  {
    image: "/WarehousesDetail1/1.webp",
    title: "خبرة في المشاريع",
    description:
      "حلول متكاملة للمنازل والمشاريع التجارية والمنشآت والمواقع المختلفة.",
  },
  {
    image: "/pool-canopies/1.webp",
    title: "خصوصية وحماية",
    description:
      "حلول عملية للمظلات والسواتر والشبوك تساعد على توفير الحماية والخصوصية.",
  },
  {
    image: "/sandwich-warehouses/1.webp",
    title: "حلول متكاملة",
    description:
      "من المظلات والسواتر إلى الهناجر والكلادينج والشبوك والتسوير.",
  },
  {
    image: "/Gallery1/1.webp",
    title: "خدمة في الرياض",
    description:
      "نقدم خدماتنا للعملاء في الرياض مع حلول مناسبة لمختلف أنواع المشاريع.",
  },
];

export const Features = () => {
  return (
    <section
      id="features"
      dir="rtl"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: `url(${featuresBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* طبقة الخلفية */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

      {/* تأثيرات ذهبية */}
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "#d1a347" }}
      />

      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "#d1a347" }}
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* عنوان القسم */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div
              className="h-px w-16 md:w-24"
              style={{ backgroundColor: "#d1a347" }}
            />

            <span
              className="text-sm font-bold tracking-[0.15em]"
              style={{ color: "#b88a2d" }}
            >
              لماذا ربوع البلاد؟
            </span>

            <div
              className="h-px w-16 md:w-24"
              style={{ backgroundColor: "#d1a347" }}
            />
          </div>

          <h2
            className="mb-5 text-3xl font-black leading-tight md:text-5xl"
            style={{ color: "#b88a2d" }}
          >
            جودة وخبرة وحلول متكاملة
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-700 md:text-lg">
            نقدم حلولًا متخصصة في المظلات والسواتر والهناجر والبرجولات
            والكلادينج والشبوك وتسوير المباني بما يناسب احتياجات العملاء
            والمشاريع في الرياض.
          </p>
        </div>

        {/* الكروت */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-7">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group relative h-full"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* الصورة */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={assetPath(feature.image)}
                    alt={`${feature.title} - ربوع البلاد`}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* التدرج */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* الرقم */}
                  <div
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                    style={{
                      backgroundColor: "#d1a347",
                      color: "#111111",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* إطار التحويم */}
                  <div className="absolute inset-0 rounded-t-3xl border-2 border-transparent transition-all duration-500 group-hover:border-[#d1a347]/70" />
                </div>

                {/* المحتوى */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3
                    className="mb-4 text-center text-lg font-extrabold leading-8 md:text-xl"
                    style={{ color: "#b88a2d" }}
                  >
                    {feature.title}
                  </h3>

                  <div className="mb-5 flex justify-center">
                    <div
                      className="h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20"
                      style={{ backgroundColor: "#d1a347" }}
                    />
                  </div>

                  <p className="mt-auto text-center text-sm leading-7 text-gray-600 md:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* الخط السفلي */}
                <div
                  className="h-1 w-full transition-all duration-500 group-hover:h-2"
                  style={{ backgroundColor: "#d1a347" }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* أسفل القسم */}
        <div className="mt-14 text-center">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                backgroundColor: "#d1a347",
                opacity: 0.4,
              }}
            />

            <div
              className="h-2 w-2 rotate-45"
              style={{ backgroundColor: "#d1a347" }}
            />

            <div
              className="h-px flex-1"
              style={{
                backgroundColor: "#d1a347",
                opacity: 0.4,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;