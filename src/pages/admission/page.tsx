import { motion } from "motion/react";
import {
  ChevronRight,
  Phone,
  ClipboardList,
  BedDouble,
  ShirtIcon,
  Pill,
  Clock,
  Utensils,
  Smartphone,
  Tv,
  Wallet,
  AlertTriangle,
  UserCheck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import { breadcrumbSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/admission");

const EASE = [0.25, 0.1, 0.25, 1] as const;

const RULES = [
  {
    icon: BedDouble,
    title: "ПРЕСТОЙ",
    text: "Определя се от самия пациент или негови близки след запознаване с реда за престой в хосписа.",
  },
  {
    icon: ShirtIcon,
    title: "ЛИЧНИ ВЕЩИ",
    text: "Препоръчително е пациентът да носи свои лични вещи — гребен, кърпа, бельо, чехли за баня, тоалетни принадлежности и др.",
  },
  {
    icon: Pill,
    title: "ЛЕКАРСТВА",
    text: "Желателно е лекарствата и здравната документация на пациента да бъдат предадени на старшата сестра в хосписа при настаняване, която носи отговорност за съхранението им.",
  },
  {
    icon: Clock,
    title: "ПОСЕЩЕНИЯ",
    text: "Посещенията са във вторник, четвъртък, събота и неделя от 16:00 до 19:30 ч.",
  },
  {
    icon: Utensils,
    title: "ХРАНЕНЕ",
    text: "Храненето е диетично, в зависимост от нуждите на пациента.",
  },
  {
    icon: Smartphone,
    title: "ТЕЛЕФОН",
    text: "Ползването на телефон е неограничено за разговор с близки.",
  },
  {
    icon: Tv,
    title: "ТЕЛЕВИЗИЯ",
    text: "Пациентите могат да ползват по всяко време безплатно кабелна телевизия. Всяка стая има индивидуален телевизор.",
  },
  {
    icon: Wallet,
    title: "ПАРИ И ЦЕННОСТИ",
    text: "При постъпване в хосписа не се носят ценни книжа и документи, големи суми пари и бижута.",
  },
];

export default function AdmissionPage() {

  return (
    <div>
      <JsonLd data={breadcrumbSchema("Прием", "/admission")} />
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
              <Link
                to="/"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">Прием</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Настаняване на пациенти
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-3xl mx-auto leading-relaxed">
              Настаняването на пациенти в хосписа се извършва след предварително
              съгласуване и медицинска преценка.
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Admission Info + Building Image */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                    delay: 0.2,
                  }}
                  className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"
                >
                  <ClipboardList className="h-6 w-6" />
                </motion.div>
                <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Прием
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Прием в Хоспис Маринела
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />

              <p className="mt-8 text-white/90 leading-relaxed text-base sm:text-lg font-medium">
                Прием в Хоспис Маринела се съгласува лично с управителките:
              </p>

              {/* Contact cards */}
              <div className="mt-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      Медицински управител
                    </h3>
                  </div>
                  <p className="text-foreground font-bold text-lg mb-1">
                    Веселка Терзийска
                  </p>
                  <a
                    href="tel:+359878710501"
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Тел.: 087 871 05 01
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      Финансов управител
                    </h3>
                  </div>
                  <p className="text-foreground font-bold text-lg mb-1">
                    Калина Петрова
                  </p>
                  <a
                    href="tel:+359883920422"
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Тел.: 088 392 04 22
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30">
                <motion.img
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: EASE }}
                  src="/assets/file_lBXpTenPGbaaSA7KeWBi1MjL.webp"
                width={1067}
                height={1600}
                loading="lazy"
                decoding="async"
                  alt="Хоспис Маринела сграда"
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                  delay: 0.5,
                }}
                className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-5 rounded-2xl shadow-xl hidden sm:flex items-center gap-3"
              >
                <Building2 className="h-6 w-6" />
                <div>
                  <div className="text-sm font-bold">Хоспис Маринела</div>
                  <div className="text-xs opacity-80">София</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internal Rules Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Вътрешен ред
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Вътрешен ред в Хоспис Маринела
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {RULES.map((rule, i) => (
              <motion.div
                key={rule.title}
                initial={{
                  opacity: 0,
                  y: 50,
                  filter: "blur(8px)",
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group flex gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <div className="shrink-0 min-w-12 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <rule.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-foreground mb-1">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {rule.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-start gap-4 bg-accent/10 rounded-2xl p-6 sm:p-8 border border-accent/20"
          >
            <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
            <p className="text-foreground leading-relaxed text-sm sm:text-base italic">
              Хосписът не носи отговорност за изгубени или откраднати ценни вещи.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.97,
              filter: "blur(10px)",
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-primary/90 backdrop-blur-md rounded-3xl p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 -ml-8 -mb-8" />

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 relative z-10">
              Имате въпроси относно приема?
            </h2>
            <p className="text-white/80 text-lg mb-8 relative z-10">
              Свържете се с управителките за безплатна консултация.
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
