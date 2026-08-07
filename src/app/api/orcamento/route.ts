import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendMail, htmlTable } from "@/lib/mailer";

export const runtime = "nodejs";

/**
 * Recebe solicitações de orçamento.
 * Fase 1: valida (Zod) + honeypot. Loga no servidor.
 * Fase 2: persistir via Prisma e enviar e-mail para teamflybrasil@gmail.com.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot preenchido => provável bot. Responde 200 sem processar.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  await prisma.quoteRequest.create({
    data: {
      name: d.name,
      company: d.company || null,
      team: d.team || null,
      document: d.document || null,
      phone: d.phone,
      whatsapp: d.whatsapp || null,
      email: d.email,
      city: d.city,
      state: d.state,
      passengers: d.passengers,
      origin: d.origin,
      destination: d.destination,
      departureDate: d.departureDate ? new Date(d.departureDate) : null,
      returnDate: d.returnDate ? new Date(d.returnDate) : null,
      tripType: d.tripType,
      competition: d.competition || null,
      message: d.message || null,
    },
  });

  // Envia e-mail (se SMTP configurado). Nunca quebra o formulário.
  await sendMail({
    subject: `Novo orçamento — ${d.name} (${d.origin} → ${d.destination})`,
    replyTo: d.email,
    html: `
      <h2 style="font-family:Arial,sans-serif;color:#FF6A00">Nova solicitação de orçamento</h2>
      ${htmlTable([
        ["Nome", d.name],
        ["E-mail", d.email],
        ["Telefone", d.phone],
        ["WhatsApp", d.whatsapp || undefined],
        ["Empresa", d.company || undefined],
        ["Equipe", d.team || undefined],
        ["CPF/CNPJ", d.document || undefined],
        ["Cidade/UF", `${d.city}/${d.state}`],
        ["Passageiros", d.passengers],
        ["Origem", d.origin],
        ["Destino", d.destination],
        ["Ida", d.departureDate || undefined],
        ["Volta", d.returnDate || undefined],
        ["Tipo", d.tripType],
        ["Competição", d.competition || undefined],
        ["Mensagem", d.message || undefined],
      ])}
    `,
  });

  return NextResponse.json({ ok: true });
}
