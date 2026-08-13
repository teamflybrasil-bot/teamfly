"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, CirclePlay } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import type { BannerData } from "@/server/data";

function renderTitle(text: string) {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-gradient-orange">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function BannerCarousel({
  banners,
  staticImage,
}: {
  banners: BannerData[];
  staticImage?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = banners.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-rotação do texto (pausa se só houver 1 banner)
  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 10000);
    return () => clearInterval(t);
  }, [count]);

  if (count === 0) return null;
  const b = banners[index];

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Brilhos decorativos */}
      <div className="pointer-events-none absolute -right-40 top-1/4 size-[36rem] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[28rem] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[86vh] w-full max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">
        {/* Texto rotativo (esquerda) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${b.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {b.badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur">
                {b.badge}
              </span>
            )}
            {b.title && (
              <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                {renderTitle(b.title)}
              </h1>
            )}
            {b.subtitle && (
              <p className="mt-6 max-w-xl text-lg text-white/70">
                {b.subtitle}
                {b.tagline && (
                  <span className="mt-2 block font-display text-orange-400">
                    {b.tagline}
                  </span>
                )}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={b.ctaHref || "/orcamento"} size="lg">
                {b.ctaLabel || "Solicitar Orçamento"} <ArrowRight className="size-5" />
              </ButtonLink>
              <ButtonLink href="/quem-somos" size="lg" variant="outline" className="text-white">
                <CirclePlay className="size-5" /> Conheça a TeamFly Brasil
              </ButtonLink>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Imagem estática (direita) */}
        {staticImage && (
          <div className="relative order-first lg:order-last">
            <div className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-full bg-orange-500/20 blur-2xl" />
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border-4 border-white/10 shadow-premium">
              <Image
                src={staticImage}
                alt="TeamFly Brasil"
                fill
                priority
                sizes="(max-width: 1024px) 75vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Controles do texto */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 lg:grid"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo"
            className="absolute right-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 lg:grid"
          >
            <ChevronRight className="size-6" />
          </button>
          <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para o banner ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-orange-500" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
