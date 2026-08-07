"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SportIcon } from "@/components/shared/sport-icon";
import type { Sport } from "@/types";

export function SportsGrid({
  sports,
  counts = {},
}: {
  sports: Sport[];
  counts?: Record<string, number>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sports;
    return sports.filter((s) => s.name.toLowerCase().includes(q));
  }, [query, sports]);

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-md items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-card">
        <Search className="size-5 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar modalidade..."
          className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Buscar modalidade"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Nenhuma modalidade encontrada para “{query}”.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((sport, i) => {
            const count = counts[sport.slug] ?? 0;
            return (
              <motion.div
                key={sport.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
              >
                <Link
                  href={`/esportes/${sport.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-premium"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-navy-800 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                      <SportIcon name={sport.icon} className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-500" />
                  </div>
                  <h3 className="mt-5 font-display text-lg text-foreground">
                    {sport.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {sport.description}
                  </p>
                  {count > 0 && (
                    <span className="mt-4 inline-flex w-fit items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
                      {count} campeonato{count > 1 ? "s" : ""} ativo
                      {count > 1 ? "s" : ""}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
