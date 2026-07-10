import { motion } from "motion/react";
import {
  Stethoscope,
  HeartPulse,
  Activity,
  Utensils,
  ShowerHead,
  HandHeart,
  Ambulance,
  ChevronRight,
  Phone,
  Eye,
  Syringe,
  Pill,
  Wind,
  Bandage,
  BedDouble,
  MessageCircleHeart,
  Smile,
  Users,
  Armchair,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import { breadcrumbSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/services");


const SERVICE_CATEGORIES = [
  {
    icon: Stethoscope,
    title: "Медицински грижи",
    description: "24-часово наблюдение, манипулации, палиативни грижи",
    color: "bg-red-500/10 text-red-600",
    hoverColor: "group-hover:bg-red-500 group-hover:text-white",
  },
  {
    icon: Activity,
    title: "Рехабилитация",
    description: "Възстановяване след инсулт от квалифицирани специалисти",
    color: "bg-blue-500/10 text-blue-600",
    hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
  },
  {
    icon: Eye,
    title: "Лекарско наблюдение",
    description: "Визитации, терапия и определяне на рехабилитация",
    color: "bg-emerald-500/10 text-emerald-600",
    hoverColor: "group-hover:bg-emerald-500 group-hover:text-white",
  },
  {
    icon: Utensils,
    title: "Храна",
    description: "Здравословен кетъринг — закуска, обяд и вечеря",
    color: "bg-amber-500/10 text-amber-600",
    hoverColor: "group-hover:bg-amber-500 group-hover:text-white",
  },
  {
    icon: ShowerHead,
    title: "Санитарни грижи",
    description: "24-часова помощ за хигиена и комфорт",
    color: "bg-cyan-500/10 text-cyan-600",
    hoverColor: "group-hover:bg-cyan-500 group-hover:text-white",
  },
  {
    icon: HandHeart,
    title: "Немедицински грижи",
    description: "Емоционална подкрепа, компания и спокойствие",
    color: "bg-pink-500/10 text-pink-600",
    hoverColor: "group-hover:bg-pink-500 group-hover:text-white",
  },
  {
    icon: Ambulance,
    title: "Превоз",
    description: "Транспорт с линейка до болнични заведения",
    color: "bg-violet-500/10 text-violet-600",
    hoverColor: "group-hover:bg-violet-500 group-hover:text-white",
  },
];

const MEDICAL_SERVICES = [
  {
    icon: HeartPulse,
    text: "24-часово денонощно медицинско наблюдение и извършване на манипулации",
  },
  {
    icon: BedDouble,
    text: "Грижи за лежащо болни пациенти",
  },
  {
    icon: HeartPulse,
    text: "Палиативни грижи за онкоболни",
  },
  {
    icon: Utensils,
    text: "Ентерално (сондажно) хранене на пациенти",
  },
  {
    icon: Syringe,
    text: "Инфузионна терапия (венозни вливания)",
  },
  {
    icon: Activity,
    text: "Поддържащи рехабилитационни дейности след инсулт",
  },
  {
    icon: Wind,
    text: "Кислородна терапия при необходимост",
  },
  {
    icon: Bandage,
    text: "Лечение на дълбоки рани",
  },
  {
    icon: Pill,
    text: "Лекарски контрол на болката",
  },
  {
    icon: Syringe,
    text: "Инжекции по лекарско назначение",
  },
  {
    icon: Stethoscope,
    text: "Медицински процедури по лекарско назначение",
  },
];

const NON_MEDICAL_ITEMS = [
  "Осигуряване на технически помощни средства — бастуни, проходилки и др.",
  "Помощ при позициониране и раздвижване (без терапевтичен характер)",
  "Емоционална подкрепа и присъствие",
  "Разговори и компания за пациентите",
  "Подкрепа при тревожност, страх и самота",
  "Подкрепа за близките и семейството",
  "Създаване на спокойна, човешка атмосфера",
];

// Shared easing curve for all scroll animations
const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function ServicesPage() {
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div>
      <JsonLd data={breadcrumbSchema("Услуги", "/services")} />
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-12 bg-gradient-to-br from-primary/90 to-primary/70">
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
              <span className="text-primary font-medium">Услуги</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Нашите услуги
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-3xl mx-auto leading-relaxed">
              Хосписът предоставя грижи за пациенти, преминали болнично лечение,
              в период на възстановяване след тежки заболявания, оперативни
              интервенции и инфекции.
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Intro banner */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/30"
          >
            <img
              src="/assets/banner-uslugi-denonoshtni-grizhi.webp"
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
              alt="Денонощни грижи за възрастни и лежащо болни в София — денонощна грижа и наблюдение, професионален медицински екип, уютна среда и човешко отношение в Хоспис Маринела"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm border border-white/40"
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
              Кого приемаме
            </h2>
            <p className="text-foreground/70 leading-relaxed text-center text-base sm:text-lg mb-8">
              Приемат се възрастни и болни хора в следните състояния:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Слединсултни състояния",
                "Деменция и Алцхаймер",
                "Обездвижени пациенти",
                "Хронични заболявания",
                "Следоперативни грижи",
                "Палиативни грижи",
              ].map((condition, i) => (
                <motion.div
                  key={condition}
                  initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/5"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">
                    {condition}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="text-foreground/70 text-sm text-center mt-8">
              Всеки пациент получава индивидуални грижи и внимание, а персоналът
              се стреми към максимално облекчаване на страданието.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories Overview */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/85 to-primary/65">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Основни дейности
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Пълен спектър от грижи
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40 hover:shadow-xl hover:-translate-y-1.5 hover:border-accent/30 transition-all duration-300 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.12 + 0.15 }}
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${cat.color} ${cat.hoverColor} mb-4 transition-colors duration-300`}
                >
                  <cat.icon className="h-7 w-7" />
                </motion.div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {cat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Services Detail */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/80 to-primary/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: header */}
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-2"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Подробно
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
                Медицински грижи
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />
              <p className="text-white/90 mt-6 leading-relaxed">
                Медицинските процедури се извършват както в рамките на престоя на
                пациентите в хосписа, така и амбулаторно за външни пациенти по
                предварителна заявка и лекарско назначение.
              </p>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="mt-8 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/30 hidden lg:block"
              >
                <img
                  src="/assets/stock-1576560665905-28b4d4ea3380.jpg"
                width={1080}
                height={720}
                loading="lazy"
                decoding="async"
                  alt="Медицински грижи"
                  className="w-full h-[250px] object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right: services list */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-3 space-y-3"
            >
              {MEDICAL_SERVICES.map((service, i) => (
                <motion.div
                  key={service.text}
                  initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-sm transition-shadow"
                >
                  <div className="shrink-0 min-w-10 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mt-0.5">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed">
                    {service.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rehabilitation */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/85 to-primary/65">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30"
              >
                <img
                  src="/assets/stock-1751977103188-22033f5f98cf.jpg"
                width={1080}
                height={720}
                loading="lazy"
                decoding="async"
                  alt="Рехабилитация"
                  className="w-full h-[350px] sm:h-[420px] object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Възстановяване
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
                Рехабилитация
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />

              <div className="mt-8 space-y-5 text-white/90 leading-relaxed text-base">
                <p>
                  Поддържащата рехабилитация след инсулт се извършва от{" "}
                  <strong className="text-white font-semibold">
                    квалифицирани рехабилитатори
                  </strong>{" "}
                  със специализирано висше медицинско образование.
                </p>
                <p>
                  Рехабилитацията е насочена към{" "}
                  <strong className="text-white font-semibold">
                    запазване на подвижността
                  </strong>{" "}
                  и профилактика на усложнения.
                </p>
                <p>
                  При необходимост от лечение и възстановителни дейности се
                  осигурява лекарска консултация и насочване към санаториум или
                  болнично лечебно заведение.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Care Grid: Doctor, Food, Sanitary */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/80 to-primary/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Ежедневие
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Ежедневни грижи
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Doctor */}
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 mb-5"
              >
                <Eye className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Лекарско наблюдение
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Визитации в определени делнични дни. Назначаване или промяна на
                терапията, определяне на необходимата рехабилитация и др.
              </p>
            </motion.div>

            {/* Food */}
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.22 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 mb-5"
              >
                <Utensils className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Храна
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Здравословен кетъринг, включващ закуска, обяд и вечеря.
                Сестрите и болногледачките следят за спазване на диети и хранене
                на пациенти на легло.
              </p>
            </motion.div>

            {/* Sanitary */}
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.34 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-600 mb-5"
              >
                <ShowerHead className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Санитарни грижи
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                24-часови санитарни грижи от опитни болногледачи, включващи помощ
                при хранене, къпане, обличане, смяна на бельо, хигиенно
                почистване на стаите, пране на бельо.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Non-Medical Care */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/85 to-primary/65">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Човешка подкрепа
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
                Немедицински грижи
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />

              <div className="mt-8 space-y-3">
                {NON_MEDICAL_ITEMS.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-white font-semibold text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30"
              >
                <img
                  src="/assets/stock-1739932885175-5fdaa1bd5989.jpg"
                width={1080}
                height={720}
                loading="lazy"
                decoding="async"
                  alt="Немедицински грижи"
                  className="w-full h-[350px] sm:h-[420px] object-cover"
                />
              </motion.div>

              {/* Floating icons */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.45 }}
                className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hidden sm:flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                    className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center"
                  >
                    <MessageCircleHeart className="h-5 w-5 text-pink-500" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.58 }}
                    className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"
                  >
                    <Smile className="h-5 w-5 text-amber-500" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.66 }}
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <Users className="h-5 w-5 text-blue-500" />
                  </motion.div>
                </div>
                <span className="text-sm font-medium text-foreground">
                  Подкрепа и топлина
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm border border-white/40 flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="shrink-0 w-20 h-20 rounded-2xl bg-violet-500/10 text-violet-600 flex items-center justify-center"
            >
              <Ambulance className="h-10 w-10" />
            </motion.div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                Превоз
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Хосписът предлага възможност за превоз с линейка при приемане на
                пациенти, както и за транспортиране до болнични заведения,
                лаборатории, санаториуми и други лечебни институции.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Note about ambulatory */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-start gap-4 bg-accent/10 rounded-2xl p-6 sm:p-8 border border-accent/20"
          >
            <Armchair className="h-6 w-6 text-accent shrink-0 mt-0.5" />
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              <strong>Важно:</strong> Медицинските процедури се извършват както в
              рамките на престоя на пациентите в хосписа, така и амбулаторно за
              външни пациенти по предварителна заявка и лекарско назначение.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-primary/90 backdrop-blur-md rounded-3xl p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 -ml-8 -mb-8" />

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 relative z-10">
              Нуждаете се от повече информация?
            </h2>
            <p className="text-white/80 text-lg mb-8 relative z-10">
              Свържете се с нас за безплатна консултация за грижите, които
              предлагаме.
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 relative z-10"
            >
              <Phone className="h-5 w-5 mr-2" />
              Свържете се с нас
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
