import { motion } from "motion/react";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Bus,
  TrainFront,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import { breadcrumbSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/contact");


const TRANSPORT = [
  {
    icon: TrainFront,
    line: "Трамвай 4, 5, 11",
    stop: 'Спирка "кв. Павлово"',
    distance: "850 метра, пеш",
  },
  {
    icon: Bus,
    line: "Автобус 111",
    stop: 'Спирка "бул. Никола Петков"',
    distance: "550 метра, пеш",
  },
  {
    icon: Bus,
    line: "Автобус 60",
    stop: 'Спирка "66-то СОУ"',
    distance: "350 метра, пеш",
  },
];

export default function ContactPage() {

  return (
    <div>
      <JsonLd data={breadcrumbSchema("Контакти", "/contact")} />
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
              <Link
                to="/"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">Контакти</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Контакти
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-2xl mx-auto text-balance">
              Свържете се с нас по телефон, имейл или ни посетете на място
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phone card */}
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 }}
              >
                <Phone className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Телефони
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Прием в Хоспис &laquo;Маринела&raquo; се съгласува лично с
                управителките на хосписа:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Веселка Терзийска
                    </p>
                    <p className="text-xs text-foreground/70">
                      Медицински управител
                    </p>
                    <a
                      href="tel:+359878710501"
                      className="text-sm font-medium text-primary hover:underline mt-0.5 inline-block"
                    >
                      087 871 05 01
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Калина Петрова
                    </p>
                    <p className="text-xs text-foreground/70">
                      Финансов управител
                    </p>
                    <a
                      href="tel:+359883920422"
                      className="text-sm font-medium text-primary hover:underline mt-0.5 inline-block"
                    >
                      088 392 04 22
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email & Viber card */}
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 + 0.12 }}
              >
                <Mail className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Електронна поща и Viber
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Може да ни изпратите съобщение по Viber или с имейл до нашата
                електронна поща:
              </p>
              <a
                href="mailto:office@marinelahospis.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                office@marinelahospis.com
              </a>
              <div className="mt-3">
                <a href="tel:+359878710501" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4 text-[#7360f2]" />
                  Viber: 087 871 05 01
                </a>
              </div>
            </motion.div>

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.24 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 sm:col-span-2 lg:col-span-1"
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 + 0.24 }}
              >
                <MapPin className="h-7 w-7" />
              </motion.div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Адрес
              </h3>
              <p className="text-sm text-foreground font-medium mb-1">
                {'гр. София, кв. Овча купел, ул. "Любляна" № 34Б'}
              </p>
              <div className="flex items-center gap-2 text-xs text-foreground/70 mt-2">
                <Navigation className="h-3.5 w-3.5" />
                <span>GPS: 42.671787, 23.260235</span>
              </div>
              <a
                href="https://maps.google.com/?q=42.671787,23.260235"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-3"
              >
                <MapPin className="h-4 w-4" />
                Отвори в Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-10"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Как да стигнете до нас
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Градски транспорт
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {TRANSPORT.map((item, i) => (
              <motion.div
                key={item.line}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 + i * 0.12 }}
                >
                  <item.icon className="h-6 w-6" />
                </motion.div>
                <p className="font-semibold text-foreground text-sm">
                  {item.line}
                </p>
                <p className="text-xs text-foreground/70 mt-1">
                  {item.stop}
                </p>
                <p className="text-xs text-accent font-medium mt-1">
                  {item.distance}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/30"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.2!2d23.260235!3d42.671787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856a6dba9b6d%3A0x9f8c5d8fa61a3c3e!2z0KXQvtGB0L_QuNGBINCc0LDRgNC40L3QtdC70LAg&#39;MjAwOCDQntCe0JQ!5e0!3m2!1sbg!2sbg!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Хоспис Маринела на картата"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-10"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Бърз контакт
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">
              Свържете се директно
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto" />
          </motion.div>

          <div className="space-y-4">
            {/* Phone 1 */}
            <motion.a
              href="tel:+359878710501"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 cursor-pointer"
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-accent">
                  087 871 05 01
                </p>
                <p className="text-sm text-foreground font-semibold mt-0.5">
                  Веселка Терзийска
                </p>
              </div>
            </motion.a>

            {/* Phone 2 */}
            <motion.a
              href="tel:+359883920422"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 cursor-pointer"
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-accent">
                  088 392 04 22
                </p>
                <p className="text-sm text-foreground font-semibold mt-0.5">
                  Калина Петрова
                </p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:office@marinelahospis.com"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 cursor-pointer"
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                <Mail className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  office@marinelahospis.com
                </p>
                <p className="text-sm text-foreground/70 font-semibold mt-0.5">
                  Електронна поща
                </p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.a
              href="https://maps.google.com/?q=42.671787,23.260235"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300 cursor-pointer"
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {'ул. "Любляна" № 34Б'}
                </p>
                <p className="text-sm text-foreground/70 font-semibold mt-0.5">
                  София, кв. Овча купел
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
