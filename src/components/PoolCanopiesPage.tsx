
import { Phone, MessageCircle, MapPin, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { assetPath } from "@/lib/assetPath";

const images = [
  "/pool-canopies/1.webp",
  "/pool-canopies/2.webp",
  "/pool-canopies/3.webp",
  "/pool-canopies/4.webp",
];

const PoolCanopiesPage = () => {
  useSEO({
    title: "مظلات مسابح بالرياض | تغطية مسابح بالرياض | ربوع البلاد",
    description:
      "مؤسسة ربوع البلاد تقدم خدمات تصميم وتركيب مظلات وتغطية مسابح بالرياض، بتصاميم عملية وأنيقة وحلول مناسبة للمنازل والفلل والاستراحات والمنشآت.",
    keywords:
      "مظلات مسابح بالرياض, تغطية مسابح بالرياض, مظلات مسابح, تغطية المسابح, تركيب مظلات مسابح بالرياض, مظلات للفلل بالرياض, مظلات استراحات بالرياض",
    image: "https://rubou-albilad.com/pool-canopies/1.webp",
    url: "https://rubou-albilad.com/pool-canopies-riyadh",
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-gray-900"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        <div className="relative h-[65vh] min-h-[480px] max-h-[760px]">
          <img
            src={assetPath(images[0])}
            alt="مظلات مسابح بالرياض - ربوع البلاد"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
            <div className="max-w-4xl text-white">
              <p className="mb-4 text-lg font-semibold text-[#d1a347] sm:text-xl">
                ربوع البلاد للمظلات والسواتر
              </p>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                مظلات وتغطية مسابح بالرياض
              </h1>

              <p className="mx-auto max-w-3xl text-lg leading-8 text-white/95 sm:text-xl">
                حلول متخصصة لتغطية المسابح وحمايتها من أشعة الشمس والعوامل
                الجوية، بتصاميم أنيقة تناسب الفلل والاستراحات والمنازل
                والمنشآت في الرياض.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="tel:+966500000000"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d1a347] px-7 py-4 font-bold text-white transition hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  اتصل بنا
                </a>

                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-black transition hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  تواصل عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-extrabold text-[#d1a347] sm:text-4xl">
              مظلات مسابح في الرياض
            </h2>

            <p className="mx-auto max-w-4xl text-lg leading-9 text-gray-700">
              نوفر في مؤسسة ربوع البلاد حلولًا متخصصة في مظلات المسابح
              وتغطية المسابح بالرياض، مع الاهتمام بجودة التنفيذ والمظهر
              الجمالي والاستفادة العملية من المساحة المحيطة بالمسبح.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "تصاميم مناسبة للمسابح",
              "حماية من أشعة الشمس",
              "تنفيذ احترافي",
              "حلول مناسبة للفلل والاستراحات",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg"
              >
                <CheckCircle className="mx-auto mb-3 h-8 w-8 text-[#d1a347]" />

                <h3 className="font-bold text-gray-900">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-[#d1a347] sm:text-4xl">
              صور مظلات وتغطية المسابح
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              نماذج من أعمال وتصاميم مظلات المسابح
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image}
                className="group overflow-hidden rounded-2xl bg-white shadow-xl"
              >
                <img
                  src={assetPath(image)}
                  alt={`مظلات مسابح بالرياض - صورة ${index + 1}`}
                  loading="lazy"
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-[#d1a347] sm:text-4xl">
              خدمات تغطية المسابح بالرياض
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "تركيب مظلات للمسابح الخارجية",
              "تغطية مسابح المنازل والفلل",
              "مظلات مسابح للاستراحات",
              "حلول حماية من أشعة الشمس",
              "تصميم مناسب لمساحة المسبح",
              "تنفيذ وتجهيز حسب احتياج العميل",
            ].map((service) => (
              <div
                key={service}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
              >
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-[#d1a347]" />

                <span className="font-semibold leading-7">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Riyadh */}
      <section className="bg-[#111] px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <MapPin className="mx-auto mb-5 h-10 w-10 text-[#d1a347]" />

          <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl">
            مظلات مسابح بالرياض
          </h2>

          <p className="text-lg leading-9 text-white/80">
            نخدم العملاء في مدينة الرياض ونوفر حلول مظلات وتغطية المسابح
            للمنازل والفلل والاستراحات والمنشآت، مع تصميم يناسب طبيعة المكان
            واحتياج العميل.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#d1a347] px-6 py-12 text-center text-white shadow-2xl sm:px-12">
          <h2 className="mb-5 text-3xl font-extrabold sm:text-4xl">
            تحتاج مظلة أو تغطية لمسبحك؟
          </h2>

          <p className="mb-8 text-lg leading-8 text-white/90">
            تواصل مع مؤسسة ربوع البلاد للحصول على الحل المناسب لمساحة المسبح
            والموقع.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:+966500000000"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-black transition hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              اتصل بنا
            </a>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-bold text-white transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              واتساب
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PoolCanopiesPage;