
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { client } from "@/config/client";

const faqs = [
  {
    question: `ما هي خدمات ${client.shortName}؟`,
    answer:
      "نقدم تصميم وتنفيذ وتركيب المظلات والسواتر والبرجولات والهناجر والساندوتش بانل والشبوك وتسوير المباني بجودة عالية واهتمام بالتنفيذ.",
  },
  {
    question: "ما أنواع المظلات التي توفرونها؟",
    answer:
      "نوفر مظلات سيارات ومظلات حدائق وتغطية مسابح ومظلات مدارس بتصاميم متنوعة تناسب جميع الاحتياجات.",
  },
  {
    question: "هل تقدمون تركيب السواتر؟",
    answer:
      "نعم، نقدم تصميم وتركيب السواتر للمنازل والمنشآت والمرافق المختلفة بمواد متينة ومقاومة للعوامل الجوية.",
  },
  {
    question: "هل توفرون هناجر ساندوتش بانل ومستودعات؟",
    answer:
      "نعم، نقدم تنفيذ الهناجر والمستودعات باستخدام ألواح الساندوتش بانل مع حلول مناسبة للعزل الحراري والحماية.",
  },
  {
    question: "ما المدن التي تخدمها المؤسسة؟",
    answer:
      "نقدم خدماتنا في مكة المكرمة والمدينة المنورة.",
  },
  {
    question: "هل تقدمون ضمان على الأعمال؟",
    answer:
      "نعم، نهتم بجودة التنفيذ في جميع الأعمال المنفذة وجودة المواد المستخدمة لراحة بال عملائنا.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      dir="rtl"
      className="relative isolate overflow-hidden bg-[#F8F7F3] py-16 sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-32 top-10 h-72 w-72 rounded-full border border-[#C6A66C]/10 sm:h-96 sm:w-96" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#C6A66C]/[0.05] blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="section-container relative z-10">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C6A66C]/30 bg-white px-4 py-2 shadow-sm">
            <HelpCircle className="h-4 w-4 text-[#B18D50]" />
            <span className="text-xs font-bold tracking-wide text-[#9A7945] sm:text-sm">
              الأسئلة الشائعة
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-extrabold leading-relaxed text-[#17283D] sm:text-3xl lg:text-4xl">
            أهم الاستفسارات
            <span className="mt-1 block bg-gradient-to-l from-[#A98445] via-[#D6B77C] to-[#A98445] bg-clip-text text-transparent">
              عن خدماتنا
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-[#687586] sm:text-base sm:leading-9">
            إجابات على أكثر الأسئلة شيوعاً حول خدمات المظلات والسواتر والهناجر
            في مكة المكرمة والمدينة المنورة
          </p>

          <div className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-gradient-to-l from-transparent via-[#C6A66C] to-transparent sm:w-24" />
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="space-y-3 sm:space-y-4"
          >
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="group overflow-hidden rounded-xl border border-[#E8E3D9] bg-white px-4 shadow-[0_3px_16px_rgba(23,40,61,0.035)] transition-all duration-300 hover:border-[#C6A66C]/50 hover:shadow-[0_8px_28px_rgba(23,40,61,0.07)] data-[state=open]:border-[#C6A66C]/60 data-[state=open]:shadow-[0_10px_30px_rgba(23,40,61,0.07)] sm:rounded-2xl sm:px-6 lg:px-7"
              >
                <AccordionTrigger className="gap-3 py-5 text-right text-[13px] font-bold leading-7 text-[#17283D] hover:no-underline sm:gap-4 sm:py-6 sm:text-base [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-[#B18D50] [&>svg]:transition-transform">
                  <span className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F7F3EA] text-xs font-bold text-[#A98445] transition-colors group-data-[state=open]:bg-[#17283D] group-data-[state=open]:text-[#E4C991] sm:h-9 sm:w-9 sm:text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 break-words">
                      {item.question}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-11 text-xs leading-8 text-[#687586] sm:pb-6 sm:pr-[52px] sm:text-sm sm:leading-9">
                  <div className="border-r-2 border-[#D6B77C]/60 pr-4">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact note */}
        <div className="mx-auto mt-9 flex max-w-4xl flex-col items-center justify-center gap-3 rounded-2xl border border-[#E8E3D9] bg-white/80 px-4 py-5 text-center shadow-sm sm:mt-12 sm:flex-row sm:gap-4 sm:px-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3EA] text-[#A98445]">
            <MessageCircle className="h-5 w-5" />
          </div>

          <p className="text-xs leading-7 text-[#687586] sm:text-sm">
            لديك استفسار آخر؟ يسعدنا مساعدتك والإجابة عن جميع أسئلتك.
          </p>

          <Sparkles className="hidden h-4 w-4 shrink-0 text-[#C6A66C] sm:block" />
        </div>

      </div>
    </section>
  );
}
