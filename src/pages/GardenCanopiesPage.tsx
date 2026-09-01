import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, ArrowLeft, CheckCircle2, TreePine } from "lucide-react";
import Header from "@/components/Header";
import { contactLinks, client } from "@/config/client";
import { servicesById } from "@/config/services";

const GardenCanopiesPage = () => {
  const service = servicesById.gardenCanopies;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
          <div className="section-container">
            <div className="max-w-4xl">
              <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={20} />
                العودة للرئيسية
              </Link>

              <div className="section-badge mb-6 !bg-white/10 !border-white/20 !text-white">
                <TreePine size={14} className="shrink-0 text-accent" />
                <span>{service.badge}</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight mb-4 sm:text-5xl lg:text-6xl">
                {service.title}
                <span className="mt-2 block text-accent">{service.heroSubtitle}</span>
              </h1>

              <p className="text-lg leading-relaxed text-white/90 mb-8">{service.introDescription}</p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-bold shadow-lg hover:shadow-xl transition-all">
                  <MessageCircle size={20} />
                  تواصل عبر واتساب
                </a>
                <a href={contactLinks.phone} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white font-bold hover:bg-white/20 transition-all">
                  <Phone size={20} />
                  اتصل الآن
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="section-title mb-8">{service.benefitsTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 p-4 rounded-lg border-2 border-primary/10 bg-secondary/5">
                    <CheckCircle2 size={20} className="shrink-0 text-accent mt-1" />
                    <span className="text-base font-semibold text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-light">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="section-title mb-8">أنواع {service.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.serviceTypes.map((type) => (
                  <div key={type.title} className="p-6 rounded-xl border-2 border-primary/10 bg-white shadow-sm">
                    <h3 className="text-lg font-bold text-primary mb-2">{type.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-primary text-white">
          <div className="section-container text-center">
            <h2 className="section-title mb-4 text-white">المناطق التي نخدمها</h2>
            <p className="text-xl text-white/90 mb-8">{service.areasText}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {client.serviceAreas.map((area) => (
                <span key={area} className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold">{area}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GardenCanopiesPage;