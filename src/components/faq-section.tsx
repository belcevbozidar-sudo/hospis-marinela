import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { faqSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export type FaqItem = { question: string; answer: string };

/** Renders an accordion FAQ block plus its matching FAQPage JSON-LD. */
export function FaqSection({
  title = "Често задавани въпроси",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <JsonLd data={faqSchema(items)} />
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">{title}</h2>
          <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm px-6 sm:px-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger className="text-foreground font-serif text-base sm:text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed text-sm sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
