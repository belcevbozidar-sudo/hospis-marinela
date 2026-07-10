import { Button } from "@/components/ui/button.tsx";
import { motion } from "motion/react";
import { Phone, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Care banner */}
          <div className="relative lg:order-2 hero-zoom [animation-delay:0.3s]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/30 aspect-square">
              <img
                src="/assets/banner-uslugi-denonoshtni-grizhi.webp"
                alt="Денонощни грижи за възрастни и лежащо болни в София — денонощна грижа и наблюдение, професионален медицински екип, уютна среда и човешко отношение в Хоспис Маринела"
                width={1254}
                height={1254}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-6 shadow-sm hero-rise [animation-delay:0.1s]">
              Лицензирано лечебно заведение
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance hero-rise [animation-delay:0.2s]">
              {"Хоспис \"Маринела\""}
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 mt-4">
                Денонощни грижи за възрастни и лежащо болни в София
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mt-6 leading-relaxed max-w-xl hero-rise [animation-delay:0.35s]">
              Домът на нашите пациенти. Отговорна и денонощна грижа при спазване
              на най-високи хуманни изисквания и професионални медицински стандарти.
            </p>

            <div className="flex flex-wrap gap-4 mt-10 hero-rise [animation-delay:0.5s]">
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
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { number: "24/7", label: "Медицинско наблюдение" },
                { number: "60", label: "Легла" },
                { number: "15+", label: "Години опит" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center sm:text-left hero-rise"
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80 mt-1">
                    {stat.label}
                  </div>
                </div>
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
        aria-label="Превърти надолу"
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
