import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do site da TeamFly Brasil.",
};

export default function TermosPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Termos de Uso"
        subtitle="Condições para utilização do site e dos serviços da TeamFly Brasil."
        breadcrumbs={[{ label: "Termos de Uso" }]}
      />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="space-y-8 leading-relaxed text-muted-foreground">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                1. Aceitação
              </h2>
              <p className="mt-3">
                Ao acessar e utilizar este site, você concorda com estes Termos
                de Uso. Caso não concorde, recomendamos não utilizar o site.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                2. Serviços
              </h2>
              <p className="mt-3">
                A TeamFly Brasil oferece serviços de logística aérea esportiva.
                As solicitações de orçamento enviadas pelo site não constituem
                contrato, sendo apenas o início de um atendimento comercial.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                3. Conteúdo
              </h2>
              <p className="mt-3">
                Textos, imagens e marcas presentes neste site pertencem à TeamFly
                Brasil ou a seus respectivos titulares e não podem ser
                reproduzidos sem autorização.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                4. Responsabilidades
              </h2>
              <p className="mt-3">
                Empenhamo-nos para manter as informações atualizadas, mas não nos
                responsabilizamos por eventuais imprecisões em dados de
                campeonatos organizados por terceiros.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                5. Alterações
              </h2>
              <p className="mt-3">
                Estes termos podem ser atualizados a qualquer momento. A versão
                vigente estará sempre disponível nesta página.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
