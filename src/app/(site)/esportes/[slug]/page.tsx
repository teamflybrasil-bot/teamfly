import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarX2 } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { ChampionshipCard } from "@/components/cards/championship-card";
import { ButtonLink } from "@/components/ui/button";
import { SportIcon } from "@/components/shared/sport-icon";
import { getChampionshipsByModality, getModalityMap } from "@/server/data";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sport = (await getModalityMap()).get(slug);
  if (!sport) return { title: "Modalidade não encontrada" };
  return {
    title: `${sport.name} — Campeonatos`,
    description: `Campeonatos de ${sport.name} atendidos pela TeamFly Brasil. ${sport.description}`,
  };
}

export default async function ModalidadePage({ params }: Params) {
  const { slug } = await params;
  const sport = (await getModalityMap()).get(slug);
  if (!sport) notFound();

  const championships = await getChampionshipsByModality(slug);

  return (
    <>
      <PageHero
        eyebrow="Campeonatos"
        title={sport.name}
        subtitle={sport.description}
        breadcrumbs={[
          { label: "Esportes", href: "/esportes" },
          { label: sport.name },
        ]}
      />

      <section className="py-20">
        <Container>
          <div className="mb-10 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-orange-500/10 text-orange-500">
              <SportIcon name={sport.icon} className="size-7" />
            </span>
            <div>
              <h2 className="font-display text-2xl">
                {championships.length > 0
                  ? `${championships.length} campeonato${championships.length > 1 ? "s" : ""}`
                  : "Nenhum campeonato ativo"}
              </h2>
              <p className="text-sm text-muted-foreground">
                em {sport.name} no momento
              </p>
            </div>
          </div>

          {championships.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {championships.map((c, i) => (
                <Reveal key={c.id} delay={i}>
                  <ChampionshipCard championship={c} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-muted/50 py-20 text-center">
              <CalendarX2 className="mx-auto size-12 text-muted-foreground" />
              <h3 className="mt-4 font-display text-2xl">
                Ainda não há campeonatos de {sport.name} cadastrados
              </h3>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Mesmo assim, cuidamos da sua logística. Solicite um orçamento e
                monte sua viagem para qualquer competição.
              </p>
              <ButtonLink href="/orcamento" className="mt-6">
                Solicitar Orçamento
              </ButtonLink>
            </div>
          )}
        </Container>
      </section>

    </>
  );
}
