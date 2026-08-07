import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { getContentBlocks } from "@/server/data";

export async function HowItWorks() {
  const processo = await getContentBlocks("process");
  if (processo.length === 0) return null;
  return (
    <section className="bg-navy-950 py-24 text-white">
      <Container>
        <SectionHeading
          eyebrow="Processo operacional"
          title="Como trabalhamos"
          description="Do briefing ao pós-viagem, um fluxo enxuto para você focar no que importa: competir."
          light
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {processo.map((item, i) => (
            <Reveal key={item.id ?? item.title} delay={i} as="article">
              <div className="relative">
                <span className="font-display text-6xl text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute left-0 top-4 h-1 w-12 rounded-full bg-orange-500" />
                <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-white/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
