import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { getContentBlocks } from "@/server/data";

export async function ServicesGrid() {
  const servicos = await getContentBlocks("services");
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {servicos.map((s, i) => (
        <Reveal key={s.id ?? s.title} delay={i % 4} as="article">
          <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-card">
            <span className="grid size-12 place-items-center rounded-xl bg-navy-800 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
              <Icon name={s.icon ?? "Sparkles"} className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-lg text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
