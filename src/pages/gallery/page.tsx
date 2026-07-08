import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, X, ChevronLeft, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import { breadcrumbSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/gallery");


type GalleryImage = {
  src: string;
  alt: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/assets/file_rPM4Y86HoG1corfQJr2evhfn.webp",
    alt: "Екипът на Хоспис Маринела — празнично събитие",
  },
  {
    src: "/assets/file_VZiUDliUfCEnhBmusAwuhmBF.webp",
    alt: "Екипът на Хоспис Маринела — в стаята на пациент",
  },
  {
    src: "/assets/file_DaF4bPdATFy3jB23tg64vl80.webp",
    alt: "Членове на екипа на Хоспис Маринела",
  },
  {
    src: "/assets/file_m6Hmpzf23wEYuprXEEkGbBWQ.webp",
    alt: "Екипът на Хоспис Маринела заедно",
  },
  {
    src: "/assets/file_Hz5ltdZh64q1oZhjC87pMV3Y.webp",
    alt: "Медицински екип на Хоспис Маринела",
  },
  {
    src: "/assets/file_yPnN0VVow31Vx5wiiU60qotw.webp",
    alt: "Хоспис Маринела — грижа и отдаденост",
  },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % GALLERY_IMAGES.length);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  return (
    <div>
      <JsonLd data={breadcrumbSchema("Галерия", "/gallery")} />
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
              <Link
                to="/"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">Галерия</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Галерия
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-2xl mx-auto text-balance">
              Моменти от ежедневието на Хоспис Маринела — грижа, екипност и
              топлина
            </p>
            <p className="text-base text-white/80 mt-4 max-w-3xl mx-auto leading-relaxed">
              Разгледайте снимки от нашата база в кв. Овча купел, София —
              стаите за настаняване, общите пространства и всекидневието на
              медицинския ни екип. Снимките показват средата, в която полагаме
              денонощни грижи за нашите пациенти.
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY_IMAGES.map((image, i) => (
              <motion.button
                key={image.src}
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
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.1,
                }}
                onClick={() => openLightbox(i)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/30 aspect-[4/3]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              src={GALLERY_IMAGES[selectedIndex].src}
              alt={GALLERY_IMAGES[selectedIndex].alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
