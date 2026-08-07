import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendMail, htmlTable } from "@/lib/mailer";

export const runtime = "nodejs";

/**
 * Recebe mensagens de contato.
 * Fase 1: valida (Zod) + honeypot. Fase 2: Prisma + e-mail.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  await prisma.contactMessage.create({
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      subject: d.subject,
      message: d.message,
    },
  });

  await sendMail({
    subject: `Nova mensagem de contato — ${d.name}: ${d.subject}`,
    replyTo: d.email,
    html: `
      <h2 style="font-family:Arial,sans-serif;color:#FF6A00">Nova mensagem de contato</h2>
      ${htmlTable([
        ["Nome", d.name],
        ["E-mail", d.email],
        ["Telefone", d.phone || undefined],
        ["Assunto", d.subject],
      ])}
      <p style="font-family:Arial,sans-serif;color:#333;max-width:600px;white-space:pre-wrap">${d.message}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
