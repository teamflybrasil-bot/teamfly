"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { MultiImageUpload } from "./multi-image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveTeam } from "@/server/actions";
import type { Sport } from "@/types";

export interface TeamInitial {
  id?: string;
  name?: string;
  modalitySlug?: string;
  city?: string;
  state?: string;
  logo?: string;
  cover?: string;
  description?: string;
  instagram?: string;
  site?: string;
  video?: string;
  gallery?: string; // uma URL por linha
  active?: boolean;
  order?: string;
}

export function TeamForm({
  initial = {},
  modalities,
}: {
  initial?: TeamInitial;
  modalities: Sport[];
}) {
  const [state, formAction] = useActionState(saveTeam, {});
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Dados do parceiro</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome" required htmlFor="name" className="sm:col-span-2">
            <Input id="name" name="name" defaultValue={initial.name} required />
          </Field>
          <Field label="Modalidade" htmlFor="modalitySlug">
            <Select id="modalitySlug" name="modalitySlug" defaultValue={initial.modalitySlug || "futebol"}>
              {modalities.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Ordem de exibição" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={initial.order ?? "0"} />
          </Field>
          <Field label="Cidade" htmlFor="city">
            <Input id="city" name="city" defaultValue={initial.city} />
          </Field>
          <Field label="Estado (UF)" htmlFor="state">
            <Input id="state" name="state" maxLength={2} defaultValue={initial.state} placeholder="SP" />
          </Field>
          <Field label="Descrição" htmlFor="description" className="sm:col-span-2">
            <Textarea id="description" name="description" defaultValue={initial.description} />
          </Field>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
            Ativo (visível no site)
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Fotos</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <ImageUpload
            name="logo"
            label="Foto 1 — destaque (quadrado)"
            defaultValue={initial.logo}
            hint="400 × 400 px (quadrada) · aparece no quadrado da página do parceiro e NÃO entra no carrossel"
          />
          <ImageUpload
            name="cover"
            label="Foto 2 — principal (carrossel)"
            defaultValue={initial.cover}
            hint="1600 × 900 px (16:9) · aparece grande e é a 1ª foto do carrossel"
          />
          <MultiImageUpload
            name="gallery"
            label="Demais fotos (carrossel)"
            hint="Envie os arquivos (JPG/PNG) do seu computador — pode selecionar vários de uma vez."
            defaultValue={initial.gallery}
            className="sm:col-span-2"
          />
          <ImageUpload
            name="video"
            kind="video"
            label="Vídeo (opcional)"
            defaultValue={initial.video}
            hint="Envie um vídeo (MP4/WebM) do parceiro ou cole um link"
            className="sm:col-span-2"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Links</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Instagram" htmlFor="instagram">
            <Input id="instagram" name="instagram" defaultValue={initial.instagram} />
          </Field>
          <Field label="Site" htmlFor="site">
            <Input id="site" name="site" defaultValue={initial.site} />
          </Field>
        </div>
      </section>

      <FormError message={state.error} />
      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar parceiro" />
        <Link href="/admin/parceiros" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
