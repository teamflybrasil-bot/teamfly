"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, Quote, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations";

/** Botão + formulário para o visitante enviar seu depoimento (fica pendente). */
export function SubmitTestimonial() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialInput>({ resolver: zodResolver(testimonialSchema) });

  async function onSubmit(data: TestimonialInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/depoimento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-10 text-center"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CircleCheck className="size-9" />
        </span>
        <h3 className="mt-6 font-display text-2xl">Depoimento enviado!</h3>
        <p className="mt-2 text-muted-foreground">
          Muito obrigado! Seu depoimento será revisado pela nossa equipe antes de
          aparecer no site.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => { setStatus("idle"); setOpen(false); }}>
          Voltar
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {!open ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-orange-500/10 text-orange-500">
            <Quote className="size-6" />
          </span>
          <h3 className="mt-4 font-display text-2xl">Já viajou com a TeamFly?</h3>
          <p className="mt-2 text-muted-foreground">
            Conte como foi a sua experiência — seu depoimento pode aparecer aqui.
          </p>
          <Button size="lg" className="mt-6" onClick={() => setOpen(true)}>
            <Quote className="size-5" /> Deixe seu depoimento
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
            noValidate
          >
            <h3 className="font-display text-2xl">Deixe seu depoimento</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ele passa por uma revisão da nossa equipe antes de aparecer no site.
            </p>

            <input type="text" tabIndex={-1} aria-hidden className="hidden" {...register("website")} />

            <div className="mt-6 grid gap-5">
              <Field label="Nome" required error={errors.name?.message} htmlFor="t-name">
                <Input id="t-name" placeholder="Seu nome" {...register("name")} />
              </Field>
              <Field label="Cargo / Equipe / Clube" required error={errors.role?.message} htmlFor="t-role">
                <Input id="t-role" placeholder="Ex.: Técnico — Clube Atlético" {...register("role")} />
              </Field>
              <Field label="Seu depoimento" required error={errors.quote?.message} htmlFor="t-quote">
                <Textarea id="t-quote" placeholder="Conte como foi sua experiência com a TeamFly Brasil..." {...register("quote")} />
              </Field>
            </div>

            {status === "error" && (
              <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                Erro ao enviar. Tente novamente em instantes.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    <Send className="size-5" /> Enviar depoimento
                  </>
                )}
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
}
