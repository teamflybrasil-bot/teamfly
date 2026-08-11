import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Upload direto do navegador para o Vercel Blob (client uploads).
 * Usado para arquivos maiores (ex.: vídeos) que ultrapassam o limite de
 * corpo das funções serverless. Aceita imagens, PDF e vídeos.
 * A autenticação é validada em onBeforeGenerateToken (o webhook de
 * conclusão é chamado pela Vercel sem cookie e não deve exigir sessão).
 */
const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "application/pdf",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getSession();
        if (!session) throw new Error("Não autorizado.");
        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: 200 * 1024 * 1024, // 200 MB
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Nada a fazer — a URL já é devolvida ao cliente.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Falha no upload." },
      { status: 400 },
    );
  }
}
