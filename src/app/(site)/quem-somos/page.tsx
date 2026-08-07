import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { StatsSection } from "@/components/home/stats-section";
import { Differentials } from "@/components/home/differentials";
import { valores } from "@/lib/data/company";
import { getSettings } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "A Empresa",
  description:
    "A história da TeamFly Brasil — logística aérea especializada para equipes esportivas. Missão, visão e valores de quem viaja para competir.",
};

export default async function QuemSomosPage() {
  const s = await getSettings();
  const historia = (s["about.historia"] || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const missao = s["about.missao"];
  const visao = s["about.visao"];
  const aboutImage = s["about.image"] || "/brand/foto-perfil.png";
  return (
    <>
      <PageHero
        eyebrow="A Empresa"
        title="Logística de quem viaja para competir, não para descansar"
        subtitle="Cuidamos do deslocamento aéreo e operacional de atletas e equipes — do planejamento ao acompanhamento em tempo real."
        breadcrumbs={[{ label: "A Empresa" }]}
      />

      {/* História + fundador */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-4 rounded-full bg-orange-500/15 blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-full border-4 border-orange-500/30">
                  <Image
                    src={aboutImage}
                    alt="Fundador da TeamFly Brasil"
                    fill
                    sizes="(max-width: 1024px) 100vw, 384px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Nossa história"
                title="Nascemos dentro do esporte"
                align="left"
              />
              <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                {historia.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Missão / Visão */}
      <section className="bg-muted py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal as="article">
              <div className="h-full rounded-2xl border-l-4 border-orange-500 bg-card p-8">
                <span className="grid size-14 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Target className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl">Missão</h3>
                <p className="mt-3 text-lg text-muted-foreground">{missao}</p>
              </div>
            </Reveal>
            <Reveal delay={1} as="article">
              <div className="h-full rounded-2xl border-l-4 border-navy-800 bg-card p-8">
                <span className="grid size-14 place-items-center rounded-xl bg-navy-800/10 text-navy-800 dark:text-white">
                  <Eye className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl">Visão</h3>
                <p className="mt-3 text-lg text-muted-foreground">{visao}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Valores */}
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="No que acreditamos" title="Nossos valores" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {valores.map((v, i) => (
              <Reveal key={v.title} delay={i}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-navy-800 text-orange-500">
                    <Icon name={v.icon} className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Diferenciais (o portfólio e a logística integrada ficam no menu Serviços) */}
      <Differentials />

      <StatsSection />
    </>
  );
}
