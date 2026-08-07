"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  quoteSchema,
  type QuoteInput,
  type QuoteFormValues,
} from "@/lib/validations";

const brazilStates = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export function QuoteForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues, unknown, QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      tripType: "Competição",
      competition: params.get("competicao") ?? "",
    },
  });

  async function onSubmit(data: QuoteInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha no envio");
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
        <h3 className="mt-6 font-display text-2xl">Solicitação enviada!</h3>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Recebemos seu pedido de orçamento. Nossa equipe entrará em contato em
          breve com a melhor proposta de logística para você.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Enviar nova solicitação
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
      {/* Honeypot (escondido) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" required error={errors.name?.message} htmlFor="name">
          <Input id="name" placeholder="Seu nome completo" {...register("name")} />
        </Field>
        <Field label="E-mail" required error={errors.email?.message} htmlFor="email">
          <Input id="email" type="email" placeholder="voce@email.com" {...register("email")} />
        </Field>
        <Field label="Empresa" error={errors.company?.message} htmlFor="company">
          <Input id="company" placeholder="Opcional" {...register("company")} />
        </Field>
        <Field label="Equipe" error={errors.team?.message} htmlFor="team">
          <Input id="team" placeholder="Nome da equipe" {...register("team")} />
        </Field>
        <Field label="CPF / CNPJ" error={errors.document?.message} htmlFor="document">
          <Input id="document" placeholder="Opcional" {...register("document")} />
        </Field>
        <Field label="Telefone" required error={errors.phone?.message} htmlFor="phone">
          <Input id="phone" placeholder="(00) 00000-0000" {...register("phone")} />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp?.message} htmlFor="whatsapp">
          <Input id="whatsapp" placeholder="(00) 00000-0000" {...register("whatsapp")} />
        </Field>
        <div className="grid grid-cols-[1fr_90px] gap-3">
          <Field label="Cidade" required error={errors.city?.message} htmlFor="city">
            <Input id="city" placeholder="Sua cidade" {...register("city")} />
          </Field>
          <Field label="UF" required error={errors.state?.message} htmlFor="state">
            <Select id="state" {...register("state")}>
              <option value="">--</option>
              {brazilStates.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Passageiros" required error={errors.passengers?.message} htmlFor="passengers">
          <Input id="passengers" type="number" min={1} placeholder="Ex: 24" {...register("passengers")} />
        </Field>
        <Field label="Tipo da viagem" required error={errors.tripType?.message} htmlFor="tripType">
          <Select id="tripType" {...register("tripType")}>
            <option value="Competição">Competição</option>
            <option value="Treinamento">Treinamento</option>
            <option value="Evento">Evento</option>
            <option value="Corporativo">Corporativo</option>
          </Select>
        </Field>
        <Field label="Origem" required error={errors.origin?.message} htmlFor="origin">
          <Input id="origin" placeholder="Cidade / aeroporto de origem" {...register("origin")} />
        </Field>
        <Field label="Destino" required error={errors.destination?.message} htmlFor="destination">
          <Input id="destination" placeholder="Cidade / aeroporto de destino" {...register("destination")} />
        </Field>
        <Field label="Data de ida" required error={errors.departureDate?.message} htmlFor="departureDate">
          <Input id="departureDate" type="date" {...register("departureDate")} />
        </Field>
        <Field label="Data de volta" error={errors.returnDate?.message} htmlFor="returnDate">
          <Input id="returnDate" type="date" {...register("returnDate")} />
        </Field>
        <Field label="Competição / evento" error={errors.competition?.message} htmlFor="competition" className="sm:col-span-2">
          <Input id="competition" placeholder="Nome da competição (se houver)" {...register("competition")} />
        </Field>
        <Field label="Mensagem" error={errors.message?.message} htmlFor="message" className="sm:col-span-2">
          <Textarea id="message" placeholder="Conte mais detalhes sobre sua necessidade..." {...register("message")} />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
          Ocorreu um erro ao enviar. Tente novamente ou fale conosco pelo WhatsApp.
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Send className="size-5" /> Solicitar Orçamento
          </>
        )}
      </Button>
    </form>
  );
}
