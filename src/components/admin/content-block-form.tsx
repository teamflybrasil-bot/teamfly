"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { Icon } from "@/components/shared/icon";
import { saveContentBlock } from "@/server/actions";

const iconOptions = [
  "PlaneTakeoff", "Users", "Luggage", "Clock", "ShieldCheck", "Trophy",
  "Target", "Handshake", "Zap", "Gem", "Sparkles", "BadgeCheck", "Ticket",
  "Scale", "FileText", "Globe", "Percent", "Wrench", "ChartColumn", "Network",
  "Bus", "DollarSign", "Building2", "Route", "LifeBuoy", "Gauge",
];

const sectionLabel: Record<string, string> = {
  differentials: "Diferencial",
  services: "Serviço",
  process: "Etapa",
  sla: "Nível de serviço (SLA)",
  coverage: "Abrangência",
  legal: "Bloco jurídico",
};

export interface ContentBlockInitial {
  id?: string;
  section?: string;
  icon?: string;
  title?: string;
  text?: string;
  order?: string;
  active?: boolean;
}

export function ContentBlockForm({
  initial = {},
  returnTo = "/admin",
}: {
  initial?: ContentBlockInitial;
  returnTo?: string;
}) {
  const [state, formAction] = useActionState(saveContentBlock, {});
  const section = initial.section || "differentials";
  const isProcess = ["process", "sla", "coverage", "legal"].includes(section);

  return (
    <form action={formAction} className="space-y-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="section" value={section} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">
          {sectionLabel[section] ?? "Bloco"}
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Título" required htmlFor="title">
            <Input id="title" name="title" defaultValue={initial.title} required />
          </Field>
          <Field label="Ordem" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={initial.order ?? "0"} />
          </Field>
          {!isProcess && (
            <Field label="Ícone" htmlFor="icon" className="sm:col-span-2">
              <Select id="icon" name="icon" defaultValue={initial.icon || "Trophy"}>
                {iconOptions.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Select>
              <span className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                Prévia: <Icon name={initial.icon || "Trophy"} className="size-5 text-orange-500" />
              </span>
            </Field>
          )}
          {isProcess && <input type="hidden" name="icon" value="" />}
          <Field label="Texto" htmlFor="text" className="sm:col-span-2">
            <Textarea id="text" name="text" defaultValue={initial.text} rows={3} />
          </Field>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
            Ativo (aparece no site)
          </label>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar" />
        <Link href={returnTo} className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
