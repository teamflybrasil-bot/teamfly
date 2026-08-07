"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { savePlan } from "@/server/actions";

export interface PlanInitial {
  id?: string;
  name?: string;
  audience?: string;
  price?: string;
  features?: string; // uma por linha
  highlight?: boolean;
  order?: string;
  active?: boolean;
}

export function PlanForm({
  initial = {},
  returnTo = "/admin/servicos",
}: {
  initial?: PlanInitial;
  returnTo?: string;
}) {
  const [state, formAction] = useActionState(savePlan, {});
  return (
    <form action={formAction} className="space-y-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="returnTo" value={returnTo} />
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Plano</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome" required htmlFor="name">
            <Input id="name" name="name" defaultValue={initial.name} required placeholder="Clube" />
          </Field>
          <Field label="Público" htmlFor="audience">
            <Input id="audience" name="audience" defaultValue={initial.audience} placeholder="Clubes Profissionais" />
          </Field>
          <Field label="Preço / chamada" htmlFor="price">
            <Input id="price" name="price" defaultValue={initial.price ?? "Sob consulta"} />
          </Field>
          <Field label="Ordem" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={initial.order ?? "0"} />
          </Field>
          <Field label="Itens do plano (um por linha)" htmlFor="features" className="sm:col-span-2">
            <Textarea id="features" name="features" defaultValue={initial.features} rows={6} placeholder={"Até 50 passageiros\nVoos nacionais e sul-americanos\nSuporte 24/7"} />
          </Field>
          <div className="flex flex-wrap gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="highlight" defaultChecked={initial.highlight} className="size-4 accent-orange-500" />
              Destacar como “Mais procurado”
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
              Ativo (aparece no site)
            </label>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar plano" />
        <Link href={returnTo} className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
