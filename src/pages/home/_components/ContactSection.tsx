import { motion } from "motion/react";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ContactLine = {
  text: string;
  href?: string;
};

type ContactItem = {
  icon: LucideIcon;
  title: string;
  lines: ContactLine[];
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Phone,
    title: "Телефон",
    lines: [
      { text: "087 871 05 01", href: "tel:+359878710501" },
      { text: "088 392 04 22", href: "tel:+359883920422" },
    ],
  },
  {
    icon: MapPin,
    title: "Адрес",
    lines: [
      { text: "гр. София, кв. Овча купел" },
      { text: "ул. \"Любляна\" № 34Б" },
    ],
  },
  {
    icon: Clock,
    title: "Работно време",
    lines: [
      { text: "Вт, Чт, Сб, Нд" },
      { text: "16:00 – 19:30 ч." },
    ],
  },
  {
    icon: Mail,
    title: "Онлайн",
    lines: [
      { text: "Facebook: Хоспис Маринела" },
    ],
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Контакти
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
            Свържете се с нас
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          <p className="text-white/90 mt-6 leading-relaxed">
            Не се колебайте да се свържете с нас за повече информация 
            относно настаняване и условия.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {CONTACT_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2 + index * 0.1,
                  }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4"
                >
                  <item.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      className="block text-sm font-medium text-primary hover:underline"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p key={line.text} className="text-sm text-foreground/70">
                      {line.text}
                    </p>
                  ),
                )}
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden shadow-lg border border-white/40 min-h-[300px] lg:min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d23.2564!3d42.6664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ca8d1de65%3A0x1234567890abcdef!2z0KXQvtGB0L_QuNGBINCc0LDRgNC40L3QtdC70LAg!5e0!3m2!1sbg!2sbg!4v1710000000000!5m2!1sbg!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Хоспис Маринела на картата"
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 text-center bg-primary/95 backdrop-blur-md rounded-3xl p-10 sm:p-14 border border-primary/30"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">
            Доверете се на нас
          </h3>
          <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
            Ние сме тук, за да осигурим най-добрата грижа за вашите близки. 
            Свържете се с нас за безплатна консултация.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+359878710501"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-md"
            >
              <Phone className="h-5 w-5" />
              087 871 05 01
            </a>
            <a
              href="tel:+359883920422"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold bg-white text-primary hover:bg-white/90 transition-colors shadow-md"
            >
              <Phone className="h-5 w-5" />
              088 392 04 22
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
