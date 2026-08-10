import { motion } from "motion/react";
import { ChevronRight, Quote, Star, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import {
  breadcrumbSchema,
  reviewsSchema,
} from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";
import { useSiteContent } from "@/lib/site-content.tsx";
import { DEFAULT_REVIEWS } from "@/lib/content-defaults.ts";

export const meta = () => buildMeta("/reviews");

type Review = {
  name: string;
  date: string;
  text: string;
  highlight?: string;
};


const CARD_ACCENTS = [
  "from-emerald-500/10 to-teal-500/5",
  "from-green-500/10 to-emerald-500/5",
  "from-teal-500/10 to-green-500/5",
  "from-lime-500/8 to-emerald-500/5",
  "from-emerald-600/10 to-green-500/5",
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const accentIndex = index % CARD_ACCENTS.length;
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: (index % 3) * 0.12 }}
      className="group relative"
    >
      <div
        className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col bg-gradient-to-br ${CARD_ACCENTS[accentIndex]}`}
      >
        <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" />

        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-accent text-accent"
            />
          ))}
        </div>

        {review.highlight && (
          <p className="text-primary font-serif text-lg sm:text-xl font-semibold italic mb-4 leading-snug">
            {`"${review.highlight}"`}
          </p>
        )}

        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1 whitespace-pre-line">
          {review.text}
        </p>

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-primary/10">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">
              {initials}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm sm:text-base">
              {review.name}
            </p>
            <p className="text-xs text-foreground/60">
              {review.date} • Близък на пациент
            </p>
          </div>
          <Heart className="h-4 w-4 text-red-400/60 ml-auto shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const REVIEWS = useSiteContent("reviews", DEFAULT_REVIEWS);

  return (
    <div>
      <JsonLd
        data={[
          breadcrumbSchema("Отзиви", "/reviews"),
          reviewsSchema(
            REVIEWS.map((r) => ({ author: r.name, text: r.text })),
          ),
        ]}
      />
      
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 font-medium mb-6">
              <Link
                to="/"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-semibold">Отзиви</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Отзиви и мнения
            </h1>
            <p className="text-lg sm:text-xl text-white/95 mt-4 max-w-3xl mx-auto text-balance">
              Отзиви и споделени мнения от семейства и близки на нашите пациенти, публикувани в нашия Google бизнес профил за Хоспис Маринела.
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-10"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">
                {REVIEWS.length}
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Истински отзива
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 sm:h-7 sm:w-7 fill-accent text-accent"
                  />
                ))}
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Отлична оценка (5.0)
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">
                15+
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Години опит и грижа
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured review */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-primary/95 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <Quote className="h-12 w-12 text-white/20 mb-4" />
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed italic">
                {'"Хоспис Маринела (Веселка Терзийска, Кали Петрова и целия персонал) се грижеха за баба изключително добре. Хигиената е на високо ниво – всичко беше чисто и нямаше никаква миризма нито в стаите, нито в коридорите."'}
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="text-lg font-bold">ИИ</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">Илиян Илиев</p>
                  <p className="text-white/70 text-sm">
                    Близък на пациент
                  </p>
                </div>
                <div className="ml-auto hidden sm:flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews masonry grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {REVIEWS.map((review, index) => (
              <div key={review.name + index} className="break-inside-avoid">
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional banner */}
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/30"
          >
            <img
              src="/assets/banner-grizha-s-vnimanie-i-sarce.webp"
              width={1600}
              height={1343}
              loading="lazy"
              decoding="async"
              alt="Не всяка грижа се измерва с лекарства — усмивката, добрата дума, подадената ръка и чувството за сигурност в Хоспис Маринела"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center bg-primary/95 backdrop-blur-md rounded-3xl p-10 sm:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">
                Присъединете се към доволните семейства
              </h3>
              <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
                Свържете се с нас за безплатна консултация и научете как можем
                да помогнем на вашите близки.
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
