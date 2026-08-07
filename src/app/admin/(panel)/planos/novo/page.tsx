import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlanForm } from "@/components/admin/plan-form";

export default async function NovoPlanoPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { returnTo } = await searchParams;
  const back = returnTo || "/admin/servicos";
  return (
    <div>
      <Link href={back} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Novo plano</h1>
      <PlanForm returnTo={back} />
    </div>
  );
}
