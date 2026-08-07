import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ContentBlockForm } from "@/components/admin/content-block-form";

export default async function EditarConteudoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { id } = await params;
  const { returnTo } = await searchParams;
  const back = returnTo || "/admin";
  const b = await prisma.contentBlock.findUnique({ where: { id } });
  if (!b) notFound();

  return (
    <div>
      <Link href={back} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Editar item</h1>
      <ContentBlockForm
        returnTo={back}
        initial={{
          id: b.id,
          section: b.section,
          icon: b.icon ?? undefined,
          title: b.title,
          text: b.text,
          order: String(b.order),
          active: b.active,
        }}
      />
    </div>
  );
}
