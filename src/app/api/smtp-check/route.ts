import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rota de diagnóstico TEMPORÁRIA — remover após configurar o SMTP.
export const runtime = "nodejs";

export async function GET() {
  const host = process.env.SMTP_HOST;
  const info: Record<string, unknown> = {
    hostJson: JSON.stringify(host),
    hostLen: host?.length ?? null,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    userJson: JSON.stringify(process.env.SMTP_USER),
    passSet: Boolean(process.env.SMTP_PASS),
    passLen: process.env.SMTP_PASS?.length ?? null,
    toJson: JSON.stringify(process.env.CONTACT_TO_EMAIL),
  };
  try {
    const t = nodemailer.createTransport({
      host: host?.trim(),
      port: Number((process.env.SMTP_PORT || "465").trim()),
      secure: process.env.SMTP_SECURE?.trim() !== "false",
      auth: {
        user: process.env.SMTP_USER?.trim(),
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });
    await t.verify();
    info.verify = "OK";
  } catch (e) {
    info.verify = "FAIL";
    info.error = e instanceof Error ? e.message : String(e);
  }
  return NextResponse.json(info);
}
