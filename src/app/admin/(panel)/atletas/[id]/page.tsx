import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AthleteForm } from "@/components/admin/athlete-form";

function jsonToLines(json: string): string {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.join("\n") : "";
  } catch {
    return "";
  }
}

export default async function EditarAtletaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const a = await prisma.athlete.findUnique({ where: { id } });
  if (!a) notFound();

  return (
    <div>
      <Link href="/admin/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Editar atleta</h1>
      <AthleteForm
        initial={{
          id: a.id,
          name: a.name,
          modalitySlug: a.modalitySlug,
          city: a.city,
          state: a.state,
          team: a.team ?? undefined,
          photo: a.photo ?? undefined,
          bio: a.bio ?? undefined,
          achievements: jsonToLines(a.achievements),
          sponsors: jsonToLines(a.sponsors),
          instagram: a.instagram ?? undefined,
          video: a.video ?? undefined,
          gallery: jsonToLines(a.gallery),
          featured: a.featured,
          active: a.active,
        }}
      />
    </div>
  );
}
