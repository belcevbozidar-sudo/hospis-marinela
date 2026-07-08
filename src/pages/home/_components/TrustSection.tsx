import { motion } from "motion/react";
import { Shield, Clock, Heart, Mountain } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Clock,
    title: "24-часово наблюдение",
    description: "Денонощна медицинска грижа и наблюдение от квалифициран персонал",
  },
  {
    icon: Heart,
    title: "Индивидуална програма",
    description: "Персонализиран план за грижа, съобразен с нуждите на всеки пациент",
  },
  {
    icon: Shield,
    title: "Лицензирано заведение",
    description: "Лицензирано от Министерство на здравеопазването по чл. 40 от ЗЛЗ",
  },
  {
    icon: Mountain,
    title: "Изглед към Витоша",
    description: "Просторна сграда с южно изложение и прекрасна гледка към планината",
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center font-serif text-2xl sm:text-3xl font-bold mb-12 text-white"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)" }}
        >
          Доверете се на нас!
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2 + index * 0.12,
                }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 text-accent mb-4"
              >
                <item.icon className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
