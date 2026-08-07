import type { Metadata } from "next";
import { Plane, Bus, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ServicesGrid } from "@/components/company/services-grid";
import { Plans } from "@/components/company/plans";
import { HowItWorks } from "@/components/home/how-it-works";
import { FleetImages } from "@/components/shared/fleet-images";
import { getSettings, getContentBlocks } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Portfólio completo da TeamFly Brasil: passagens, fretamento, check-in, transporte terrestre, logística de equipamentos, assessoria jurídica internacional e gestão de grupos.",
};

export default async function ServicosPage() {
  const s = await getSettings();
  const juridico = await getContentBlocks("legal");
  return (
    <>
      <PageHero
        eyebrow="Nossos serviços"
        title={s["servicos.title"]}
        subtitle={s["servicos.subtitle"]}
        breadcrumbs={[{ label: "Serviços" }]}
      />

      {/* Portfólio */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Portfólio de serviços"
            title="O que a TeamFly faz por você"
          />
          <div className="mt-14">
            <ServicesGrid />
          </div>
        </Container>
      </section>

      {/* Como trabalhamos */}
      <HowItWorks />

      {/* Ar + Terra */}
      <section className="bg-muted py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Logística integrada"
                title={s["servicos.groundTitle"]}
                description={s["servicos.groundText"]}
                align="left"
              />
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Plane, text: "Voo fretado e emissão de passagens em bloco." },
                  { icon: Bus, text: "Ônibus e vans branded do desembarque ao pódio." },
                  { icon: MapPin, text: "Roteiro porta a porta com um único responsável." },
                ].map((p) => (
                  <li key={p.text} className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                      <p.icon className="size-5" />
                    </span>
                    <span className="text-muted-foreground">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={1}>
              <FleetImages airplane={s["fleet.airplane"]} bus={s["fleet.bus"]} />
            </Reveal>
          </div>
        </Container>
      </section>


      {/* Assessoria Jurídica */}
      <section className="bg-navy-950 py-24 text-white">
        <Container>
          <SectionHeading
            eyebrow="Proteção completa"
            title="Assessoria jurídica internacional"
            description="Segurança jurídica em todas as etapas da viagem, especialmente em competições no exterior."
            light
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {juridico.map((block, i) => (
              <Reveal key={block.id ?? block.title} delay={i} as="article">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-orange-500 font-display text-sm text-white">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg">{block.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {block.text
                      .split("\n")
                      .map((it) => it.trim())
                      .filter(Boolean)
                      .map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-orange-500" />
                          {it}
                        </li>
                      ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Planos */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Planos de atendimento"
            title="Pacotes sob medida"
            description="Do time amador à federação, um plano para cada tamanho de delegação."
          />
          <div className="mt-16">
            <Plans />
          </div>
        </Container>
      </section>

    </>
  );
}
