import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TeamForm, type TeamInitial } from "@/components/admin/team-form";

function galleryToText(json: string): string {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.join("\n") : "";
  } catch {
    return "";
  }
}

export default async function EditarParceiroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await prisma.team.findUnique({ where: { id } });
  if (!t) notFound();

  const initial: TeamInitial = {
    id: t.id,
    name: t.name,
    modalitySlug: t.modalitySlug,
    city: t.city,
    state: t.state,
    logo: t.logo ?? undefined,
    cover: t.cover ?? undefined,
    description: t.description ?? undefined,
    instagram: t.instagram ?? undefined,
    site: t.site ?? undefined,
    video: t.video ?? undefined,
    gallery: galleryToText(t.gallery),
    active: t.active,
    order: String(t.order),
  };

  return (
    <div>
      <Link
        href="/admin/parceiros"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para parceiros
      </Link>
      <h1 className="mt-3 font-display text-3xl">Editar parceiro</h1>
      <p className="mt-1 mb-8 text-muted-foreground">{t.name}</p>
      <TeamForm initial={initial} />
    </div>
  );
}
