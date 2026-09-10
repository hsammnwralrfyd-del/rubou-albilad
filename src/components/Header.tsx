import {
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { contactLinks, client } from "@/config/client";
import { assetPath } from "@/lib/assetPath";

const navItems = [
  { label: "الرئيسية", hash: "#home" },
  { label: "خدماتنا", hash: "#services" },
  { label: "معرض الأعمال", hash: "#portfolio" },
  { label: "تواصل معنا", hash: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToHash = (hash: string) => {
    if (hash === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(hash);
    if (!element) return;
    const offset = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    event.preventDefault();
    setOpen(false);

    if (hash === "#home") {
      if (isHome) {
        navigate("/", { replace: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (isHome) {
      window.history.replaceState(null, "", hash);
      scrollToHash(hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  useEffect(() => {
    if (!isHome || !location.hash) return;
    const timer = setTimeout(() => scrollToHash(location.hash), 200);
    return () => clearTimeout(timer);
  }, [isHome, location.hash]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (isHome) {
      navigate("/", { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 -z-10 h-full transition-all duration-300 ${
          scrolled
            ? "border-b border-primary/10 bg-white/95 shadow-[0_4px_20px_rgba(30,58,95,0.08)] backdrop-blur-xl"
            : "bg-white/90 backdrop-blur-md"
        }`}
      />

      <div className="section-container">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group relative flex shrink-0 items-center gap-3"
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            <img
              src={assetPath("/logo.svg")}
              alt={client.shortName}
              className="h-12 w-12 transition-all duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold leading-tight text-primary">
                {client.shortName}
              </h1>
              <p className="text-xs font-semibold text-secondary-light">
                {client.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center lg:flex">
            <div className="flex items-center gap-1 rounded-xl bg-secondary/5 p-1">
              {navItems.map((item) => (
                <a
                  key={item.hash}
                  href={isHome ? item.hash : `/${item.hash}`}
                  onClick={(e) => handleNavigation(e, item.hash)}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold text-secondary transition-all hover:bg-white hover:text-primary hover:shadow-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={contactLinks.phone}
              className="flex h-11 items-center gap-2 rounded-lg border-2 border-primary/20 bg-white px-4 text-sm font-bold text-primary transition-all hover:border-primary hover:bg-primary/5"
            >
              <PhoneCall size={18} className="shrink-0" />
              <span className="hidden sm:inline">اتصال</span>
            </a>
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-accent-light via-accent to-accent-dark px-5 text-sm font-bold text-primary-dark shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <MessageCircle size={18} className="shrink-0" />
              <span className="hidden sm:inline">واتساب</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-primary/20 bg-white text-primary transition-all hover:border-primary hover:bg-primary/5 lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[72px] z-40 bg-secondary/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-[72px] z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-primary/10 bg-white shadow-2xl transition-all duration-300 lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="section-container py-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={isHome ? item.hash : `/${item.hash}`}
                onClick={(e) => handleNavigation(e, item.hash)}
                className="flex items-center justify-between rounded-lg border-2 border-primary/10 bg-secondary/5 px-5 py-4 text-base font-bold text-secondary transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
              >
                <span>{item.label}</span>
                <ArrowLeft size={20} className="text-primary" />
              </a>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={contactLinks.phone}
              className="flex h-14 items-center justify-center gap-3 rounded-lg border-2 border-primary/20 bg-white text-base font-bold text-primary transition-all hover:border-primary hover:bg-primary/5"
            >
              <PhoneCall size={20} />
              اتصل بنا
            </a>
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-accent-light via-accent to-accent-dark text-base font-bold text-primary-dark shadow-lg transition-all hover:shadow-xl"
            >
              <MessageCircle size={20} />
              تواصل عبر واتساب
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-primary/10 text-center">
            <p className="text-sm font-semibold text-secondary">
              {client.phone}
            </p>
            <p className="text-xs text-secondary-light mt-1">
              {client.serviceAreas.join(" · ")}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
