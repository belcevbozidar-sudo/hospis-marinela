import { motion } from "motion/react";
import {
  Stethoscope,
  HeartPulse,
  Activity,
  Utensils,
  Bed,
  Wind,
} from "lucide-react";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "24-часова медицинска грижа",
    description:
      "Денонощно наблюдение от квалифицирани лекари, медицински сестри и болногледачи.",
  },
  {
    icon: Activity,
    title: "Рехабилитация",
    description:
      "Индивидуални рехабилитационни програми от рехабилитатори с висше медицинско образование.",
  },
  {
    icon: HeartPulse,
    title: "Палиативни грижи",
    description:
      "Специализирана палиативна грижа от специалисти с дългогодишен опит.",
  },
  {
    icon: Wind,
    title: "Кислородна терапия",
    description:
      "Апаратура за пациенти с тежки дихателни заболявания, нуждаещи се постоянно от кислород.",
  },
  {
    icon: Utensils,
    title: "Здравословно хранене",
    description:
      "Здравословна и диетична храна, съобразена с нуждите на пациентите — закуска, обяд и вечеря.",
  },
  {
    icon: Bed,
    title: "Комфортни условия",
    description:
      "Модерни стаи с всички удобства — санитарен възел, интернет и телевизия.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Какво предлагаме
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
            Нашите услуги
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          <p className="text-white/90 mt-6 leading-relaxed">
            Предлагаме пълен спектър от медицински и социални услуги, 
            съобразени с индивидуалните нужди на всеки пациент.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-white/40 hover:border-accent/40"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.15 + index * 0.1,
                }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300"
              >
                <service.icon className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
