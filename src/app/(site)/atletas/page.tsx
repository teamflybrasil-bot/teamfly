import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { AthleteCard } from "@/components/cards/athlete-card";
import { getAthletes } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Atletas Destaque",
  description:
    "Atletas que confiam na logística da TeamFly Brasil. Conheça suas conquistas, modalidades e trajetórias.",
};

export default async function AtletasPage() {
  const athletes = await getAthletes();
  return (
    <>
      <PageHero
        eyebrow="Atletas Destaque"
        title="Talentos que voam com a TeamFly"
        subtitle="Do treino ao pódio, cuidamos da logística de atletas de alto rendimento em diversas modalidades."
        breadcrumbs={[{ label: "Atletas Destaque" }]}
      />
      <section className="py-20">
        <Container>
          {athletes.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">
              Nenhum atleta em destaque no momento.
            </p>
          ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {athletes.map((a, i) => (
              <Reveal key={a.id} delay={i % 4}>
                <AthleteCard athlete={a} />
              </Reveal>
            ))}
          </div>
          )}
        </Container>
      </section>
    </>
  );
}
