import { motion } from "motion/react";
import { ChevronRight, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";
import { FaqSection } from "@/components/faq-section.tsx";
import type { ConditionPageData } from "./conditions-data.ts";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Shared layout for the /grizhi-sled-insult, /palliativni-grizhi, /demenciya-alzhaimer
 * and /sledoperativno-vazstanovyavane pages — see conditions-data.ts for their content. */
export function ConditionPage({ data }: { data: ConditionPageData }) {
  return (
    <div>
      <JsonLd
        data={[
          breadcrumbSchema(data.title, data.path),
          ...serviceSchema([{ name: data.title, description: data.subtitle }]),
        ]}
      />

      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-12 bg-gradient-to-br from-primary/90 to-primary/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
              <Link to="/" className="hover:text-primary transition-colors cursor-pointer">
                Начало
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/services" className="hover:text-primary transition-colors cursor-pointer">
                Услуги
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">{data.title}</span>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-4">
              {data.badge}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {data.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {data.intro.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="text-white/90 leading-relaxed text-base sm:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm border border-white/40"
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              За кого е подходящо
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.whoFor.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-primary/5"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we provide */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/85 to-primary/65">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Какво осигуряваме
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Грижите, които предлагаме
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {data.provide.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/40 hover:shadow-lg transition-shadow"
              >
                <div className="shrink-0 min-w-11 w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-foreground text-sm sm:text-base leading-relaxed pt-1.5">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={data.faq} />

      {/* Closing CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-primary/90 backdrop-blur-md rounded-3xl p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 -ml-8 -mb-8" />

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 relative z-10">
              Имате въпроси относно {data.title.toLowerCase()}?
            </h2>
            <p className="text-white/80 text-lg mb-8 relative z-10">
              Свържете се с нас за безплатна консултация.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 relative z-10"
            >
              <Link to="/contact">
                <Phone className="h-5 w-5 mr-2" />
                Свържете се с нас
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
