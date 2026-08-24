import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { SubmitTestimonial } from "@/components/forms/submit-testimonial";
import { getTestimonials } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Depoimentos",
  description:
    "O que clubes, atletas e organizadores dizem sobre a logística esportiva da TeamFly Brasil.",
};

export default async function DepoimentosPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        eyebrow="Depoimentos"
        title="Quem confia na TeamFly"
        subtitle="Clubes, atletas e organizadores que já viajaram com a gente."
        breadcrumbs={[{ label: "Depoimentos" }]}
      />

      <section className="py-20">
        <Container>
          {testimonials.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">
              Nenhum depoimento publicado ainda.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i % 3} as="article">
                  <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                    <Quote className="size-8 text-orange-500" />
                    <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 border-t border-border pt-4">
                      <p className="font-display text-lg text-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SubmitTestimonial />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
