"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Select } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveMedia } from "@/server/actions";
import { sports } from "@/lib/data/sports";

export interface MediaInitial {
  id?: string;
  type?: string;
  title?: string;
  url?: string;
  thumbnail?: string;
  year?: string;
  city?: string;
  modalitySlug?: string;
  championship?: string;
}

export function MediaForm({ initial = {} }: { initial?: MediaInitial }) {
  const [state, formAction] = useActionState(saveMedia, {});
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Mídia</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Tipo" htmlFor="type">
            <Select id="type" name="type" defaultValue={initial.type || "PHOTO"}>
              <option value="PHOTO">Foto</option>
              <option value="VIDEO">Vídeo</option>
            </Select>
          </Field>
          <Field label="Título" htmlFor="title">
            <Input id="title" name="title" defaultValue={initial.title} />
          </Field>
          <ImageUpload name="url" label="Arquivo / URL (foto ou link do vídeo)" defaultValue={initial.url} hint="1200 × 900 px (4:3)" className="sm:col-span-2" />
          <ImageUpload name="thumbnail" label="Miniatura (opcional, ideal para vídeos)" defaultValue={initial.thumbnail} hint="1200 × 900 px (4:3)" className="sm:col-span-2" />
          <Field label="Ano" htmlFor="year">
            <Input id="year" name="year" type="number" defaultValue={initial.year} placeholder="2026" />
          </Field>
          <Field label="Cidade" htmlFor="city">
            <Input id="city" name="city" defaultValue={initial.city} />
          </Field>
          <Field label="Modalidade" htmlFor="modalitySlug">
            <Select id="modalitySlug" name="modalitySlug" defaultValue={initial.modalitySlug || ""}>
              <option value="">— Nenhuma —</option>
              {sports.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Campeonato / evento" htmlFor="championship">
            <Input id="championship" name="championship" defaultValue={initial.championship} />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar mídia" />
        <Link href="/admin/galeria" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
