import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Team } from "@/types";
import { getSport } from "@/lib/data/sports";

export function TeamCard({ team }: { team: Team }) {
  const sport = getSport(team.sportSlug);

  return (
    <Link
      href={`/equipes/${team.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={team.cover}
          alt={team.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        <div className="absolute -bottom-6 left-5 size-16 overflow-hidden rounded-xl border-4 border-card bg-white">
          <Image src={team.logo} alt="" fill className="object-cover" sizes="64px" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-8">
        {sport && (
          <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
            {sport.name}
          </span>
        )}
        <h3 className="mt-1 font-display text-lg text-foreground transition-colors group-hover:text-orange-500">
          {team.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 text-orange-500" />
          {team.city} — {team.state}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {team.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-500">
          Ver equipe
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
