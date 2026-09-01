import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { client, contactLinks } from "@/config/client";

export const Footer = () => {
  return (
    <footer dir="rtl" className="bg-primary text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary-dark">
                <span className="text-xl font-extrabold">ح</span>
              </div>
              <h3 className="text-xl font-extrabold text-accent">
                {client.shortName}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              {client.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-accent">روابط سريعة</h4>
            <ul className="space-y-2">
              {client.navLinks.slice(0, 7).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-accent">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-accent" />
                <div>
                  <a
                    href={contactLinks.phone}
                    className="text-sm text-white/80 transition-colors hover:text-accent dir-ltr"
                  >
                    {client.phoneDisplay}
                  </a>
                  <p className="text-xs text-white/60">السبت - الخميس</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-accent" />
                <div>
                  <p className="text-sm text-white/80">مكة المكرمة والمدينة المنورة</p>
                  <p className="text-xs text-white/60">المملكة العربية السعودية</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-accent">المناطق التي نخدمها</h4>
            <ul className="space-y-2">
              {client.serviceAreas.map((area) => (
                <li key={area}>
                  <span className="text-sm text-white/80">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} {client.companyName}. جميع الحقوق محفوظة.
            </p>
            <p className="text-xs text-white/70">
              تصميم وتطوير{" "}
              <a
                href={contactLinks.designerWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent underline-offset-2 transition-colors hover:text-accent-light hover:underline"
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
