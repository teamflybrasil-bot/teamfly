"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveTestimonial } from "@/server/actions";

export interface TestimonialInitial {
  id?: string;
  name?: string;
  role?: string;
  quote?: string;
  avatar?: string;
  order?: string;
  active?: boolean;
}

export function TestimonialForm({ initial = {} }: { initial?: TestimonialInitial }) {
  const [state, formAction] = useActionState(saveTestimonial, {});
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Depoimento</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome" required htmlFor="name">
            <Input id="name" name="name" defaultValue={initial.name} required />
          </Field>
          <Field label="Cargo / equipe" htmlFor="role">
            <Input id="role" name="role" defaultValue={initial.role} placeholder="Diretor — Clube X" />
          </Field>
          <Field label="Texto do depoimento" required htmlFor="quote" className="sm:col-span-2">
            <Textarea id="quote" name="quote" defaultValue={initial.quote} rows={4} required />
          </Field>
          <ImageUpload name="avatar" label="Foto (opcional)" defaultValue={initial.avatar} hint="400 × 400 px (quadrada)" />
          <Field label="Ordem de exibição" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={initial.order ?? "0"} />
          </Field>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
            Ativo (aparece no site)
          </label>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar depoimento" />
        <Link href="/admin/depoimentos" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
