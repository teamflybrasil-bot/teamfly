import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ModalityForm } from "@/components/admin/modality-form";

export const dynamic = "force-dynamic";

export default async function EditarModalidadePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = await prisma.modality.findUnique({ where: { slug } });
  if (!m) notFound();

  return (
    <div>
      <Link
        href="/admin/esportes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para modalidades
      </Link>
      <h1 className="mt-3 font-display text-3xl">Editar modalidade</h1>
      <p className="mt-1 mb-8 text-muted-foreground">{m.name}</p>
      <ModalityForm
        initial={{
          slug: m.slug,
          name: m.name,
          icon: m.icon,
          description: m.description ?? undefined,
          order: m.order,
          active: m.active,
        }}
      />
    </div>
  );
}
