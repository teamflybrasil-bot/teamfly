import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { WhatsappIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 text-center text-white sm:px-12">
            <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Pronto para levar sua equipe ao pódio?
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Solicite um orçamento sem compromisso. Nossa equipe responde
                rápido com o melhor plano de logística para você.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/orcamento" size="lg">
                  Solicitar Orçamento <ArrowRight className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.contact.whatsapp}
                  size="lg"
                  variant="white"
                  className="bg-[#25D366] text-white hover:-translate-y-0.5 hover:bg-[#1eb85a]"
                >
                  <WhatsappIcon className="size-5" /> Falar no WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
