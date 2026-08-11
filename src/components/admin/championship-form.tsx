"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveChampionship } from "@/server/actions";
import { sports } from "@/lib/data/sports";

export interface ChampionshipInitial {
  id?: string;
  name?: string;
  modalitySlug?: string;
  status?: string;
  city?: string;
  state?: string;
  venue?: string;
  date?: string;
  time?: string;
  registrationDeadline?: string;
  registrationFee?: string;
  prize?: string;
  organizer?: string;
  description?: string;
  image?: string;
  video?: string;
  regulationPdf?: string;
  phone?: string;
  whatsapp?: string;
  site?: string;
  instagram?: string;
  featured?: boolean;
}

export function ChampionshipForm({ initial = {} }: { initial?: ChampionshipInitial }) {
  const [state, formAction] = useActionState(saveChampionship, {});
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Informações principais</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome do evento" required htmlFor="name" className="sm:col-span-2">
            <Input id="name" name="name" defaultValue={initial.name} required placeholder="Ex: Copa Brasil de Futebol de Base 2026" />
          </Field>
          <Field label="Modalidade" htmlFor="modalitySlug">
            <Select id="modalitySlug" name="modalitySlug" defaultValue={initial.modalitySlug || "futebol"}>
              {sports.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status" htmlFor="status">
            <Select id="status" name="status" defaultValue={initial.status || "ATIVO"}>
              <option value="ATIVO">Ativo (inscrições abertas)</option>
              <option value="FINALIZADO">Finalizado</option>
              <option value="RASCUNHO">Rascunho (não aparece no site)</option>
            </Select>
          </Field>
          <Field label="Cidade" htmlFor="city">
            <Input id="city" name="city" defaultValue={initial.city} />
          </Field>
          <Field label="Estado (UF)" htmlFor="state">
            <Input id="state" name="state" maxLength={2} defaultValue={initial.state} placeholder="SP" />
          </Field>
          <Field label="Local / ginásio" htmlFor="venue" className="sm:col-span-2">
            <Input id="venue" name="venue" defaultValue={initial.venue} />
          </Field>
          <Field label="Data" htmlFor="date">
            <Input id="date" name="date" type="date" defaultValue={initial.date} />
          </Field>
          <Field label="Horário" htmlFor="time">
            <Input id="time" name="time" defaultValue={initial.time} placeholder="09:00" />
          </Field>
          <Field label="Fim das inscrições" htmlFor="registrationDeadline">
            <Input id="registrationDeadline" name="registrationDeadline" type="date" defaultValue={initial.registrationDeadline} />
          </Field>
          <Field label="Valor da inscrição (R$)" htmlFor="registrationFee">
            <Input id="registrationFee" name="registrationFee" type="number" step="0.01" defaultValue={initial.registrationFee} />
          </Field>
          <Field label="Premiação" htmlFor="prize" className="sm:col-span-2">
            <Input id="prize" name="prize" defaultValue={initial.prize} />
          </Field>
          <Field label="Organizador" htmlFor="organizer" className="sm:col-span-2">
            <Input id="organizer" name="organizer" defaultValue={initial.organizer} />
          </Field>
          <Field label="Descrição" htmlFor="description" className="sm:col-span-2">
            <Textarea id="description" name="description" defaultValue={initial.description} />
          </Field>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="featured" defaultChecked={initial.featured} className="size-4 accent-orange-500" />
            Destacar este evento na página inicial
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Mídia</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <ImageUpload name="image" label="Imagem principal" defaultValue={initial.image} hint="1600 × 1000 px (16:10)" />
          <ImageUpload name="regulationPdf" label="Regulamento (PDF)" defaultValue={initial.regulationPdf} />
          <ImageUpload
            name="video"
            kind="video"
            label="Vídeo"
            defaultValue={initial.video}
            hint="Envie um vídeo (MP4/WebM) do seu computador ou cole um link"
            className="sm:col-span-2"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Contato do organizador</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Telefone" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={initial.phone} />
          </Field>
          <Field label="WhatsApp (link)" htmlFor="whatsapp">
            <Input id="whatsapp" name="whatsapp" defaultValue={initial.whatsapp} placeholder="https://wa.me/55..." />
          </Field>
          <Field label="Site" htmlFor="site">
            <Input id="site" name="site" defaultValue={initial.site} />
          </Field>
          <Field label="Instagram" htmlFor="instagram">
            <Input id="instagram" name="instagram" defaultValue={initial.instagram} />
          </Field>
        </div>
      </section>

      <FormError message={state.error} />
      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar evento" />
        <Link href="/admin/eventos" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
