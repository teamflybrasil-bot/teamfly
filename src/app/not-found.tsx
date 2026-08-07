import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-navy-950 text-white">
      <Container className="text-center">
        <Plane className="mx-auto size-14 -rotate-45 text-orange-500" />
        <p className="mt-6 font-display text-7xl sm:text-8xl">404</p>
        <h1 className="mt-2 font-display text-3xl">Rota não encontrada</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">
          Parece que este voo não existe. Vamos te levar de volta ao ponto de
          embarque.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Voltar para a Home</ButtonLink>
          <ButtonLink href="/orcamento" variant="outline" className="text-white">
            Solicitar Orçamento
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
