import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30">
              <img
                src="https://images.unsplash.com/photo-1576560665905-28b4d4ea3380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwzfHxjYXJpbmclMjBudXJzZSUyMGVsZGVybHklMjBwYXRpZW50JTIwY29tcGFzc2lvbnxlbnwwfHx8fDE3NzM5NTU5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Грижа за пациенти"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-5 rounded-2xl shadow-xl hidden sm:block"
            >
              <div className="text-3xl font-bold font-serif">15+</div>
              <div className="text-sm opacity-80">Години опит</div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Добре дошли
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
              Вашият дом далеч от дома
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4" />

            <p className="text-white/90 mt-6 leading-relaxed text-base sm:text-lg">
              {"Хоспис Маринела се намира в гр. София, кв. \"Овча купел\", ул. \"Любляна\" № 34Б, в просторна, модерна и функционална сграда с южно изложение и прекрасна гледка към планината Витоша."}
            </p>
            <p className="text-white/90 mt-4 leading-relaxed">
              В Хоспис Маринела ще откриете отговорна и денонощна грижа за 
              пациентите при спазване на най-високи хуманни изисквания и в 
              съответствие с най-високи професионални медицински стандарти и 
              стриктно спазване на всички законни изисквания.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Комфортна домашна обстановка",
                "60 многофункционални легла",
                "Модерно оборудване и апаратура",
                "Здравословна и диетична храна",
                "Собствен санитарен възел, интернет, телевизия",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
