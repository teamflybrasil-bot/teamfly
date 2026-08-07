import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  ChampionshipForm,
  type ChampionshipInitial,
} from "@/components/admin/championship-form";

function toDateInput(d: Date | null): string | undefined {
  if (!d) return undefined;
  return d.toISOString().slice(0, 10);
}

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const e = await prisma.championship.findUnique({ where: { id } });
  if (!e) notFound();

  const initial: ChampionshipInitial = {
    id: e.id,
    name: e.name,
    modalitySlug: e.modalitySlug,
    status: e.status,
    city: e.city,
    state: e.state,
    venue: e.venue ?? undefined,
    date: toDateInput(e.date),
    time: e.time ?? undefined,
    registrationDeadline: toDateInput(e.registrationDeadline),
    registrationFee: e.registrationFee != null ? String(e.registrationFee) : undefined,
    prize: e.prize ?? undefined,
    organizer: e.organizer ?? undefined,
    description: e.description ?? undefined,
    image: e.image ?? undefined,
    video: e.video ?? undefined,
    regulationPdf: e.regulationPdf ?? undefined,
    phone: e.phone ?? undefined,
    whatsapp: e.whatsapp ?? undefined,
    site: e.site ?? undefined,
    instagram: e.instagram ?? undefined,
    featured: e.featured,
  };

  return (
    <div>
      <Link
        href="/admin/eventos"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para eventos
      </Link>
      <h1 className="mt-3 font-display text-3xl">Editar evento</h1>
      <p className="mt-1 mb-8 text-muted-foreground">{e.name}</p>
      <ChampionshipForm initial={initial} />
    </div>
  );
}
