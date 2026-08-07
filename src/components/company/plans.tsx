import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPlans } from "@/server/data";

export async function Plans() {
  const planos = await getPlans();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {planos.map((plan, i) => (
        <Reveal key={plan.id} delay={i}>
          <div
            className={cn(
              "relative flex h-full flex-col rounded-3xl border p-8",
              plan.highlight
                ? "border-orange-500 bg-navy-900 text-white shadow-premium"
                : "border-border bg-card",
            )}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Mais procurado
              </span>
            )}
            <h3 className="font-display text-3xl">{plan.name}</h3>
            <p
              className={cn(
                "mt-1 text-sm",
                plan.highlight ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {plan.audience}
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-orange-500" />
                  <span className={plan.highlight ? "text-white/90" : ""}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p
                className={cn(
                  "mb-4 text-center font-display text-xl",
                  plan.highlight ? "text-white" : "text-foreground",
                )}
              >
                {plan.price}
              </p>
              <ButtonLink
                href="/orcamento"
                variant={plan.highlight ? "primary" : "outline"}
                className="w-full"
              >
                Solicitar proposta
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
