import { z } from "zod";

/** Schema do formulário "Solicite um Orçamento". */
export const quoteSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  company: z.string().optional().or(z.literal("")),
  team: z.string().optional().or(z.literal("")),
  document: z.string().optional().or(z.literal("")),
  phone: z.string().min(8, "Informe um telefone válido"),
  whatsapp: z.string().optional().or(z.literal("")),
  email: z.string().email("E-mail inválido"),
  city: z.string().min(2, "Informe a cidade"),
  state: z.string().min(2, "UF"),
  passengers: z.coerce
    .number({ message: "Informe um número" })
    .int()
    .min(1, "Mínimo de 1 passageiro"),
  origin: z.string().min(2, "Informe a origem"),
  destination: z.string().min(2, "Informe o destino"),
  departureDate: z.string().min(1, "Informe a data de ida"),
  returnDate: z.string().optional().or(z.literal("")),
  tripType: z.enum(["Competição", "Treinamento", "Evento", "Corporativo"]),
  competition: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  // Honeypot anti-spam (deve ficar vazio)
  website: z.string().max(0).optional().or(z.literal("")),
});

/** Valores brutos do formulário (antes da coerção — usado pelo useForm). */
export type QuoteFormValues = z.input<typeof quoteSchema>;
/** Valores validados/coeridos (após o resolver — recebidos no submit). */
export type QuoteInput = z.output<typeof quoteSchema>;

/** Schema do formulário de Contato. */
export const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(2, "Informe o assunto"),
  message: z.string().min(10, "Escreva sua mensagem (mín. 10 caracteres)"),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Schema do envio de depoimento pelo visitante. */
export const testimonialSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  role: z.string().min(2, "Informe seu cargo, equipe ou clube"),
  quote: z.string().min(10, "Escreva seu depoimento (mín. 10 caracteres)"),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
