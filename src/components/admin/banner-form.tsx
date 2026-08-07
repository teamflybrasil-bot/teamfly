"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveBanner } from "@/server/actions";

export interface BannerInitial {
  id?: string;
  image?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  order?: string;
  active?: boolean;
}

export function BannerForm({ initial = {} }: { initial?: BannerInitial }) {
  const [state, formAction] = useActionState(saveBanner, {});
  return (
    <form action={formAction} className="space-y-8">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <FormError message={state.error} />

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Imagem de fundo</h2>
        <div className="mt-4">
          <ImageUpload name="image" label="Imagem do banner (fundo)" defaultValue={initial.image} hint="1920 × 1080 px (16:9, paisagem)" />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Textos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Deixe em branco para exibir só a imagem. Use *texto* para destacar em laranja no título.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Selo (pílula pequena)" htmlFor="badge" className="sm:col-span-2">
            <Input id="badge" name="badge" defaultValue={initial.badge} />
          </Field>
          <Field label="Título" htmlFor="title" className="sm:col-span-2">
            <Textarea id="title" name="title" defaultValue={initial.title} rows={2} placeholder="A logística que leva sua equipe *ao pódio.*" />
          </Field>
          <Field label="Subtítulo" htmlFor="subtitle" className="sm:col-span-2">
            <Textarea id="subtitle" name="subtitle" defaultValue={initial.subtitle} rows={3} />
          </Field>
          <Field label="Assinatura (linha laranja)" htmlFor="tagline">
            <Input id="tagline" name="tagline" defaultValue={initial.tagline} placeholder="Voa junto. Chega forte." />
          </Field>
          <Field label="Ordem" htmlFor="order">
            <Input id="order" name="order" type="number" defaultValue={initial.order ?? "0"} />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg">Botão de ação</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Texto do botão" htmlFor="ctaLabel">
            <Input id="ctaLabel" name="ctaLabel" defaultValue={initial.ctaLabel} placeholder="Solicitar Orçamento" />
          </Field>
          <Field label="Link do botão" htmlFor="ctaHref">
            <Input id="ctaHref" name="ctaHref" defaultValue={initial.ctaHref} placeholder="/orcamento" />
          </Field>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={initial.active ?? true} className="size-4 accent-orange-500" />
            Ativo (aparece na home)
          </label>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton label="Salvar banner" />
        <Link href="/admin/home" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
