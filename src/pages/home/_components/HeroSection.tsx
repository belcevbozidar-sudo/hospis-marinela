import { Button } from "@/components/ui/button.tsx";
import { motion } from "motion/react";
import { Phone, ChevronDown } from "lucide-react";

const blurUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Building photo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30 aspect-[4/3]">
              <img
                src="/assets/file_lBXpTenPGbaaSA7KeWBi1MjL.webp"
                alt="Сградата на Хоспис Маринела"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="lg:order-1">
            <motion.span
              variants={blurUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-6 shadow-sm"
            >
              Лицензирано лечебно заведение
            </motion.span>

            <motion.h1
              variants={blurUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance"
            >
              {"Хоспис \"Маринела\""}
            </motion.h1>

            <motion.p
              variants={blurUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg sm:text-xl text-white/90 mt-6 leading-relaxed max-w-xl"
            >
              Домът на нашите пациенти. Отговорна и денонощна грижа при спазване
              на най-високи хуманни изисквания и професионални медицински стандарти.
            </motion.p>

            <motion.div
              variants={blurUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("#contact")}
                className="text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-md"
              >
                <Phone className="h-5 w-5 mr-2" />
                Свържете се с нас
              </Button>
              <Button
                size="lg"
                onClick={() => scrollTo("#about")}
                className="text-base px-8"
              >
                Научете повече
              </Button>
            </motion.div>

            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { number: "24/7", label: "Медицинско наблюдение" },
                { number: "60", label: "Легла" },
                { number: "15+", label: "Години опит" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={blurUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollTo("#trust")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
