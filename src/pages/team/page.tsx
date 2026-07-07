import { motion } from "motion/react";
import {
  ChevronRight,
  Phone,
  Stethoscope,
  Briefcase,
  HeartHandshake,
  Users,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  description?: string;
};

const VESELKA_MILESTONES = [
  {
    icon: GraduationCap,
    year: "1994",
    text: "Завършва Медицински университет \u2013 София",
  },
  {
    icon: Stethoscope,
    year: "15+ години",
    text: "Опит в реанимация към Александровска болница — среда, която изгражда бърза преценка и високо ниво на медицинска отговорност",
  },
  {
    icon: GraduationCap,
    year: "2009",
    text: "Придобива квалификация Здравен мениджър, надграждайки клиничния си опит с управленски умения",
  },
  {
    icon: Building2,
    year: "Днес",
    text: "Ръководи медицинския екип и отговаря за качеството на грижите, стандартите в лечението и координацията на пациентската грижа",
  },
];

const MEDICAL_STAFF: TeamMember[] = [
  {
    name: "Анатоли Вълчев",
    role: "Кинезитерапевт",
    image: "/assets/file_vbVFnBr7PIDTnKFTQRTd6Yp9",
    description:
      "С дългогодишен практически опит, Анатоли Вълчев е ключова част от екипа, който работи за възстановяване на движението и физическата активност на пациентите. Подхожда с постоянство, търпение и индивидуално внимание към всеки случай.",
  },
  {
    name: "Петя Петрова Симеонова",
    role: "Рехабилитатор",
    image: "/assets/file_xug0FhPCwWmMr6erNc0wUNnJ",
    description:
      "Завършва Софийски университет през 2025 г. със степен бакалавър по \u201EМедицинска рехабилитация и ерготерапия\u201C. В момента продължава обучението си в УНСС със специалност \u201EПублична администрация\u201C със специализация \u201EЗдравен мениджмънт\u201C. Комбинира актуални знания с практичен подход и индивидуално внимание към всеки пациент, насочено към реално подобряване на качеството на живот.",
  },
  {
    name: "Валя Руйкова",
    role: "Домакин",
    image: "/assets/file_XXH8xOEmGYp0h65sU4QMIzkn",
    description:
      "Професионален опит — от 2014 г. във фирмата. Грижи се за поддръжката и организацията на битовата среда в хосписа, осигурявайки уют и комфорт за пациентите.",
  },
  {
    name: "Венета Благоева",
    role: "Болногледач",
    image: "/assets/file_hkvo14ILu5S39Rpxt2juwv1A",
    description:
      "От 2014 г. в екипа на Хоспис Маринела. Грижи се с внимание и отдаденост за ежедневните нужди на пациентите, осигурявайки им комфорт и спокойствие.",
  },
  {
    name: "Първолета Алексова",
    role: "Болногледач",
    image: "/assets/file_bTUEXttvAVV5hHN59Jym9hkY",
    description:
      "От 2014 г. в екипа. Притежава 10 години професионален опит в Гърция. Носи ценен международен опит в грижата за пациенти, съчетан с внимание и съпричастност.",
  },
  {
    name: "Таня Ангелова",
    role: "Болногледач",
    image: "/assets/file_QThTUkqSnT2rd9dQFyQlGvwl",
    description:
      "Болногледач с дългогодишен опит в Италия. Носи ценен международен опит и подход в грижата за пациенти, съчетан с внимание и професионализъм.",
  },
];

const SHAHOV_MILESTONES = [
  {
    icon: GraduationCap,
    year: "Образование",
    text: "Завършил Медицински университет — София",
  },
  {
    icon: Stethoscope,
    year: "35+ години",
    text: "Опит в областта на интензивната медицина. Специалност Анестезиология и реанимация",
  },
  {
    icon: GraduationCap,
    year: "Лондон",
    text: "Специализирал Палиативна медицина в Лондон",
  },
  {
    icon: Building2,
    year: "Днес",
    text: "Активно работещ в Болница по онкологични заболявания Дървеница, София. Основен лекар консултант в Хоспис Маринела",
  },
];

