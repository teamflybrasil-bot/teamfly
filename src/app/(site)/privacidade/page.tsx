import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da TeamFly Brasil, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de Privacidade"
        subtitle="Como a TeamFly Brasil coleta, usa e protege seus dados pessoais."
        breadcrumbs={[{ label: "Política de Privacidade" }]}
      />
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="space-y-8 leading-relaxed text-muted-foreground">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                1. Coleta de dados
              </h2>
              <p className="mt-3">
                Coletamos os dados que você nos fornece ao preencher os
                formulários de orçamento e contato, como nome, e-mail, telefone,
                cidade e informações da viagem. Esses dados são usados
                exclusivamente para responder à sua solicitação e prestar nossos
                serviços.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                2. Uso das informações (LGPD)
              </h2>
              <p className="mt-3">
                Em conformidade com a Lei Geral de Proteção de Dados (Lei
                13.709/2018), tratamos seus dados com base no seu consentimento e
                na execução de contrato. Você pode solicitar acesso, correção ou
                exclusão dos seus dados a qualquer momento.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                3. Cookies
              </h2>
              <p className="mt-3">
                Utilizamos cookies essenciais para o funcionamento do site e,
                mediante seu consentimento, cookies de análise para melhorar sua
                experiência. Você pode gerenciar suas preferências no banner de
                cookies.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                4. Compartilhamento
              </h2>
              <p className="mt-3">
                Não vendemos seus dados. Podemos compartilhá-los apenas com
                parceiros necessários à prestação do serviço (companhias aéreas,
                hospedagem), sempre com a devida proteção.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">
                5. Contato do encarregado
              </h2>
              <p className="mt-3">
                Para exercer seus direitos ou tirar dúvidas sobre privacidade,
                entre em contato pelo e-mail{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-orange-500 underline underline-offset-2"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
