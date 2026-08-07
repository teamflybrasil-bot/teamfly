import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { AthleteCard } from "@/components/cards/athlete-card";
import { getFeaturedAthletes } from "@/server/data";

export async function FeaturedAthletes() {
  const items = (await getFeaturedAthletes()).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="bg-muted py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Atletas em destaque"
            title="Talentos que voam com a gente"
            align="left"
            className="max-w-xl"
          />
          <Link
            href="/atletas"
            className="inline-flex items-center gap-2 font-semibold text-orange-500 transition-all hover:gap-3"
          >
            Ver todos os atletas <ArrowRight className="size-5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a, i) => (
            <Reveal key={a.id} delay={i}>
              <AthleteCard athlete={a} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
