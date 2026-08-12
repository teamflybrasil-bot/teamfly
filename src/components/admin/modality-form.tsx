"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { SportIcon } from "@/components/shared/sport-icon";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveModality } from "@/server/actions";

// Ícones disponíveis (mapeados em components/shared/sport-icon.tsx).
const ICONS = [
  "Goal", "Volleyball", "Hand", "PersonStanding", "Footprints", "Medal",
  "Bike", "Mountain", "Target", "Droplets", "CircleDot", "Swords", "Shield",
  "Zap", "Flame", "Dumbbell", "Activity", "Sparkles", "Trophy",
];

export interface ModalityInitial {
  slug?: string;
  name?: string;
  icon?: string;
  description?: string;
  order?: number;
  active?: boolean;
}

export function ModalityForm({ initial = {} }: { initial?: ModalityInitial }) {
  const [state, formAction] = useActionState(saveModality, {});
  const [icon, setIcon] = useState(initial.icon || "Trophy");
  return (
    <form action={formAction} className="space-y-8">
      {initial.slug && <input type="hidden" name="slug" value={initial.slug} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Dados da modalidade</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome" required htmlFor="name" className="sm:col-span-2">
            <Input id="name" name="name" defaultValue={initial.name} required placeholder="Ex.: Vôlei de Praia" />
          </Field>

          <Field label="Ícone" htmlFor="icon">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                <SportIcon name={icon} className="size-6" />
              </span>
              <Select id="icon" name="icon" value={icon} onChange={(e) => setIcon(e.target.value)}>
                {ICONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Select>
            </div>
          </Field>

          <Field label="Ordem de exibição" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={initial.order ?? 0} />
          </Field>

          <Field label="Descrição curta" htmlFor="description" className="sm:col-span-2">
            <Textarea id="description" name="description" defaultValue={initial.description} placeholder="Ex.: Etapas de praia e campeonatos nacionais." />
          </Field>

          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
            Ativa (aparece no site e nas opções de cadastro)
          </label>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar modalidade" />
        <Link href="/admin/esportes" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
