import {
  Award,
  ShieldCheck,
  Zap,
  Users,
  Building2,
  Target,
  Crown,
} from "lucide-react";
import { client } from "@/config/client";

const features = [
  {
    icon: Award,
    title: "جودة معتمدة",
    description:
      "نلتزم بأعلى معايير الجودة في جميع مشاريعنا مع ضمان شامل على جميع الأعمال.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان شامل",
    description:
      "نقدم ضماناً شاملاً على جميع الخدمات والأعمال المنفذة لراحة بال عملائنا.",
  },
  {
    icon: Zap,
    title: "تنفيذ سريع",
    description:
      "نلتزم بالمواعيد المحددة ونضمن التنفيذ السريع والاحترافي للمشاريع.",
  },
  {
    icon: Users,
    title: "فريق متخصص",
    description:
      "نمتلك فريقًا من المهندسين والفنيين المتخصصين في أعمال المظلات والسواتر.",
  },
  {
    icon: Building2,
    title: "خبرة واسعة",
    description: "سنوات من الخبرة في تنفيذ المشاريع في مكة المكرمة والمدينة المنورة.",
  },
  {
    icon: Target,
    title: "دقة في التنفيذ",
    description:
      "نحرص على الدقة في القياسات والمواصفات الهندسية لضمان الثبات والأمان.",
  },
];

export default function About() {
  return (
    <section id="about" dir="rtl" className="section-padding relative overflow-hidden bg-background-light">
      <div className="section-container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="section-badge mb-5">
            <Crown size={14} className="shrink-0 text-accent" />
            <span>من نحن</span>
          </div>

          <h2 className="section-title mb-4">
            {client.shortName}
            <span className="mt-2 block text-gradient-luxury">
              في مكة المكرمة والمدينة المنورة
            </span>
          </h2>

          <p className="section-desc mx-auto">{client.description}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-extrabold text-primary sm:text-2xl">
                خبرة ومصداقية في مشاريع المظلات والسواتر
              </h3>
              <p className="text-sm leading-8 text-secondary sm:text-base">
                نحن مظلات وسواتر مكة والمدينة مظلات سيارات متخصص في تصميم وتنفيذ المظلات والسواتر والبرجولات والهناجر في مكة المكرمة والمدينة المنورة. نقدم حلولًا متكاملة من التخطيط حتى التسليم، مع التركيز على الجودة واللمسات الفنية التي تجمع بين المتانة والجمال.
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-bold text-accent-dark">
                لماذا تختارنا؟
              </h4>
              <ul className="space-y-2.5">
                {[
                  "تنفيذ سريع واحترافي",
                  "مواد عالية الجودة",
                  "التزام بالمواعيد",
                  "دعم فني بعد التسليم",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-secondary sm:text-base"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group card-new p-5">
                  <div className="icon-new mb-4">
                    <Icon size={22} className="shrink-0" />
                  </div>
                  <h4 className="mb-2 text-base font-extrabold text-primary">
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-7 text-secondary">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
