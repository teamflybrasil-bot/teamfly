import type { Metadata } from "next";
import { Suspense } from "react";
import { CircleCheck, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Solicite um Orçamento",
  description:
    "Solicite um orçamento de logística aérea esportiva para sua equipe, atleta ou evento. Passagens, hospedagem e logística completa com a TeamFly Brasil.",
};

const perks = [
  { icon: Clock, title: "Resposta rápida", text: "Retornamos sua solicitação em pouco tempo." },
  { icon: ShieldCheck, title: "Sem compromisso", text: "Orçamento gratuito e sem obrigação de contratar." },
  { icon: CircleCheck, title: "Sob medida", text: "Plano montado para o tamanho da sua delegação." },
];

export default function OrcamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Orçamento"
        title="Solicite um orçamento"
        subtitle="Preencha os dados abaixo e receba uma proposta de logística personalizada para sua equipe, atleta ou evento."
        breadcrumbs={[{ label: "Solicite um Orçamento" }]}
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-display text-2xl">Por que pedir com a TeamFly?</h2>
              <ul className="mt-6 space-y-5">
                {perks.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                      <p.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-muted" />}>
              <QuoteForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
