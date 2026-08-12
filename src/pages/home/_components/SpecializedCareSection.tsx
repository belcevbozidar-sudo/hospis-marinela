import { motion } from "motion/react";
import { Activity, Pill, ShieldCheck, Bandage, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CONDITION_PAGES } from "@/pages/conditions/conditions-data.ts";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// One representative icon per condition page (CONDITION_PAGES order:
// insult, palliative, dementia, postop — see conditions-data.ts).
const CARD_ICONS = [Activity, Pill, ShieldCheck, Bandage];

/** Homepage teaser linking to the 4 specialized-care pages — previously
 * only reachable through small text inside the Services page. */
export default function SpecializedCareSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Специализирани грижи
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
            Грижа, съобразена с конкретното състояние
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          <p className="text-white/90 mt-6 max-w-2xl mx-auto leading-relaxed">
            Прочетете повече за грижите, които предлагаме за всеки конкретен случай.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONDITION_PAGES.map((page, i) => {
            const Icon = CARD_ICONS[i];
            return (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              >
                <Link
                  to={page.path}
                  className="group flex flex-col h-full bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40 hover:shadow-xl hover:-translate-y-1.5 hover:border-accent/40 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {page.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-1">
                    {page.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Научете повече
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
