"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { MultiImageUpload } from "./multi-image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveAthlete } from "@/server/actions";
import { sports } from "@/lib/data/sports";

export interface AthleteInitial {
  id?: string;
  name?: string;
  modalitySlug?: string;
  city?: string;
  state?: string;
  team?: string;
  photo?: string;
  bio?: string;
  achievements?: string; // uma por linha
  sponsors?: string; // uma por linha
  instagram?: string;
  video?: string;
  gallery?: string; // uma por linha
  featured?: boolean;
  active?: boolean;
}

export function AthleteForm({ initial = {} }: { initial?: AthleteInitial }) {
  const [state, formAction] = useActionState(saveAthlete, {});
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Dados do atleta</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome" required htmlFor="name">
            <Input id="name" name="name" defaultValue={initial.name} required />
          </Field>
          <Field label="Modalidade" htmlFor="modalitySlug">
            <Select id="modalitySlug" name="modalitySlug" defaultValue={initial.modalitySlug || "futebol"}>
              {sports.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Cidade" htmlFor="city">
            <Input id="city" name="city" defaultValue={initial.city} />
          </Field>
          <Field label="Estado (UF)" htmlFor="state">
            <Input id="state" name="state" maxLength={2} defaultValue={initial.state} placeholder="SP" />
          </Field>
          <Field label="Equipe" htmlFor="team">
            <Input id="team" name="team" defaultValue={initial.team} />
          </Field>
          <Field label="Instagram" htmlFor="instagram">
            <Input id="instagram" name="instagram" defaultValue={initial.instagram} />
          </Field>
          <Field label="Biografia" htmlFor="bio" className="sm:col-span-2">
            <Textarea id="bio" name="bio" defaultValue={initial.bio} />
          </Field>
          <Field label="Conquistas (uma por linha)" htmlFor="achievements">
            <Textarea id="achievements" name="achievements" defaultValue={initial.achievements} placeholder={"Campeão Brasileiro 2025\nVice Sul-Americano 2024"} />
          </Field>
          <Field label="Patrocinadores (um por linha)" htmlFor="sponsors">
            <Textarea id="sponsors" name="sponsors" defaultValue={initial.sponsors} />
          </Field>
          <div className="flex flex-wrap gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" defaultChecked={initial.featured ?? true} className="size-4 accent-orange-500" />
              Destaque na home
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
              Ativo (visível no site)
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Mídia</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <ImageUpload name="photo" label="Foto principal" defaultValue={initial.photo} hint="800 × 1000 px (retrato 4:5)" />
          <Field label="Vídeo (URL)" htmlFor="video">
            <Input id="video" name="video" defaultValue={initial.video} placeholder="https://..." />
          </Field>
          <MultiImageUpload
            name="gallery"
            label="Galeria de fotos"
            hint="Envie os arquivos (JPG/PNG) do seu computador — pode selecionar vários de uma vez."
            defaultValue={initial.gallery}
            className="sm:col-span-2"
          />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar atleta" />
        <Link href="/admin/home" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
