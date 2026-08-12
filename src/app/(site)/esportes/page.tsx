import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SportsGrid } from "@/components/sports/sports-grid";
import { getActiveChampionships, getModalities } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Esportes",
  description:
    "Todas as modalidades atendidas pela TeamFly Brasil, do futebol às lutas, de maratonas a esportes aquáticos. Encontre os campeonatos ativos da sua modalidade.",
};

export default async function EsportesPage() {
  const active = await getActiveChampionships();
  const sports = await getModalities();
  const counts = active.reduce<Record<string, number>>((acc, c) => {
    acc[c.sportSlug] = (acc[c.sportSlug] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <>
      <PageHero
        eyebrow="Modalidades"
        title="Esportes que a TeamFly atende"
        subtitle="Selecione uma modalidade para ver todos os campeonatos ativos e solicitar sua logística."
        breadcrumbs={[{ label: "Esportes" }]}
      />
      <section className="py-20">
        <Container>
          <SportsGrid sports={sports} counts={counts} />
        </Container>
      </section>
    </>
  );
}
