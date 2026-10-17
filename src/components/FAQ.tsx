import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { client } from "@/config/client";

const faqs = [
  {
    question: `ما هي خدمات ${client.shortName}؟`,
    answer:
      "نقدم تصميم وتنفيذ وتركيب المظلات والسواتر والبرجولات والهناجر والساندوتش بانل والشبوك وتسوير المباني بجودة عالية وضمان شامل.",
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
    answer: `نقدم خدماتنا في ${client.serviceAreas.join(" و")}.`,
  },
  {
    question: "هل تقدمون ضمان على الأعمال؟",
    answer:
      "نعم، نقدم ضماناً شاملاً على جميع الأعمال المنفذة وجودة المواد المستخدمة لراحة بال عملائنا.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" dir="rtl" className="section-padding relative overflow-hidden bg-background-light">
      <div className="section-container relative z-10">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="section-badge mb-5">
            <HelpCircle size={14} className="shrink-0 text-accent" />
            <span>الأسئلة الشائعة</span>
          </div>

          <h2 className="section-title mb-4">
            أهم الاستفسارات
            <span className="mt-2 block text-gradient-luxury">عن خدماتنا</span>
          </h2>

          <p className="section-desc mx-auto">
            إجابات على أكثر الأسئلة شيوعاً حول خدمات المظلات والسواتر والهناجر
            في مكة المكرمة والمدينة المنورة
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="overflow-hidden rounded-xl border-2 border-primary/10 bg-white px-4 shadow-sm data-[state=open]:border-accent/40 sm:px-5"
              >
                <AccordionTrigger className="py-4 text-right text-sm font-bold text-primary hover:no-underline sm:text-base [&>svg]:shrink-0 [&>svg]:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-8 text-secondary sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
