import { motion } from "motion/react";
import {
  Heart,
  UserCheck,
  Award,
  Shield,
  Utensils,
  SmilePlus,
  Users,
  HandHeart,
  ChevronRight,
  Phone,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

const PRINCIPLES = [
  {
    icon: Heart,
    title: "Милосърдие и честност",
    description:
      "Грижим се с душа и сърце, с пълна прозрачност и искреност към всеки пациент и семейство.",
  },
  {
    icon: UserCheck,
    title: "Право на индивидуалност",
    description:
      "Всеки пациент е уникален. Уважаваме личния му свят, навици и потребности.",
  },
  {
    icon: Award,
    title: "Висококачествени грижи",
    description:
      "Квалифицирани сестрински грижи и опитни болногледачи, следващи най-добрите медицински практики.",
  },
  {
    icon: Shield,
    title: "Човешко достойнство",
    description:
      "Уважението към човешкото достойнство е в основата на всяко наше действие.",
  },
];

const PRIORITIES = [
  {
    icon: Utensils,
    title: "Здравословно хранене",
    description:
      "Диетично, здравословно хранене, съобразено с индивидуалните нужди на всеки пациент.",
  },
  {
    icon: SmilePlus,
    title: "Облекчаване на страданието",
    description:
      "Облекчаване на страданието, както физически, така и душевно — с внимание и грижа.",
  },
  {
    icon: Users,
    title: "Индивидуален подход",
    description:
      "Персонализиран план за грижа, съобразен с историята и нуждите на всеки пациент.",
  },
  {
    icon: HandHeart,
    title: "Подкрепа за близките",
    description:
      "Подкрепа и информираност на близките — защото грижата обхваща цялото семейство.",
  },
];

export default function AboutPage() {
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
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
              <button
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0 });
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">За нас</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              За нас
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-2xl mx-auto">
              Домът на нашите пациенти от 2008 година
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30">
                <motion.img
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  src="https://images.unsplash.com/photo-1576560665905-28b4d4ea3380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHw2fHxlbGRlcmx5JTIwY2FyZSUyMGNvbXBhc3Npb24lMjBudXJzZSUyMGhvbGRpbmclMjBoYW5kcyUyMHdhcm10aHxlbnwwfHx8fDE3NzM5OTE1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Грижа с топлина"
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
              {/* Floating year badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-5 rounded-2xl shadow-xl hidden sm:block"
              >
                <div className="text-3xl font-bold font-serif">2008</div>
                <div className="text-sm opacity-80">Основан</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Нашата история
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
                Грижа с традиция и сърце
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />

              <div className="mt-8 space-y-5 text-white/90 leading-relaxed">
                <p>
                  <strong className="text-white font-semibold">
                    Хоспис Маринела 2008 ООД
                  </strong>{" "}
                  започва дейността си на{" "}
                  <strong className="text-white font-semibold">
                    1 октомври 2008 година
                  </strong>
                  .
                </p>
                <p>
                  Управляващи съдружници в дружеството са{" "}
                  <strong className="text-white font-semibold">Веселка Терзийска</strong>{" "}
                  (медицински управител) и{" "}
                  <strong className="text-white font-semibold">Калина Петрова</strong>{" "}
                  (финансов управител).
                </p>
                <p>
                  Дружеството е регистрирано в Търговския регистър с ЕИК{" "}
                  <strong className="text-white font-semibold">200162545</strong>.
                </p>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/40">
                {[
                  { number: "15+", label: "Години опит" },
                  { number: "60", label: "Легла" },
                  { number: "24/7", label: "Наблюдение" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-primary font-serif">
                      {stat.number}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Нашите ценности
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Водещи принципи
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/40 text-center hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: i * 0.12 + 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300"
                >
                  <principle.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-10 sm:p-16 shadow-lg border border-white/40 text-center relative overflow-hidden"
          >
            {/* Decorative accent line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-b-full" />

            <Quote className="h-12 w-12 text-accent/30 mx-auto mb-6" />

            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-8">
              Грижата за човека започва с отношението.
            </blockquote>

            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />

            <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
              Всеки пациент идва при нас със своята история, навици и тревоги, и
              нашата задача е да го посрещнем не само като пациент, а като
              личност. Стремим се да създаваме спокойна и сигурна среда, в която
              хората се чувстват разбрани, изслушани и уважавани.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Priorities */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Фокус
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Нашите приоритети
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PRIORITIES.map((priority, i) => (
              <motion.div
                key={priority.title}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
                className="group flex gap-5 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: i * 0.12 + 0.2 }}
                  className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  <priority.icon className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                    {priority.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {priority.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Connection */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Заедно с вас
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
                Работим в тясна връзка със семействата
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />

              <div className="mt-8 space-y-5 text-white/90 leading-relaxed text-base sm:text-lg">
                <p>
                  Знаем колко важни са доверието и човешката подкрепа в трудни
                  моменти. За нас качествената грижа означава{" "}
                  <strong className="text-white font-semibold">
                    внимание към детайла, търпение и съпричастност
                  </strong>
                  .
                </p>
                <p>
                  Именно това разбиране за грижа стои в основата на нашата работа
                  и определя отношението ни към всеки пациент и неговите близки.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30">
                <motion.img
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  src="https://images.unsplash.com/photo-1602152563796-29267eb24c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwzfHxlbGRlcmx5JTIwY2FyZSUyMGNvbXBhc3Npb24lMjBudXJzZSUyMGhvbGRpbmclMjBoYW5kcyUyMHdhcm10aHxlbnwwfHx8fDE3NzM5OTE1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Подкрепа за семействата"
                  className="w-full h-[350px] sm:h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-primary/90 backdrop-blur-md rounded-3xl p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 -ml-8 -mb-8" />

            <p className="text-white/80 text-lg mb-4 relative z-10">
              Ние вдъхваме на пациентите и на техните семейства надежда.
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8 relative z-10">
              Хоспис Маринела е място за връщане към живота.
            </h2>
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
