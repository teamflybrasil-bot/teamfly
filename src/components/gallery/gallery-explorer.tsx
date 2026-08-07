"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem, Sport } from "@/types";

type TypeFilter = "TODOS" | "PHOTO" | "VIDEO";

const PAGE_SIZE = 8;

export function GalleryExplorer({
  items,
  sports,
  years,
}: {
  items: GalleryItem[];
  sports: Sport[];
  years: number[];
}) {
  const [type, setType] = useState<TypeFilter>("TODOS");
  const [sport, setSport] = useState("TODOS");
  const [year, setYear] = useState("TODOS");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const usedSports = useMemo(() => {
    const set = new Set(items.map((i) => i.sportSlug).filter(Boolean));
    return sports.filter((s) => set.has(s.slug));
  }, [items, sports]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchType = type === "TODOS" || i.type === type;
      const matchSport = sport === "TODOS" || i.sportSlug === sport;
      const matchYear = year === "TODOS" || String(i.year) === year;
      return matchType && matchSport && matchYear;
    });
  }, [items, type, sport, year]);

  const shown = filtered.slice(0, visible);

  const openAt = (id: string) => {
    const idx = filtered.findIndex((i) => i.id === id);
    setLightbox(idx);
  };
  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((v) => (v === null ? v : (v - 1 + filtered.length) % filtered.length));
  const next = () =>
    setLightbox((v) => (v === null ? v : (v + 1) % filtered.length));

  const current = lightbox === null ? null : filtered[lightbox];

  const selectClass =
    "rounded-full border border-border bg-card px-4 py-2 text-sm outline-none";

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-full border border-border bg-card p-1">
          {(["TODOS", "PHOTO", "VIDEO"] as TypeFilter[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setType(t);
                setVisible(PAGE_SIZE);
              }}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                type === t
                  ? "bg-orange-500 text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "TODOS" ? "Tudo" : t === "PHOTO" ? "Fotos" : "Vídeos"}
            </button>
          ))}
        </div>

        <select
          value={sport}
          onChange={(e) => {
            setSport(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          aria-label="Filtrar por modalidade"
          className={selectClass}
        >
          <option value="TODOS">Todas as modalidades</option>
          {usedSports.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          aria-label="Filtrar por ano"
          className={selectClass}
        >
          <option value="TODOS">Todos os anos</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Grid masonry */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => openAt(item.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % PAGE_SIZE) * 0.04 }}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={600}
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-left text-sm font-medium text-white">
                {item.title}
              </span>
            </div>
            {item.type === "VIDEO" && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-14 place-items-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="size-6 fill-white text-white" />
                </span>
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          Nenhum item encontrado com os filtros atuais.
        </p>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-border px-8 py-3 font-semibold transition-colors hover:border-orange-500/40 hover:text-orange-500"
          >
            Carregar mais
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Anterior"
              className="absolute left-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próximo"
              className="absolute right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={current.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {current.type === "VIDEO" ? (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-full rounded-2xl"
                />
              ) : (
                <div className="relative aspect-video w-full">
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="90vw"
                    className="rounded-2xl object-contain"
                  />
                </div>
              )}
              <p className="mt-4 text-center text-white">
                {current.title}
                {current.championship ? ` · ${current.championship}` : ""}
                {current.city ? ` · ${current.city}` : ""} · {current.year}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
