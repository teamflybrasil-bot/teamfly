import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { getContentBlocks } from "@/server/data";

export async function Differentials() {
  const items = await getContentBlocks("differentials");
  if (items.length === 0) return null;
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Por que escolher a TeamFly"
          title="Nossos diferenciais"
          description="Somos especialistas em mover o esporte. Cada detalhe da viagem é pensado para a performance da sua equipe."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id ?? item.title} delay={i} as="article">
              <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-premium">
                <span className="grid size-14 place-items-center rounded-xl bg-orange-500/10 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <Icon name={item.icon ?? "Trophy"} className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
