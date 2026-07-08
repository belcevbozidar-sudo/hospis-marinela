import { motion } from "motion/react";
import {
  ChevronRight,
  Phone,
  CheckCircle,
  XCircle,
  Euro,
  ShieldOff,
  Mail,
  MessageCircle,
  FileText,
  UserCheck,
  HeartHandshake,
  Banknote,
  Building,
  Wallet,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import { breadcrumbSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/prices");


const EASE = [0.25, 0.1, 0.25, 1] as const;

const PRICE_FACTORS = [
  "Тежест на заболяването",
  "Степен на зависимост от грижи",
  "Необходимост от допълнителни медицински процедури",
  "Продължителност на престоя",
];

const INCLUDED_ITEMS = [
  "24-часови грижи и постоянно наблюдение от санитар и болногледач",
  "Ежедневни лекарски визитации",
  "Сестрински грижи",
  "Три хранения на ден (при нужда – диетична храна)",
  "Помощ при хранене",
  "Съдействие при лична хигиена, придвижване",
  "Наблюдение и подкрепа при усложнения",
  "Почистване, поддържане и дезинфекция на стаята",
  "Съдействие и комуникация с близките",
];

const NOT_INCLUDED_ITEMS = [
  "Лекарства и медицински консумативи, които по правило се покриват от Националната здравноосигурителна каса (НЗОК) или се покриват от пациента или неговите близки чрез лични средства, пенсия или допълнителна здравна застраховка.",
  "Консултации със външни специалисти",
  "Индивидуални медицински изделия, ако се наложат",
];

const DOCUMENTS = [
  "Епикриза от последното лечебно заведение",
  "Налични изследвания",
  "Изписани рецепти и медикаменти",
  "Предишни епикризи (ако има)",
  "ТЕЛК решение (ако е налично)",
  "Копие от документ за самоличност",
];

export default function PricesPage() {

  return (
    <div>
      <JsonLd data={breadcrumbSchema("Цени", "/prices")} />
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
              <span className="text-primary font-medium">Цени</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Цени за Хоспис Маринела
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-3xl mx-auto leading-relaxed">
              Цените за престой в хоспис в София зависят от състоянието и
              нуждите на пациента. В Хоспис Маринела работим с ясен ценови
              диапазон.
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Intro text */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-white/90 text-base sm:text-lg leading-relaxed text-center"
          >
            Още при първия разговор обясняваме какво е включено в цената и от
            какво зависи конкретната дневна ставка.
          </motion.p>
        </div>
      </section>

      {/* Price Card */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-lg border border-white/40 text-center relative overflow-hidden"
          >
            {/* Decorative accent line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-b-full" />

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
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-5"
            >
              <Euro className="h-8 w-8" />
            </motion.div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Цени за престой и грижи в хоспис
            </h2>

            <p className="text-foreground/80 leading-relaxed text-base sm:text-lg mb-6">
              В Хоспис Маринела предлагаме дневен престой на цена между
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-accent">
                50 {"€"}
              </span>
              <span className="text-xl text-foreground/60">–</span>
              <span className="text-3xl sm:text-4xl font-bold font-serif text-accent">
                70 {"€"}
              </span>
            </div>

            <p className="text-foreground/60 text-sm mb-4">
              (97,40 – 136,36 лв.)
            </p>

            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
              Таксата се определя на база тежестта на заболяването и необходимите грижи.
            </p>

            <div className="w-16 h-0.5 bg-accent mx-auto my-6" />

            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-5 py-2.5 rounded-full mb-5">
              <Clock className="h-4 w-4" />
              Минимален престой: 10 дни
            </div>

            <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl mx-auto italic">
              Цените са примерни и могат да се променят както с намаление за
              постоянни клиенти, така и с увеличение при необходимост от много
              интензивни грижи.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Factors */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-10"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Ценообразуване
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              От какво зависи конкретната цена
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PRICE_FACTORS.map((factor, i) => (
              <motion.div
                key={factor}
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
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-lg">
                  {i + 1}
                </div>
                <span className="text-foreground font-medium text-sm sm:text-base">
                  {factor}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included / Not Included */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Included */}
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-6">
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
                  className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Какво е включено в цената
                </h2>
              </div>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />

              <div className="space-y-3">
                {INCLUDED_ITEMS.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                    className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                  >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Diapers note */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="mt-5 bg-accent/10 rounded-xl p-5 border border-accent/20"
              >
                <p className="text-foreground font-semibold text-sm sm:text-base">
                  При нас памперсите са включени в цената.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="mt-5 text-foreground/70 text-sm leading-relaxed"
              >
                Подробна информация за медицинските и немедицинските грижи,
                предлагани от Хоспис Маринела, е описана на страницата{" "}
                <Link
                  to="/services"
                  className="text-primary font-semibold hover:underline"
                >
                  Услуги
                </Link>
                .
              </motion.p>
            </motion.div>

            {/* Not Included */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-6">
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
                  className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center"
                >
                  <XCircle className="h-5 w-5" />
                </motion.div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Какво не е включено
                </h2>
              </div>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />

              <div className="space-y-3">
                {NOT_INCLUDED_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                    className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                  >
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="mt-5 text-white/90 text-sm leading-relaxed"
              >
                Ние подпомагаме близките с консултация за необходимите
                медикаменти и консумативи, както и при организиране на доставки
                на лекарства и медицински консумативи.
              </motion.p>

              {/* How to get a price */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <HeartHandshake className="h-5 w-5 text-accent" />
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    Как да получите конкретна цена
                  </h3>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  За да дадем точна информация, е необходим кратък разговор, в
                  който да се запознаем със състоянието на пациента. Свържете се
                  с нас и ще получите ясна и коректна информация с примерна цена
                  без ангажимент от ваша страна.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-10"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Начин на плащане
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Как можете да платите
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Cash */}
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
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
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5"
              >
                <Wallet className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                В брой
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Плащането може да се извърши в брой на място в Хоспис Маринела.
              </p>
            </motion.div>

            {/* Bank Transfer */}
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
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
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5"
              >
                <Building className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                По банков път
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                Плащането може да се извърши и по банков път чрез превод към следната сметка:
              </p>
              <div className="space-y-2.5 bg-primary/5 rounded-xl p-4 border border-primary/10">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">
                    Postbank
                  </span>
                </div>
                <div className="text-sm text-foreground/80 space-y-1.5 pl-6">
                  <p className="font-medium">
                    ХОСПИС МАРИНЕЛА 2008 ООД
                  </p>
                  <p>
                    <span className="text-foreground/60 font-medium">IBAN: </span>
                    <span className="font-mono font-semibold text-foreground">
                      BG85BPBI81701603211823
                    </span>
                  </p>
                  <p>
                    <span className="text-foreground/60 font-medium">BIC: </span>
                    <span className="font-mono font-semibold text-foreground">
                      BPBIBGSF
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-accent/10 rounded-xl p-4 border border-accent/20">
                <p className="text-foreground text-sm leading-relaxed">
                  <span className="font-semibold">Основание за превода:</span>{" "}
                  имена на пациента и период на престой
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why No NHIF */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm border border-white/40"
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
                className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center"
              >
                <ShieldOff className="h-6 w-6" />
              </motion.div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Защо не работим с клинични пътеки по НЗОК
              </h2>
            </div>
            <div className="w-16 h-1 bg-accent rounded-full mb-6" />

            <div className="space-y-4 text-foreground/70 leading-relaxed text-sm sm:text-base">
              <p>
                Хоспис Маринела не работи по клинични пътеки на НЗОК. Това ни
                позволява да предоставяме грижи, които не са ограничени от
                фиксирани срокове, диагнози или административни изисквания.
              </p>
              <p>
                Клиничните пътеки са създадени за болнично лечение с ясно
                дефинирана диагноза и ограничено време на престой. При
                палиативните грижи нуждите на пациента често се променят и не
                могат да бъдат вместени в предварително зададени рамки.
              </p>
              <p>
                Този начин на работа ни дава възможност да отделяме необходимото
                време и внимание на всеки пациент и да адаптираме грижите спрямо
                неговото реално състояние, а не спрямо административен лимит.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Documents */}
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
              Свържете се
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              За контакт и допълнителна информация
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-5"
            >
              <p className="text-white/90 leading-relaxed font-medium">
                Прием в Хоспис Маринела се съгласува лично с управителките на
                хосписа:
              </p>

              {/* Managers */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/40"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <span className="font-serif font-semibold text-foreground">
                      Медицински управител: Веселка Терзийска
                    </span>
                  </div>
                  <a
                    href="tel:+359878710501"
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors ml-8"
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
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/40"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <span className="font-serif font-semibold text-foreground">
                      Финансов управител: Калина Петрова
                    </span>
                  </div>
                  <a
                    href="tel:+359883920422"
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors ml-8"
                  >
                    <Phone className="h-4 w-4" />
                    Тел.: 088 392 04 22
                  </a>
                </motion.div>
              </div>

              {/* Viber & Email */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="space-y-3"
              >
                <p className="text-white/90 leading-relaxed">
                  Може да ни изпратите съобщение по Viber или с имейл до нашата
                  електронна поща:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:office@marinelahospis.com"
                    className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/40 text-foreground font-medium hover:shadow-lg transition-shadow"
                  >
                    <Mail className="h-5 w-5 text-accent" />
                    office@marinelahospis.com
                  </a>
                  <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/40 text-foreground font-medium">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Viber
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="text-white/90 text-sm leading-relaxed"
              >
                като прикачите и документи, които ще ни позволят да разберем
                по-добре състоянието на пациента без да е необходимо да
                посещавате хосписа.
              </motion.p>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-white/40">
                <div className="flex items-center gap-3 mb-5">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Бихте могли да изпратите, ако желаете:
                  </h3>
                </div>

                <div className="space-y-3">
                  {DOCUMENTS.map((doc, i) => (
                    <motion.div
                      key={doc}
                      initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.5,
                        ease: EASE,
                        delay: i * 0.06,
                      }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">
                        {doc}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-foreground/60 text-xs leading-relaxed italic">
                    Изпратената информация се разглежда конфиденциално и служи
                    само за предварителна оценка и обратна връзка. Данните не се
                    използват за други цели и не се предоставят на трети лица.
                  </p>
                </div>
              </div>

              {/* CTA to contact page */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="mt-6 text-center"
              >
                <p className="text-white/90 text-sm mb-3">
                  За да изпратите съобщение чрез сайта:
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
                >
                  <Link to="/contact">
                    <Phone className="h-5 w-5 mr-2" />
                    Към формата за контакт
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
