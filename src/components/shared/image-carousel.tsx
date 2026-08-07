"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carrossel de imagens que exibe a foto inteira (object-contain, sem cortar).
 * Navegação manual por setas e indicadores.
 */
export function ImageCarousel({
  images,
  alt,
  aspectClass = "aspect-[16/9]",
}: {
  images: string[];
  alt: string;
  aspectClass?: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const count = images.length;
  if (count === 0) return null;

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + count) % count);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-navy-950">
      <div className={`relative w-full ${aspectClass}`}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${alt} — imagem ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
          >
            <ChevronRight className="size-6" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Ver imagem ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-orange-500" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
