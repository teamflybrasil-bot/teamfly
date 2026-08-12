import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TeamForm } from "@/components/admin/team-form";
import { getModalities } from "@/server/data";

export default async function NovoParceiroPage() {
  const modalities = await getModalities();
  return (
    <div>
      <Link
        href="/admin/parceiros"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para parceiros
      </Link>
      <h1 className="mt-3 font-display text-3xl">Novo parceiro</h1>
      <p className="mt-1 mb-8 text-muted-foreground">
        Cadastre uma equipe, clube ou organizador parceiro.
      </p>
      <TeamForm modalities={modalities} />
    </div>
  );
}
