
import {
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { assetPath } from "@/lib/assetPath";

const navItems = [
  { label: "الرئيسية", hash: "#home" },
  { label: "خدماتنا", hash: "#services" },
  { label: "معرض الأعمال", hash: "#portfolio" },
  { label: "تواصل معنا", hash: "#contact" },
];

const Header = () => {
  const { client, contactLinks } = useSiteData();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToHash = (hash: string) => {
    if (hash === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.querySelector(hash);

    if (!element) return;

    const offset =
      element.getBoundingClientRect().top +
      window.scrollY -
      95;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
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

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
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

    const timer = window.setTimeout(() => {
      scrollToHash(location.hash);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [isHome, location.hash]);

  const handleLogoClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setOpen(false);

    if (isHome) {
      navigate("/", { replace: true });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header
        dir="rtl"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2"
            : "py-2 sm:py-3 lg:py-4"
        }`}
      >
        {/* Glass background */}
        <div
          className={`absolute inset-0 -z-10 transition-all duration-300 ${
            scrolled
              ? "border-b border-[#D6B77C]/30 bg-white/95 shadow-[0_5px_25px_rgba(20,35,56,0.08)] backdrop-blur-2xl"
              : "bg-white/85 backdrop-blur-xl"
          }`}
        />

        <div className="section-container">
          <div className="flex min-h-11 items-center justify-between gap-3 sm:min-h-12">

            {/* Logo */}
            <Link
              to="/"
              onClick={handleLogoClick}
              aria-label="العودة إلى الصفحة الرئيسية"
              className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D6B77C]/30 bg-white p-1 shadow-sm transition-all duration-300 group-hover:border-[#C6A66C] group-hover:shadow-md sm:h-12 sm:w-12">
               <img
                 src={assetPath("/icon1/rubou-favicon.png")}
                      alt="شعار ربوع البلاد"
                     className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
              </div>

              <div className="hidden min-w-0 sm:block">
                <h1 className="truncate text-base font-extrabold leading-tight text-[#17283D] lg:text-lg">
                  {client.shortName}
                </h1>

                <p className="mt-1 truncate text-[10px] font-semibold text-[#9A8156] lg:text-xs">
                  {client.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="القائمة الرئيسية"
              className="hidden lg:block"
            >
              <div className="flex items-center gap-1 rounded-full border border-[#E9E3D8] bg-[#F8F7F3]/80 p-1.5">
                {navItems.map((item) => (
                  <a
                    key={item.hash}
                    href={isHome ? item.hash : `/${item.hash}`}
                    onClick={(event) =>
                      handleNavigation(event, item.hash)
                    }
                    className="group relative rounded-full px-5 py-2.5 text-[13px] font-bold text-[#435164] transition-all duration-300 hover:bg-white hover:text-[#17283D] hover:shadow-sm"
                  >
                    <span className="relative z-10">
                      {item.label}
                    </span>

                    <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#C6A66C] transition-all duration-300 group-hover:w-5" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Desktop contact buttons */}
            <div className="hidden shrink-0 items-center gap-2 md:flex lg:gap-3">

              <a
                href={contactLinks.phone}
                aria-label="اتصل بنا"
                className="group flex h-10 items-center gap-2 rounded-full border border-[#DCE1E7] bg-white px-3.5 text-xs font-bold text-[#17283D] transition-all duration-300 hover:border-[#C6A66C] hover:bg-[#F8F7F3] sm:h-11 sm:px-4 sm:text-sm"
              >
                <PhoneCall
                  size={17}
                  className="text-[#A98445] transition-transform group-hover:-rotate-12"
                />
                <span>اتصال</span>
              </a>

              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل عبر واتساب"
                className="group flex h-10 items-center gap-2 rounded-full bg-gradient-to-l from-[#D6B77C] to-[#B99559] px-4 text-xs font-extrabold text-[#17283D] shadow-[0_5px_15px_rgba(185,149,89,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(185,149,89,0.30)] sm:h-11 sm:px-5 sm:text-sm"
              >
                <MessageCircle
                  size={17}
                  className="transition-transform group-hover:scale-110"
                />
                <span>واتساب</span>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden sm:h-11 sm:w-11 ${
                open
                  ? "border-[#17283D] bg-[#17283D] text-[#E5CB99]"
                  : "border-[#E9E3D8] bg-white text-[#17283D] hover:border-[#C6A66C]"
              }`}
            >
              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="إغلاق القائمة"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[60px] z-40 bg-[#142338]/35 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-[60px] z-50 max-h-[calc(100dvh-60px)] overflow-y-auto rounded-b-3xl border-t border-[#D6B77C]/30 bg-[#FCFBF8] shadow-[0_20px_45px_rgba(20,35,56,0.16)] transition-all duration-300 lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav
          dir="rtl"
          aria-label="قائمة الجوال"
          className="section-container px-4 py-5 sm:px-6 sm:py-7"
        >
          {/* Mobile menu heading */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#B18D50]">
                EXPLORE OUR WEBSITE
              </p>

              <h2 className="mt-1 text-lg font-extrabold text-[#17283D]">
                تصفح الموقع
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9E3D8] bg-white text-[#A98445]">
              <ChevronDown size={19} />
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.hash}
                href={isHome ? item.hash : `/${item.hash}`}
                tabIndex={open ? 0 : -1}
                onClick={(event) =>
                  handleNavigation(event, item.hash)
                }
                className="group flex items-center justify-between rounded-2xl border border-[#EAE5DC] bg-white px-4 py-4 transition-all duration-300 hover:border-[#C6A66C]/60 hover:bg-[#F8F6F0] sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F6F2E9] text-xs font-extrabold text-[#A98445] transition-all group-hover:bg-[#17283D] group-hover:text-[#E5CB99]">
                    0{index + 1}
                  </span>

                  <span className="text-sm font-bold text-[#26384D] sm:text-base">
                    {item.label}
                  </span>
                </div>

                <ArrowLeft
                  size={18}
                  className="shrink-0 text-[#B18D50] transition-transform duration-300 group-hover:-translate-x-1"
                />
              </a>
            ))}
          </div>

          {/* Contact actions */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={contactLinks.phone}
              tabIndex={open ? 0 : -1}
              className="flex h-13 min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE1E7] bg-white px-4 py-3 text-sm font-bold text-[#17283D] transition-all hover:border-[#C6A66C] hover:bg-[#F8F7F3]"
            >
              <PhoneCall size={18} className="text-[#A98445]" />
              اتصل بنا
            </a>

            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#D6B77C] to-[#B99559] px-4 py-3 text-sm font-extrabold text-[#17283D] shadow-md transition-all hover:shadow-lg"
            >
              <MessageCircle size={18} />
              تواصل عبر واتساب
            </a>
          </div>

          {/* Footer details */}
          <div className="mt-6 border-t border-[#E9E3D8] pt-5 text-center">
            <p className="text-sm font-extrabold text-[#17283D]">
              {client.phone}
            </p>

            <p className="mt-2 text-xs font-medium text-[#8A929D]">
              مكة المكرمة · المدينة المنورة
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-l from-[#D6B77C] to-[#A98445]" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
