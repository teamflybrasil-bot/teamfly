import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { TeamCard } from "@/components/cards/team-card";
import { getTeams } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parceiros",
  description:
    "Clubes e equipes que confiam na logística esportiva da TeamFly Brasil em competições por todo o país.",
};

export default async function EquipesPage() {
  const teams = await getTeams();
  return (
    <>
      <PageHero
        eyebrow="Parceiros"
        title="Quem voa com a TeamFly"
        subtitle="Parcerias de longo prazo com equipes, clubes e organizadores de diversas modalidades e regiões do Brasil."
        breadcrumbs={[{ label: "Parceiros" }]}
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((t, i) => (
              <Reveal key={t.id} delay={i % 3}>
                <TeamCard team={t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
