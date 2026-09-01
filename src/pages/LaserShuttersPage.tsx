import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const SchoolCanopiesPage = () => {
  const title = "مظلات مدارس بالرياض | ربوع البلاد";

  const description =
    "مظلات مدارس بالرياض من مؤسسة ربوع البلاد. تصميم وتنفيذ وتركيب مظلات المدارس والساحات والممرات ومواقف السيارات والمنشآت التعليمية في الرياض.";

  useSEO({
    title,
    description,
    keywords:
      "مظلات مدارس بالرياض, مظلات مدارس, مظلات ساحات المدارس بالرياض, مظلات ممرات المدارس, مظلات مواقف مدارس, تركيب مظلات مدارس بالرياض",
    url: "https://rubou-albilad.com/school-canopies",
    image: "https://rubou-albilad.com/school-canopies/header.webp",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "مظلات مدارس بالرياض",
      description,
      url: "https://rubou-albilad.com/school-canopies",
      areaServed: {
        "@type": "City",
        name: "الرياض",
      },
      provider: {
        "@type": "LocalBusiness",
        name: "مؤسسة ربوع البلاد",
        url: "https://rubou-albilad.com",
      },
      serviceType: "مظلات مدارس",
    },
  });

  const images = [
    "/school-canopies/1.webp",
    "/school-canopies/2.webp",
    "/school-canopies/3.webp",
    "/school-canopies/4.webp",
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-white font-amiri">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img
          src="/school-canopies/header.webp"
          alt="مظلات مدارس بالرياض"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="max-w-3xl">

            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-white/90 transition hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
              العودة للرئيسية
            </Link>

            <p className="mb-4 text-lg font-bold text-[#d1a347]">
              مؤسسة ربوع البلاد
            </p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              مظلات مدارس بالرياض
            </h1>

            <p className="mb-8 text-lg leading-9 text-white/90 sm:text-xl md:text-2xl">
              تصميم وتنفيذ وتركيب مظلات المدارس والساحات والممرات ومواقف
              السيارات في الرياض، بحلول عملية تناسب المنشآت التعليمية
              والمساحات الخارجية.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="tel:+966500000000"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d1a347] px-6 py-3 font-bold text-white transition hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                اتصل بنا
              </a>

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-gray-900 transition hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل واتساب
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4">

          <div className="mb-12 text-center">

            <h2 className="mb-5 text-3xl font-extrabold text-[#b88a2d] sm:text-4xl">
              مظلات مدارس في الرياض
            </h2>

            <p className="text-lg leading-9 text-gray-700">
              تقدم ربوع البلاد خدمات تصميم وتنفيذ وتركيب مظلات المدارس
              بالرياض، مع حلول مناسبة للساحات والممرات ومداخل المباني
              ومواقف السيارات والملاعب والمساحات الخارجية. يتم اختيار
              التصميم وفق مساحة الموقع وطبيعة المنشأة واحتياجات المشروع.
            </p>

          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {images.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={image}
                  alt={`مظلات مدارس بالرياض - صورة ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16">

        <div className="container mx-auto max-w-5xl px-4">

          <h2 className="mb-12 text-center text-3xl font-extrabold text-[#b88a2d] sm:text-4xl">
            خدمات مظلات المدارس
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "مظلات ساحات المدارس",
              "مظلات ممرات الطلاب",
              "مظلات مواقف السيارات",
              "مظلات مداخل المدارس",
              "مظلات الملاعب والساحات الخارجية",
              "تصميم وتنفيذ وتركيب المظلات",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-[#b88a2d]">
                  {item}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16">

        <div className="container mx-auto max-w-5xl px-4">

          <h2 className="mb-12 text-center text-3xl font-extrabold text-[#b88a2d] sm:text-4xl">
            مميزات مظلات المدارس
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "مناسبة للمنشآت التعليمية",
              "تغطية الساحات والممرات",
              "حلول مناسبة لمواقف السيارات",
              "تصاميم متنوعة حسب مساحة الموقع",
              "حماية من أشعة الشمس والعوامل الجوية",
              "تنفيذ مناسب للمشاريع والمنشآت",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-md"
              >
                <h3 className="text-xl font-bold text-[#b88a2d]">
                  {item}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#171717] py-16 text-center text-white">

        <div className="container mx-auto px-4">

          <h2 className="mb-5 text-3xl font-extrabold sm:text-4xl">
            هل تبحث عن مظلات مدارس بالرياض؟
          </h2>

          <p className="mb-8 text-lg text-white/80">
            تواصل مع مؤسسة ربوع البلاد لمعرفة الحل المناسب لموقعك واحتياجك.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="tel:+966500000000"
              className="inline-flex items-center gap-2 rounded-xl bg-[#d1a347] px-8 py-4 font-bold text-white transition hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              اتصل بنا
            </a>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-gray-900 transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              اطلب عرض سعر
            </a>

          </div>

        </div>
      </section>

    </main>
  );
};

export default SchoolCanopiesPage;