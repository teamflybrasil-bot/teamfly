"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contato", {
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
        className="rounded-3xl border border-border bg-card p-10 text-center"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CircleCheck className="size-9" />
        </span>
        <h3 className="mt-6 font-display text-2xl">Mensagem enviada!</h3>
        <p className="mt-2 text-muted-foreground">
          Obrigado pelo contato. Responderemos o mais rápido possível.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
      noValidate
    >
      <input type="text" tabIndex={-1} aria-hidden className="hidden" {...register("website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" required error={errors.name?.message} htmlFor="c-name">
          <Input id="c-name" placeholder="Seu nome" {...register("name")} />
        </Field>
        <Field label="E-mail" required error={errors.email?.message} htmlFor="c-email">
          <Input id="c-email" type="email" placeholder="voce@email.com" {...register("email")} />
        </Field>
        <Field label="Telefone" error={errors.phone?.message} htmlFor="c-phone">
          <Input id="c-phone" placeholder="(00) 00000-0000" {...register("phone")} />
        </Field>
        <Field label="Assunto" required error={errors.subject?.message} htmlFor="c-subject">
          <Input id="c-subject" placeholder="Como podemos ajudar?" {...register("subject")} />
        </Field>
        <Field label="Mensagem" required error={errors.message?.message} htmlFor="c-message" className="sm:col-span-2">
          <Textarea id="c-message" placeholder="Escreva sua mensagem..." {...register("message")} />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
          Erro ao enviar. Tente novamente ou use o WhatsApp.
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Send className="size-5" /> Enviar mensagem
          </>
        )}
      </Button>
    </form>
  );
}
