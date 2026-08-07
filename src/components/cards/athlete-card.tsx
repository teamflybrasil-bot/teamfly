import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/shared/social-icons";
import type { Athlete } from "@/types";
import { getSport } from "@/lib/data/sports";

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  const sport = getSport(athlete.sportSlug);

  return (
    <Link
      href={`/atletas/${athlete.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-navy-900"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={athlete.photo}
          alt={athlete.name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        {sport && (
          <span className="inline-block rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-semibold">
            {sport.name}
          </span>
        )}
        <h3 className="mt-2 font-display text-xl">{athlete.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
          <MapPin className="size-3.5" />
          {athlete.city} — {athlete.state}
        </p>
        {athlete.instagram && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/60">
            <InstagramIcon className="size-3.5 text-[#E4405F]" /> Perfil
          </span>
        )}
      </div>
    </Link>
  );
}
