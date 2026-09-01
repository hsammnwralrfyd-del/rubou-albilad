import {
  Award,
  ShieldCheck,
  Zap,
  Users,
  Building2,
  Target,
  Crown,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "جودة مضمونة",
    desc: "نستخدم أفضل الخامات ونعمل بأعلى معايير السلامة والجودة مع ضمان شامل على جميع الأعمال.",
    icon: Award,
  },
  {
    title: "سرعة التنفيذ",
    desc: "فريق محترف ينجز مشاريعك في الوقت المتفق عليه مع التزام تام بالمواعيد.",
    icon: Zap,
  },
  {
    title: "خبرة واسعة",
    desc: "سنوات من الخبرة في مشاريع المظلات والسواتر والبرجولات والهناجر في مكة المكرمة والمدينة المنورة.",
    icon: Building2,
  },
  {
    title: "خدمة ما بعد البيع",
    desc: "دعم متواصل وخدمة احترافية بعد التسليم لضمان رضا عملائنا الكامل.",
    icon: ShieldCheck,
  },
  {
    title: "فريق متخصص",
    desc: "نمتلك فريقًا من المهندسين والفنيين المتخصصين في أعمال المظلات والسواتر.",
    icon: Users,
  },
  {
    title: "أسعار تنافسية",
    desc: "نقدم عروضاً قوية مع جودة عالية وضمان موثوق بأفضل الأسعار في السوق.",
    icon: Target,
  },
];

export default function WhyChoose() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden bg-background">
      <div className="section-container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="section-badge mb-5">
            <Crown size={14} className="shrink-0 text-accent" />
            <span>لماذا تختارنا</span>
          </div>

          <h2 className="section-title mb-4">
            مميزات تجعلنا
            <span className="mt-2 block text-gradient-luxury">الخيار الأفضل</span>
          </h2>

          <p className="section-desc mx-auto">
            نتميز بالجودة العالية والخبرة الواسعة والالتزام التام بتقديم أفضل
            الخدمات لعملائنا في مكة المكرمة والمدينة المنورة
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group relative card-new p-5 sm:p-6">
                <div className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle2 size={14} className="shrink-0 text-accent" />
                </div>

                <div className="icon-new mb-4">
                  <Icon size={22} className="shrink-0" />
                </div>

                <h4 className="mb-2 text-base font-extrabold text-primary sm:text-lg">
                  {feature.title}
                </h4>

                <p className="text-sm leading-7 text-secondary">
                  {feature.desc}
                </p>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent-dark via-accent to-accent-light opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}