import { readFile } from "fs/promises";
import path from "path";
import { UPLOAD_DIR } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
  pdf: "application/pdf",
};

/** Serve arquivos enviados pelo painel (guardados em ./uploads, fora de public). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const safe = path.basename(file); // evita path traversal
  const full = path.join(UPLOAD_DIR, safe);

  try {
    const buffer = await readFile(full);
    const ext = safe.split(".").pop()?.toLowerCase() ?? "";
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Arquivo não encontrado", { status: 404 });
  }
}
