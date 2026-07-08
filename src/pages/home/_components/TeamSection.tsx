import { motion } from "motion/react";
import { Users, UserCheck, Stethoscope, HeartHandshake } from "lucide-react";

const TEAM_MEMBERS = [
  "Лекари-консултанти",
  "Рехабилитатори с висше медицинско образование",
  "Анестезиолзи-реаниматори",
  "Специалисти по палиативни грижи",
  "Медицински сестри",
  "Болногледачи",
  "Социални работници",
];

const TEAM_STATS = [
  { icon: Stethoscope, number: "7+", label: "Специалности" },
  { icon: Users, number: "30+", label: "Медицински персонал" },
  { icon: UserCheck, number: "1000+", label: "Пациенти" },
  { icon: HeartHandshake, number: "15+", label: "Доброволци" },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Нашият екип
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
            Състав на медицинския екип
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          <p className="text-white/90 mt-6 leading-relaxed">
            За потребностите на настанените се грижи сплотен от многогодишна работа 
            екип от квалифицирани медицински специалисти.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Team image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/stock-1765896387387-0538bc9f997e.jpg"
                width={1080}
                height={764}
                loading="lazy"
                decoding="async"
                alt="Медицински екип на Хоспис Маринела"
                className="w-full h-[350px] sm:h-[420px] object-cover"
              />
            </div>

            {/* Team stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {TEAM_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/40"
                >
                  <div className="p-2 rounded-lg bg-accent/15 text-accent">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-xs text-foreground/70">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team details */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="font-serif text-2xl font-bold text-white mb-6">
              Квалифицирани специалисти
            </h3>
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div
                  key={member}
                  initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40 hover:border-accent/40 hover:shadow-md hover:-translate-x-1 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="text-foreground font-medium">{member}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl"
            >
              <p className="text-foreground/70 leading-relaxed text-sm">
                Медицинският управител на Хоспис Маринела е магистър по Здравен 
                мениджмънт и управление на здравни грижи, като съвременно и 
                преподавател по практика в медицински колеж за висше медицинско 
                образование по здравен мениджмънт.
              </p>
            </motion.div>

            {/* Volunteers */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 p-6 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl"
            >
              <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                Доброволци и духовни съветници
              </h4>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Освен постоянният персонал, Хоспис Маринела разчита и на безценната 
                хуманна помощ от доброволци, както и на посещения от свещеници, 
                пастори и духовни съветници, съобразно нуждите и религиозната 
                принадлежност на пациентите.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
