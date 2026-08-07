import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ChampionshipForm } from "@/components/admin/championship-form";

export default function NovoEventoPage() {
  return (
    <div>
      <Link
        href="/admin/eventos"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para eventos
      </Link>
      <h1 className="mt-3 font-display text-3xl">Novo evento</h1>
      <p className="mt-1 mb-8 text-muted-foreground">
        Preencha os dados do campeonato ou competição.
      </p>
      <ChampionshipForm />
    </div>
  );
}
