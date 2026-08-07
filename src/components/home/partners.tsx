import { Container } from "@/components/ui/container";
import { getTeams } from "@/server/data";

/** Faixa de parceiros com marquee infinito (CSS). */
export async function Partners() {
  const teams = await getTeams();
  if (teams.length === 0) return null;
  // Duplica a lista para o loop contínuo do marquee
  const items = [...teams, ...teams, ...teams];

  return (
    <section className="border-y border-border py-12">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Equipes e parceiros que voam com a TeamFly
        </p>
      </Container>
      <div className="group relative mt-8 overflow-hidden">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-16 group-hover:[animation-play-state:paused]">
          {items.map((team, i) => (
            <span
              key={`${team.id}-${i}`}
              className="font-display text-2xl whitespace-nowrap text-muted-foreground/60 transition-colors hover:text-orange-500"
            >
              {team.name}
            </span>
          ))}
        </div>
        {/* Fades laterais */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
