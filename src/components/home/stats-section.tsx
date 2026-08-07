import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { CountUp } from "@/components/shared/count-up";
import { stats } from "@/lib/data/content";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600" />
      <Container className="relative">
        <div className="grid gap-8 text-center text-white sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i}>
              <p className="font-display text-5xl sm:text-6xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/80">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
