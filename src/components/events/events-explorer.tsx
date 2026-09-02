"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { ChampionshipCard } from "@/components/cards/championship-card";
import { cn } from "@/lib/utils";
import type { Championship, Sport, ChampionshipStatus } from "@/types";

const statusFilters: { value: ChampionshipStatus | "TODOS"; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: "ATIVO", label: "Inscrições abertas" },
  { value: "FINALIZADO", label: "Finalizados" },
];

export function EventsExplorer({
  championships,
  sports,
}: {
  championships: Championship[];
  sports: Sport[];
}) {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("TODOS");
  const [status, setStatus] = useState<ChampionshipStatus | "TODOS">("TODOS");

  // Só modalidades que possuem campeonatos
  const availableSports = useMemo(() => {
    const used = new Set(championships.map((c) => c.sportSlug));
    return sports.filter((s) => used.has(s.slug));
  }, [championships, sports]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return championships
      .filter((c) => {
        const matchQ =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q);
        const matchSport = sport === "TODOS" || c.sportSlug === sport;
        const matchStatus = status === "TODOS" || c.status === status;
        return matchQ && matchSport && matchStatus;
      })
      // Sempre em ordem crescente de data (datas ISO ordenam cronologicamente);
      // desempate estável pelo nome quando a data é a mesma.
      .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
  }, [championships, query, sport, status]);

  return (
    <div>
      {/* Barra de filtros */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-border px-4 py-2.5">
            <Search className="size-5 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou cidade..."
              aria-label="Buscar campeonato"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5">
            <SlidersHorizontal className="size-5 text-muted-foreground" />
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              aria-label="Filtrar por modalidade"
              className="bg-transparent pr-2 outline-none"
            >
              <option value="TODOS">Todas as modalidades</option>
              {availableSports.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                status === f.value
                  ? "bg-orange-500 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} evento{filtered.length !== 1 ? "s" : ""} encontrado
        {filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
            >
              <ChampionshipCard championship={c} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted-foreground">
          Nenhum evento encontrado com os filtros atuais.
        </p>
      )}
    </div>
  );
}
