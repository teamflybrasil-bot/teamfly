import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MediaForm } from "@/components/admin/media-form";

export default async function EditarMidiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await prisma.media.findUnique({ where: { id } });
  if (!m) notFound();

  return (
    <div>
      <Link href="/admin/galeria" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Editar mídia</h1>
      <MediaForm
        initial={{
          id: m.id,
          type: m.type,
          title: m.title ?? undefined,
          url: m.url,
          thumbnail: m.thumbnail ?? undefined,
          year: m.year != null ? String(m.year) : undefined,
          city: m.city ?? undefined,
          modalitySlug: m.modalitySlug ?? undefined,
          championship: m.championship ?? undefined,
        }}
      />
    </div>
  );
}
