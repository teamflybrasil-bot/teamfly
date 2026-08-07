import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

/** Retorna true se as variáveis SMTP estão configuradas. */
export function isMailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

function getTransporter(): Transporter | null {
  if (!isMailConfigured()) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false", // 465 = true
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

interface MailInput {
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Envia um e-mail para o destino configurado (CONTACT_TO_EMAIL).
 * Nunca lança: retorna { sent, error } para não quebrar o formulário.
 */
export async function sendMail({
  subject,
  html,
  replyTo,
}: MailInput): Promise<{ sent: boolean; error?: string }> {
  const t = getTransporter();
  if (!t) return { sent: false, error: "SMTP não configurado" };

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  try {
    await t.sendMail({
      from: `"TeamFly Brasil (site)" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      replyTo,
    });
    return { sent: true };
  } catch (e) {
    console.error("[mailer] falha ao enviar:", e);
    return { sent: false, error: e instanceof Error ? e.message : "erro" };
  }
}

/** Monta uma tabela HTML simples a partir de pares chave/valor. */
export function htmlTable(rows: [string, string | number | undefined][]): string {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== "" && v !== null)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#131B2E;border-bottom:1px solid #eee">${k}</td><td style="padding:6px 12px;color:#333;border-bottom:1px solid #eee">${v}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif">${body}</table>`;
}
