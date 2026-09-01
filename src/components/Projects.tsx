import { ArrowLeft, Building2, MapPin, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { client } from "@/config/client";

const galleryImages = [
  "/canopies/1.webp",
  "/shutters/1.webp",
  "/pergolas/1.webp",
  "/warehouses/1.webp",
  "/sandwich-panel/1.webp",
  "/fencing/1.webp",
];

export const Projects = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-background">
      <div className="section-container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="section-badge mb-5">
            <Building2 size={14} className="shrink-0 text-accent" />
            <span>مشاريعنا</span>
          </div>
          <h2 className="section-title mb-4">
            مشاريع مميزة
            <span className="mt-2 block text-gradient-luxury">نفخر بتنفيذها</span>
          </h2>
          <p className="section-desc mx-auto">
            نماذج من أعمالنا في المظلات والسواتر والبرجولات والهناجر في مكة المكرمة والمدينة المنورة
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {client.projects.slice(0, 6).map((project, index) => (
            <Link
              key={project.title}
              to={project.link}
              className="group card-new block min-w-0 overflow-hidden"
            >
              <div className="h-52 overflow-hidden sm:h-56">
                <img
                  src={galleryImages[index % galleryImages.length]}
                  alt={`مشروع ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                />
              </div>

              <div className="p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-dark">
                    <CheckCircle size={11} className="shrink-0" />
                    مشروع منفذ
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                    <MapPin size={11} className="shrink-0 text-accent" />
                      مكة المكرمة
                    </span>
                </div>

                <h3 className="mb-1 text-lg font-extrabold text-primary sm:text-xl">
                  {project.title}
                </h3>
                <div className="mb-3 flex items-center gap-1.5 text-xs text-secondary-light">
                  <Calendar size={12} className="shrink-0" />
                  تم التنفيذ
                </div>

                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-secondary">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 border-t border-primary/10 pt-4 text-sm font-bold text-primary transition-colors group-hover:text-accent-dark">
                  عرض التفاصيل
                  <ArrowLeft
                    size={16}
                    className="shrink-0 transition-transform group-hover:-translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#portfolio" className="btn-accent inline-flex">
            استعرض معرض الصور
            <ArrowLeft size={18} className="shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
