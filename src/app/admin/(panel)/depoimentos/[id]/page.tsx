import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditarDepoimentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <div>
      <Link href="/admin/depoimentos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Editar depoimento</h1>
      <TestimonialForm
        initial={{
          id: t.id,
          name: t.name,
          role: t.role,
          quote: t.quote,
          avatar: t.avatar ?? undefined,
          order: String(t.order),
          active: t.active,
        }}
      />
    </div>
  );
}
