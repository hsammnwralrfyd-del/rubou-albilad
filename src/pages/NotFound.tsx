import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-ivory text-charcoal">
      <Header />
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <p className="mb-2 text-6xl font-extrabold text-gradient-luxury">404</p>
          <h1 className="mb-3 text-xl font-extrabold text-charcoal sm:text-2xl">
            الصفحة غير موجودة
          </h1>
          <p className="mb-8 text-sm text-charcoal-soft/70 sm:text-base">
            عذراً، لم نتمكن من العثور على الصفحة المطلوبة.
          </p>
          <Link to="/" className="btn-luxury inline-flex">
            <Home size={18} className="shrink-0" />
            العودة للرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