const KALINA_MILESTONES = [
  {
    icon: GraduationCap,
    year: "1998",
    text: "Завършва УНСС със специалност Маркетинг и мениджмънт (магистър)",
  },
  {
    icon: GraduationCap,
    year: "2009",
    text: "Придобива втора специалност — Счетоводство и контрол",
  },
  {
    icon: Building2,
    year: "2008",
    text: "Създава Хоспис Маринела — лечебно заведение с ясна визия за качество и грижа",
  },
  {
    icon: Users,
    year: "Днес",
    text: "Ръководи екип от над 20 души персонал с баланс между професионализъм и човечност",
  },
];

export default function TeamPage() {
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
      <section className="pt-28 sm:pt-36 pb-12 bg-gradient-to-br from-primary/90 to-primary/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
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
              <span className="text-primary font-medium">Нашият екип</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Нашият екип
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-2xl mx-auto text-balance">
              Професионалисти с мисия и сърце, отдадени на грижата за всеки
              пациент
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Веселка Терзийска — Featured Co-owner Section (FIRST) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/40 shadow-xl"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Photo — left side on desktop */}
              <div className="relative overflow-hidden">
                <motion.img
                  src="/assets/file_u1w1JBSBtG6acBqLqTPfcE7G"
                  alt="Веселка Георгиева Терзийска"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full h-[400px] sm:h-[500px] lg:h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent lg:hidden" />
              </div>

              {/* Bio — right side on desktop */}
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-md mb-5">
                    <Stethoscope className="h-4 w-4" />
                    Собственик / Медицински управител
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                    Веселка Георгиева
                    <br />
                    Терзийска
                  </h2>

                  <p className="text-base font-bold text-foreground/80 mt-5 leading-relaxed">
                    Медицински управител на Хоспис Маринела. Под нейно ръководство
                    медицинската дейност в хосписа се отличава с професионализъм,
                    последователност и внимание към всеки детайл.
                  </p>

                  {/* Timeline milestones */}
                  <div className="mt-8 space-y-5">
                    {VESELKA_MILESTONES.map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + i * 0.1,
                        }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            {item.year}
                          </span>
                          <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Калина Петрова — Featured Owner Section (SECOND) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/40 shadow-xl"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Bio — left side on desktop */}
              <div className="order-2 lg:order-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-bold px-4 py-2 rounded-full shadow-md mb-5">
                    <Briefcase className="h-4 w-4" />
                    Собственик и мениджър
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                    Калина Цветанова
                    <br />
                    Славкова-Петрова
                  </h2>

                  <p className="text-base font-bold text-foreground/80 mt-5 leading-relaxed">
                    Собственик и управител на Хоспис Маринела. Нейният подход се
                    отличава с баланс между професионализъм и човечност — водещи
                    принципи, върху които се изгражда доверието в Хоспис Маринела
                    през годините.
                  </p>

                  {/* Timeline milestones */}
                  <div className="mt-8 space-y-5">
                    {KALINA_MILESTONES.map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + i * 0.1,
                        }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            {item.year}
                          </span>
                          <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Photo — right side on desktop */}
              <div className="relative overflow-hidden order-1 lg:order-2">
                <motion.img
                  src="/assets/file_5u0kyVikkV9vQp62IDPYpHSO"
                  alt="Калина Цветанова Славкова-Петрова"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full h-[400px] sm:h-[500px] lg:h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent lg:hidden" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Д-р Александър Шахов — Лекуващ лекар */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/40 shadow-xl"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Photo — left side on desktop */}
              <div className="relative overflow-hidden">
                <motion.img
                  src="/assets/file_rubvbKGXx8RdmH0L2RK1Y6Kj"
                  alt="Д-р Александър Шахов"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full h-[400px] sm:h-[500px] lg:h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent lg:hidden" />
              </div>

              {/* Bio — right side on desktop */}
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-md mb-5">
                    <Stethoscope className="h-4 w-4" />
                    Лекуващ лекар
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                    Д-р Александър Шахов
                  </h2>

                  <p className="text-base font-bold text-foreground/80 mt-5 leading-relaxed">
                    Лекуващ лекар на Хоспис Маринела и консултант по палиативни
                    грижи. Осигурява медицинско наблюдение и лечение на пациентите с
                    професионализъм и внимание към индивидуалните нужди на всеки.
                  </p>

                  {/* Timeline milestones */}
                  <div className="mt-8 space-y-5">
                    {SHAHOV_MILESTONES.map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + i * 0.1,
                        }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            {item.year}
                          </span>
                          <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Medical Staff */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/85 to-primary/65">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-14"
          >
            <span className="text-primary-foreground font-semibold text-sm uppercase tracking-widest">
              Медицински персонал
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Медицински екип
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
            <p className="text-white/90 mt-4 max-w-xl mx-auto">
              Квалифицирани медицински специалисти, осигуряващи денонощна
              професионална грижа
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {MEDICAL_STAFF.map((member, i) => (
              <motion.div
                key={`medical-${i}`}
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
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.12,
                }}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.role}
                    initial={{
                      opacity: 0,
                      scale: 1.06,
                      filter: "blur(12px)",
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: i * 0.12 + 0.1,
                    }}
                    className="w-full aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 bg-primary/15 text-primary text-sm font-bold px-4 py-2 rounded-full mb-3">
                    <Stethoscope className="h-4 w-4" />
                    {member.role}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-base font-bold text-foreground/80 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nursing Staff — text only, no photos */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
            {[
              {
                title: "Старша медицинска сестра",
                description:
                  "Координира и ръководи сестринската дейност в Хоспис Маринела. Следи за точното изпълнение на лекарските предписания, организира графиците на медицинския персонал и осигурява безпроблемното протичане на ежедневните грижи за пациентите.",
              },
              {
                title: "Медицинска сестра",
                description:
                  "Осигурява професионални сестрински грижи денонощно — проследява здравословното състояние на пациентите, изпълнява назначените терапии и поддържа постоянна връзка с лекуващия лекар за навременна реакция при промяна в състоянието.",
              },
            ].map((nurse, i) => (
              <motion.div
                key={nurse.title}
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.12,
                }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-500"
              >
                <div className="inline-flex items-center gap-2 bg-primary/15 text-primary text-sm font-bold px-4 py-2 rounded-full mb-3">
                  <Stethoscope className="h-4 w-4" />
                  {nurse.title}
                </div>
                <p className="text-base font-bold text-foreground/80 leading-relaxed">
                  {nurse.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Team Group Photo */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/85 to-primary/65">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-10"
          >
            <span className="text-primary-foreground font-semibold text-sm uppercase tracking-widest">
              Заедно сме по-силни
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Медицинският екип на Хоспис Маринела
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/30"
          >
            <img
              src="/assets/file_N9RO4H0P4lYgNddWjrQHP4WS"
              alt="Медицински екип на Хоспис Маринела"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
            {/* Subtle overlay with text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10">
              <p className="text-white/90 font-serif text-lg sm:text-2xl font-bold">
                Екипът на Хоспис Маринела
              </p>
              <p className="text-white/70 text-sm sm:text-base mt-1">
                Професионалисти, обединени от обща мисия — грижа с достойнство
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values mini-section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/40 shadow-lg"
          >
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Какво ни отличава
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3 mx-auto" />
            </div>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: HeartHandshake,
                  title: "Съпричастност",
                  text: "Всеки член на нашия екип се грижи за пациентите като за свои близки.",
                },
                {
                  icon: Stethoscope,
                  title: "Професионализъм",
                  text: "Непрекъснато обучение и следване на най-високите медицински стандарти.",
                },
                {
                  icon: Users,
                  title: "Екипност",
                  text: "Работим като едно цяло, за да осигурим най-доброто за пациентите си.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
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
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: i * 0.12,
                  }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                      delay: 0.5 + i * 0.12,
                    }}
                  >
                    <item.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-primary/90 backdrop-blur-md rounded-3xl p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 -ml-8 -mb-8" />

            <p className="text-white/80 text-lg mb-4 relative z-10">
              Имате въпроси или искате да научите повече?
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8 relative z-10">
              Свържете се с нашия екип днес
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
