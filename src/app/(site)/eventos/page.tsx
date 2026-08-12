import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { EventsExplorer } from "@/components/events/events-explorer";
import { getChampionships, getModalities } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Todos os campeonatos e eventos esportivos atendidos pela TeamFly Brasil. Filtre por modalidade, status e cidade.",
};

export default async function EventosPage() {
  const championships = await getChampionships();
  const sports = await getModalities();
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Eventos e campeonatos"
        subtitle="Encontre a competição da sua equipe e solicite passagens, hospedagem ou logística completa."
        breadcrumbs={[{ label: "Eventos" }]}
      />
      <section className="py-20">
        <Container>
          <EventsExplorer championships={championships} sports={sports} />
        </Container>
      </section>
    </>
  );
}
