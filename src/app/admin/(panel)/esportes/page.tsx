import Link from "next/link";
import { CalendarDays, Trophy } from "lucide-react";
import { sports } from "@/lib/data/sports";

export default function AdminEsportesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Esportes</h1>
        <p className="mt-1 text-muted-foreground">
          A lista de modalidades é padrão do site. Os campeonatos de cada
          modalidade são gerenciados em Eventos.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <Trophy className="size-6 text-orange-500" />
          <h3 className="font-display text-lg">{sports.length} modalidades atendidas</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {sports.map((s) => (
            <span key={s.slug} className="rounded-full bg-muted px-3 py-1 text-sm">
              {s.name}
            </span>
          ))}
        </div>
        <Link
          href="/admin/eventos"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <CalendarDays className="size-4" /> Gerenciar campeonatos (Eventos)
        </Link>
      </div>
    </div>
  );
}
