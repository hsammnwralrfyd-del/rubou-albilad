
import {
  Award,
  ShieldCheck,
  Zap,
  Users,
  Building2,
  Target,
  Crown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { client } from "@/config/client";

const features = [
  {
    icon: Award,
    title: "جودة معتمدة",
    description:
      "نلتزم بأعلى معايير الجودة في جميع مشاريعنا مع الاهتمام بالتنفيذ الدقيق.",
  },
  {
    icon: ShieldCheck,
    title: "جودة في التنفيذ",
    description:
      "نحرص على جودة التنفيذ في جميع الخدمات والأعمال المنفذة لراحة بال عملائنا.",
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
    description:
      "سنوات من الخبرة في تنفيذ المشاريع في مكة المكرمة والمدينة المنورة.",
  },
  {
    icon: Target,
    title: "دقة في التنفيذ",
    description:
      "نحرص على الدقة في القياسات والمواصفات الهندسية لضمان الثبات والأمان.",
  },
];

const advantages = [
  "تنفيذ سريع واحترافي",
  "مواد عالية الجودة",
  "التزام بالمواعيد",
  "دعم فني بعد التسليم",
];

export default function About() {
  return (
    <section
      id="about"
      dir="rtl"
      className="relative isolate overflow-hidden bg-[#F8F7F3] py-16 sm:py-20 lg:py-24"
    >
      {/* Background details */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-40 top-10 h-80 w-80 rounded-full border border-[#C6A66C]/10 sm:h-[460px] sm:w-[460px]" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#C6A66C]/[0.05] blur-3xl sm:h-[460px] sm:w-[460px]" />
      </div>

      <div className="section-container relative z-10">

        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16 lg:mb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C6A66C]/30 bg-white px-4 py-2 shadow-sm">
            <Crown className="h-4 w-4 text-[#B18D50]" />
            <span className="text-xs font-bold tracking-wide text-[#9A7945] sm:text-sm">
              من نحن
            </span>
          </div>

          <h2 className="mb-5 text-2xl font-extrabold leading-relaxed text-[#17283D] sm:text-3xl lg:text-4xl">
            {client.shortName}
            <span className="mt-2 block bg-gradient-to-l from-[#A98445] via-[#D6B77C] to-[#A98445] bg-clip-text text-xl text-transparent sm:text-2xl lg:text-3xl">
              في مكة المكرمة والمدينة المنورة
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-8 text-[#687586] sm:text-base sm:leading-9">
            {client.description}
          </p>

          <div className="mx-auto mt-7 h-[2px] w-20 rounded-full bg-gradient-to-l from-transparent via-[#C6A66C] to-transparent sm:w-28" />
        </div>

        {/* Introduction and features */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

          {/* About content */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-[#E9E3D8] bg-white p-5 shadow-[0_8px_35px_rgba(23,40,61,0.045)] sm:rounded-3xl sm:p-8 lg:p-9">

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EA] text-[#A98445]">
                  <Building2 className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold tracking-widest text-[#B18D50] sm:text-xs">
                    ABOUT OUR COMPANY
                  </span>
                  <h3 className="mt-1 text-lg font-extrabold text-[#17283D] sm:text-xl">
                    خبرة ومصداقية
                  </h3>
                </div>
              </div>

              <h4 className="mb-4 text-lg font-extrabold leading-relaxed text-[#17283D] sm:text-2xl">
                خبرة ومصداقية في مشاريع المظلات والسواتر
              </h4>

              <p className="text-sm leading-8 text-[#687586] sm:text-base sm:leading-9">
                نحن مظلات وسواتر مكة والمدينة مظلات سيارات متخصص في تصميم وتنفيذ المظلات والسواتر والبرجولات والهناجر في مكة المكرمة والمدينة المنورة. نقدم حلولًا متكاملة من التخطيط حتى التسليم، مع التركيز على الجودة واللمسات الفنية التي تجمع بين المتانة والجمال.
              </p>

              <div className="my-7 h-px bg-gradient-to-l from-[#C6A66C]/50 via-[#E9E3D8] to-transparent" />

              <h4 className="mb-5 flex items-center gap-2 text-base font-extrabold text-[#17283D] sm:text-lg">
                <Sparkles className="h-5 w-5 text-[#B18D50]" />
                لماذا تختارنا؟
              </h4>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {advantages.map((item) => (
                  <div
                    key={item}
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-[#EEEAE2] bg-[#FAF9F6] px-3 py-3 transition-colors hover:border-[#C6A66C]/40 sm:px-4"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B18D50]" />
                    <span className="text-xs font-semibold leading-6 text-[#435164] sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 right-0 h-1 w-24 rounded-tl-full bg-gradient-to-l from-[#D6B77C] to-transparent sm:w-32" />
            </div>
          </div>

          {/* Features grid */}
          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#B18D50] sm:text-xs">
                  OUR ADVANTAGES
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-[#17283D] sm:text-xl">
                  ما يميز أعمالنا
                </h3>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E9E3D8] bg-white text-[#B18D50] sm:flex">
                <Award className="h-5 w-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E9E3D8] bg-white p-3.5 shadow-[0_4px_18px_rgba(23,40,61,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A66C]/50 hover:shadow-[0_12px_30px_rgba(23,40,61,0.075)] sm:rounded-2xl sm:p-5 lg:p-6"
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E9E3D8] bg-[#F8F6F0] text-[#A98445] transition-all duration-300 group-hover:border-[#17283D] group-hover:bg-[#17283D] group-hover:text-[#E4C991] sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>

                      <span className="text-[10px] font-bold tracking-wider text-[#C6A66C]/70 sm:text-xs">
                        0{index + 1}
                      </span>
                    </div>

                    <h4 className="mb-2 break-words text-xs font-extrabold leading-6 text-[#17283D] sm:text-base">
                      {feature.title}
                    </h4>

                    <p className="text-[11px] leading-6 text-[#687586] sm:text-sm sm:leading-7">
                      {feature.description}
                    </p>

                    <div className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#C6A66C] transition-all duration-300 group-hover:w-full" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
