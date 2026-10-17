import { MapPin, Phone, Crown, Clock, PhoneCall, MessageSquare } from "lucide-react";
import { client, contactLinks } from "@/config/client";

const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.452" />
  </svg>
);

const contactCards = [
  {
    title: "اتصل بنا",
    value: client.phoneDisplay,
    href: contactLinks.phone,
    icon: PhoneCall,
    description: "خدمة عملاء سريعة على مدار أوقات العمل",
  },
  {
    title: "واتساب",
    value: "تواصل فوري",
    href: contactLinks.whatsapp,
    icon: WhatsAppIcon,
    description: "رد سريع على استفساراتكم",
  },
  {
    title: "الموقع",
    value: "مكة والمدينة",
    href: client.mapsUrl || "#",
    icon: MapPin,
    description: `نخدم ${client.serviceAreas.join(" و")}`,
  },
];

export const Contact = () => {
  return (
    <section id="contact" dir="rtl" className="section-padding relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-pattern-dots opacity-30" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="section-badge mb-5">
            <Crown size={14} className="shrink-0 text-bronze" />
            <span>تواصل معنا</span>
          </div>

          <h2 className="section-title mb-4">
            نحن هنا لخدمتكم
            <span className="mt-2 block text-gradient-luxury">على مدار أوقات العمل</span>
          </h2>

          <p className="section-desc mx-auto">
            {client.shortName} — فريقنا جاهز للإجابة على استفساراتكم وتقديم
            الاستشارات المجانية لمشاريعكم في مكة المكرمة والمدينة المنورة
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("tel:") ? undefined : "_blank"}
                rel={
                  card.href.startsWith("tel:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group premium-card block p-5 sm:p-6"
              >
                <div className="icon-new mb-4">
                  {card.title === "واتساب" ? (
                    <WhatsAppIcon className="h-5 w-5" />
                  ) : (
                    <Icon size={22} className="shrink-0" />
                  )}
                </div>

                <h3 className="mb-1 text-base font-extrabold text-charcoal sm:text-lg">
                  {card.title}
                </h3>

                <p className="mb-2 text-lg font-extrabold text-gradient-luxury dir-ltr sm:text-xl">
                  {card.value}
                </p>

                <p className="text-sm text-charcoal-soft/65">{card.description}</p>
              </a>
            );
          })}
        </div>

        <div className="mx-auto max-w-xl">
          <div className="premium-card p-6 text-center sm:p-8">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="icon-new !h-11 !w-11">
                <Clock size={20} className="shrink-0" />
              </div>
              <h3 className="text-lg font-extrabold text-charcoal sm:text-xl">
                ساعات العمل
              </h3>
            </div>
            <p className="text-base text-charcoal-soft/80">
              السبت - الخميس: 8:00 صباحاً - 10:00 مساءً
            </p>
            <p className="mt-1 text-sm text-charcoal-soft/60">الجمعة: مغلق</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
