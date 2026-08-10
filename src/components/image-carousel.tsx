import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Ръчна навигация със стрелки — не автоматично прелистване. */
export function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative rounded-xl overflow-hidden bg-muted">
      <div className="aspect-video w-full">
        <img
          src={images[index]}
          alt={`${alt} — снимка ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Предишна снимка"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Следваща снимка"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
