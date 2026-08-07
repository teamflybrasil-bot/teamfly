import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PlanForm } from "@/components/admin/plan-form";

function jsonToLines(json: string): string {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.join("\n") : "";
  } catch {
    return "";
  }
}

export default async function EditarPlanoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { id } = await params;
  const { returnTo } = await searchParams;
  const back = returnTo || "/admin/servicos";
  const p = await prisma.plan.findUnique({ where: { id } });
  if (!p) notFound();

  return (
    <div>
      <Link href={back} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Editar plano</h1>
      <PlanForm
        returnTo={back}
        initial={{
          id: p.id,
          name: p.name,
          audience: p.audience ?? undefined,
          price: p.price ?? undefined,
          features: jsonToLines(p.features),
          highlight: p.highlight,
          order: String(p.order),
          active: p.active,
        }}
      />
    </div>
  );
}
