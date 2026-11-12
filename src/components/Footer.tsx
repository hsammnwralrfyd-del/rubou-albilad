
import {
  PhoneCall,
  MapPin,
  MessageCircle,
  ArrowUpLeft,
  Crown,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { assetPath } from "@/lib/assetPath";

export const Footer = () => {
  const { client, contactLinks } = useSiteData();

  const serviceAreas = ["مكة المكرمة", "المدينة المنورة"];

  return (
    <footer
      dir="rtl"
      className="relative isolate overflow-hidden bg-[#142338] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#D6B77C]/10 sm:h-[420px] sm:w-[420px]" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#D6B77C]/[0.05] blur-3xl sm:h-[420px] sm:w-[420px]" />
      </div>

      <div className="relative z-10 h-[2px] bg-gradient-to-l from-transparent via-[#D6B77C] to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main content */}
        <div className="grid grid-cols-1 gap-9 py-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:py-14 lg:grid-cols-4 lg:gap-10 lg:py-16">

          {/* Brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-14 w-[76px] shrink-0 items-center justify-center rounded-xl border border-[#D6B77C]/30 bg-white/[0.07] p-2 sm:h-16 sm:w-[86px]">
                <img
                  src={assetPath("/icon1/rubou-favicon.png")}
                  alt={client.shortName}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-base font-extrabold leading-relaxed text-[#E4C991] sm:text-lg">
                  {client.shortName}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/50 sm:text-xs">
                  <Crown className="h-3.5 w-3.5 shrink-0 text-[#D6B77C]" />
                  <span>جودة واحترافية في التنفيذ</span>
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-xs leading-8 text-white/65 sm:text-sm">
              {client.description}
            </p>

            <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D6B77C]/20 bg-white/[0.04] px-3 py-2 text-[11px] text-[#E4C991] sm:text-xs">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>مظلات وسواتر وأعمال الحدادة</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="min-w-0">
            <h4 className="mb-5 flex items-center gap-3 text-base font-bold sm:mb-6 sm:text-lg">
              <span className="h-5 w-1 rounded-full bg-[#D6B77C]" />
              روابط سريعة
            </h4>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-1 sm:gap-y-4">
              {client.navLinks.map((link) => (
                <li key={link.to} className="min-w-0">
                  <Link
                    to={link.to}
                    className="group flex min-w-0 items-center gap-1.5 text-xs text-white/65 transition-colors hover:text-[#E4C991] sm:gap-2 sm:text-sm"
                  >
                    <ArrowUpLeft className="h-3.5 w-3.5 shrink-0 text-[#D6B77C]/60 transition-transform group-hover:-translate-x-1" />
                    <span className="break-words">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h4 className="mb-5 flex items-center gap-3 text-base font-bold sm:mb-6 sm:text-lg">
              <span className="h-5 w-1 rounded-full bg-[#D6B77C]" />
              تواصل معنا
            </h4>

            <div className="space-y-4 sm:space-y-5">

              <a
                href={contactLinks.phone}
                className="group flex min-w-0 items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D6B77C]/20 bg-white/[0.05] text-[#E4C991] transition group-hover:bg-[#D6B77C]/10 sm:h-11 sm:w-11">
                  <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p dir="ltr" className="w-fit max-w-full text-sm font-bold text-white transition group-hover:text-[#E4C991]">
                    {client.phoneDisplay}
                  </p>
                  <p className="mt-1 text-[11px] text-white/45 sm:text-xs">
                    السبت - الخميس
                  </p>
                </div>
              </a>

              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D6B77C]/20 bg-white/[0.05] text-[#E4C991] transition group-hover:bg-[#D6B77C]/10 sm:h-11 sm:w-11">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white transition group-hover:text-[#E4C991]">
                    واتساب
                  </p>
                  <p className="mt-1 text-[11px] text-white/45 sm:text-xs">
                    رد سريع على استفساراتكم
                  </p>
                </div>
              </a>

              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D6B77C]/20 bg-white/[0.05] text-[#E4C991] sm:h-11 sm:w-11">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-6 text-white sm:text-sm">
                    مكة المكرمة والمدينة المنورة
                  </p>
                  <p className="text-[11px] text-white/45 sm:text-xs">
                    المملكة العربية السعودية
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Service areas */}
          <div className="min-w-0">
            <h4 className="mb-5 flex items-center gap-3 text-base font-bold sm:mb-6 sm:text-lg">
              <span className="h-5 w-1 rounded-full bg-[#D6B77C]" />
              المناطق التي نخدمها
            </h4>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-2.5 py-3 transition hover:border-[#D6B77C]/30 hover:bg-white/[0.07] sm:gap-3 sm:px-4"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-[#D6B77C]" />
                  <span className="text-[11px] leading-5 text-white/75 sm:text-sm">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] leading-7 text-white/45 sm:text-xs">
              نعتز بخدمة عملائنا في مكة المكرمة والمدينة المنورة.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-5 sm:py-7">
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-between sm:gap-5">
            <p className="text-[10px] leading-6 text-white/45 sm:text-xs">
              © {new Date().getFullYear()} {client.companyName}. جميع الحقوق محفوظة.
            </p>

            <p className="text-[10px] text-white/55 sm:text-xs">
              تصميم وتطوير{" "}
              <a
                href={contactLinks.designerWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#E4C991] underline-offset-4 transition hover:text-white hover:underline"
              >
                {client.designerName}
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
