import { NextResponse } from "next/server";
import { testimonialSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendMail, htmlTable } from "@/lib/mailer";

export const runtime = "nodejs";

/**
 * Recebe um depoimento enviado por um visitante.
 * Salva como INATIVO (pendente) — só aparece no site após o admin aprovar.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = testimonialSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot anti-spam: se preenchido, finge sucesso e ignora.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  await prisma.testimonial.create({
    data: {
      name: d.name,
      role: d.role,
      quote: d.quote,
      active: false, // pendente de aprovação
    },
  });

  await sendMail({
    subject: `Novo depoimento (pendente) — ${d.name}`,
    html: `
      <h2 style="font-family:Arial,sans-serif;color:#FF6A00">Novo depoimento recebido</h2>
      <p style="font-family:Arial,sans-serif;color:#333">Aprove ou remova em <strong>Painel → Depoimentos</strong>.</p>
      ${htmlTable([
        ["Nome", d.name],
        ["Cargo / Equipe", d.role],
      ])}
      <p style="font-family:Arial,sans-serif;color:#333;max-width:600px;white-space:pre-wrap">${d.quote}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
