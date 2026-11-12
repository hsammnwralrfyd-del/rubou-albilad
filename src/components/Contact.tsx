
import {
  MapPin,
  Crown,
  Clock,
  PhoneCall,
  ArrowUpLeft,
  MessageCircle,
} from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

const WhatsAppIcon = ({
  className = "h-6 w-6",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.452" />
  </svg>
);

export const Contact = () => {
  const { client, contactLinks } = useSiteData();

  const contactCards = [
    {
      title: "اتصل بنا",
      value: client.phoneDisplay,
      href: contactLinks.phone,
      description: "تواصل مباشر للإجابة عن استفساراتكم",
      icon: PhoneCall,
      type: "phone",
    },
    {
      title: "واتساب",
      value: "تواصل فوري",
      href: contactLinks.whatsapp,
      description: "أرسل استفسارك وتفاصيل مشروعك",
      icon: WhatsAppIcon,
      type: "whatsapp",
    },
    {
      title: "مناطق الخدمة",
      value: "مكة والمدينة",
      href: client.mapsUrl || "#",
      description: `نخدم ${client.serviceAreas.join(" و")}`,
      icon: MapPin,
      type: "location",
    },
  ];

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative isolate overflow-hidden bg-[#F8F7F3] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#C6A66C]/15" />
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#C6A66C]/15" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#D6B77C]/10 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C6A66C]/35 bg-white px-5 py-2 text-sm font-semibold text-[#94733D] shadow-sm">
            <Crown className="h-4 w-4" />
            <span>تواصل معنا</span>
          </div>

          <h2 className="text-3xl font-bold leading-relaxed tracking-tight text-[#17283D] sm:text-4xl lg:text-5xl">
            نحن هنا لخدمتكم
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C6A66C]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66C]" />
            <span className="h-px w-12 bg-[#C6A66C]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl break-words text-base leading-8 text-[#687383] sm:text-lg">
            {client.shortName} — فريقنا جاهز للإجابة على استفساراتكم وتقديم
            الاستشارات المجانية لمشاريعكم في مكة المكرمة والمدينة المنورة.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            const isPhone = card.type === "phone";
            const isWhatsApp = card.type === "whatsapp";

            return (
              <a
                key={card.title}
                href={card.href}
                target={isPhone ? undefined : "_blank"}
                rel={isPhone ? undefined : "noopener noreferrer"}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E8E1D6] bg-white p-6 shadow-[0_8px_30px_rgba(23,40,61,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D0B783] hover:shadow-[0_20px_45px_rgba(23,40,61,0.10)] sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#B9975B] via-[#E2CEA7] to-transparent opacity-70" />

                <div className="mb-7 flex items-center justify-between gap-3">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition duration-500 group-hover:scale-105 ${
                      isWhatsApp
                        ? "bg-[#E9F7EF] text-[#20A464]"
                        : "bg-[#F3EFE6] text-[#9A7945]"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F7F3] text-[#A68A5C] transition group-hover:bg-[#17283D] group-hover:text-white">
                    <ArrowUpLeft className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#17283D]">
                  {card.title}
                </h3>

                <p
                  dir={isPhone ? "ltr" : "rtl"}
                  className="mt-3 break-words text-xl font-extrabold leading-relaxed text-[#9A7945] sm:text-2xl"
                >
                  {card.value}
                </p>

                <p className="mt-3 min-h-[48px] text-sm leading-7 text-[#7B8490]">
                  {card.description}
                </p>

                <div className="mt-6 border-t border-[#F0ECE5] pt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A7945] transition group-hover:text-[#17283D]">
                    {isWhatsApp
                      ? "ابدأ المحادثة"
                      : isPhone
                        ? "اتصل الآن"
                        : "عرض الموقع"}
                    <ArrowUpLeft className="h-4 w-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Working hours */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="relative overflow-hidden rounded-[24px] border border-[#E6DDCD] bg-white p-6 shadow-[0_8px_30px_rgba(23,40,61,0.045)] sm:p-8">
            <div className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full bg-[#D6B77C]/10 blur-2xl" />

            <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3EFE6] text-[#9A7945]">
                  <Clock className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[#17283D] sm:text-xl">
                    ساعات العمل
                  </h3>
                  <p className="mt-1 text-sm text-[#7B8490]">
                    يسعدنا استقبال استفساراتكم خلال أوقات العمل
                  </p>
                </div>
              </div>

              <div className="w-full rounded-2xl bg-[#F8F7F3] px-5 py-4 text-center sm:w-auto sm:min-w-[280px]">
                <p className="text-sm font-bold leading-7 text-[#17283D]">
                  السبت - الخميس
                </p>
                <p className="mt-1 text-sm text-[#94733D]">
                  8:00 صباحاً - 10:00 مساءً
                </p>
                <div className="mx-auto my-3 h-px w-full bg-[#E8E1D6]" />
                <p className="text-sm text-[#7B8490]">
                  الجمعة: مغلق
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
