
import {
  Award,
  ShieldCheck,
  Zap,
  Users,
  Building2,
  Target,
  Crown,
  CheckCircle2,
  ArrowUpLeft,
} from "lucide-react";

const features = [
  {
    title: "جودة مضمونة",
    desc: "نستخدم أفضل الخامات ونعمل بأعلى معايير السلامة والجودة مع الاهتمام بالتنفيذ الدقيق.",
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
    <section
      id="why-us"
      dir="rtl"
      className="relative isolate overflow-hidden bg-[#F7F5F0] py-20 text-[#172B3A] sm:py-28 lg:py-32"
    >
      {/* Soft architectural background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#D9C49A]/20 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#D8E0DF]/50 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#172B3A_1px,transparent_1px),linear-gradient(90deg,#172B3A_1px,transparent_1px)] [background-size:75px_75px]" />
      </div>

      <div className="section-container relative z-10">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#B99A60]/30 bg-white/75 px-5 py-2.5 shadow-sm">
            <Crown size={15} className="shrink-0 text-[#A78343]" />
            <span className="text-xs font-bold text-[#9B783D]">
              لماذا تختارنا
            </span>
          </div>

          <h2 className="text-3xl font-black leading-[1.5] tracking-tight text-[#172B3A] sm:text-5xl lg:text-6xl">
            مميزات تجعلنا
            <span className="mt-2 block text-[#B18B48]">
              الخيار الأفضل
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#697780] sm:text-base sm:leading-9">
            نتميز بالجودة العالية والخبرة الواسعة والالتزام التام بتقديم أفضل
            الخدمات لعملائنا في مكة المكرمة والمدينة المنورة
          </p>

          <div className="mx-auto mt-8 h-[2px] w-20 bg-gradient-to-l from-transparent via-[#B99A60] to-transparent" />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E5E0D5] bg-white p-7 shadow-[0_8px_35px_rgba(23,43,58,0.04)] transition-all duration-700 hover:-translate-y-2 hover:border-[#C5A66D]/70 hover:shadow-[0_25px_55px_rgba(23,43,58,0.10)] sm:p-8 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                {/* Decorative number */}
                <span className="pointer-events-none absolute -left-2 -top-8 select-none font-black leading-none text-[120px] text-[#B99A60]/[0.055] transition-all duration-700 group-hover:text-[#B99A60]/[0.11]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Top row */}
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#D8C8A8] bg-[#F8F5EE] text-[#A78343] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#B99A60] group-hover:bg-[#B99A60] group-hover:text-white">
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9E4D9] text-[#B99A60] transition-all duration-500 group-hover:border-[#B99A60] group-hover:bg-[#B99A60] group-hover:text-white">
                    <CheckCircle2 size={17} />
                  </span>
                </div>

                {/* Text */}
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-[2px] w-7 bg-[#B99A60]" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#A78343]">
                      0{index + 1} / RUBOU
                    </span>
                  </div>

                  <h3 className="break-words text-xl font-black leading-relaxed text-[#172B3A] transition-colors duration-300 group-hover:text-[#A78343] sm:text-2xl">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-[#77828A]">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom detail */}
                <div className="relative z-10 mt-7 flex items-center justify-between border-t border-[#EEEAE2] pt-5">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-[#A78343]/80">
                    QUALITY & EXCELLENCE
                  </span>

                  <ArrowUpLeft
                    size={19}
                    className="text-[#B99A60] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1"
                  />
                </div>

                {/* Gold accent */}
                <div className="absolute bottom-0 right-0 h-[3px] w-0 bg-[#B99A60] transition-all duration-700 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
