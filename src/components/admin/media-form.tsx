"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Field, Input, Select } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveMedia } from "@/server/actions";
import type { Sport } from "@/types";

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

export function MediaForm({
  initial = {},
  modalities,
}: {
  initial?: MediaInitial;
  modalities: Sport[];
}) {
  const [state, formAction] = useActionState(saveMedia, {});
  const [type, setType] = useState(initial.type || "PHOTO");
  const isVideo = type === "VIDEO";
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Mídia</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Tipo" htmlFor="type">
            <Select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="PHOTO">Foto</option>
              <option value="VIDEO">Vídeo</option>
            </Select>
          </Field>
          <Field label="Título" htmlFor="title">
            <Input id="title" name="title" defaultValue={initial.title} />
          </Field>
          <ImageUpload
            key={type}
            name="url"
            kind={isVideo ? "video" : "image"}
            label={isVideo ? "Vídeo (arquivo ou link)" : "Foto (arquivo ou URL)"}
            defaultValue={initial.url}
            hint={isVideo ? "Envie um vídeo (MP4/WebM) ou cole um link" : "1200 × 900 px (4:3)"}
            className="sm:col-span-2"
          />
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
              {modalities.map((s) => (
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
