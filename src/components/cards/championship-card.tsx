import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import type { Championship } from "@/types";
import { Badge } from "@/components/ui/badge";
import { getSport } from "@/lib/data/sports";
import { formatDate } from "@/lib/utils";

const statusLabel: Record<Championship["status"], { label: string; variant: "success" | "muted" | "orange" }> = {
  ATIVO: { label: "Inscrições abertas", variant: "success" },
  FINALIZADO: { label: "Finalizado", variant: "muted" },
  RASCUNHO: { label: "Em breve", variant: "orange" },
};

export function ChampionshipCard({ championship }: { championship: Championship }) {
  const sport = getSport(championship.sportSlug);
  const status = statusLabel[championship.status];

  return (
    <Link
      href={`/campeonatos/${championship.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={championship.image}
          alt={championship.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        {sport && (
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-800">
            {sport.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-tight text-foreground transition-colors group-hover:text-orange-500">
          {championship.name}
        </h3>
        <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 text-orange-500" />
            {championship.city} — {championship.state}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 text-orange-500" />
            {formatDate(championship.date)}
          </p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-500">
          Ver detalhes
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
