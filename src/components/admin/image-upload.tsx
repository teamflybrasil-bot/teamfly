"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Campo de imagem: faz upload para /api/admin/upload e guarda a URL num
 * input hidden (name). Aceita também colar uma URL manualmente.
 */
export function ImageUpload({
  name,
  label,
  defaultValue = "",
  hint,
  className,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
  className?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no upload");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {hint && (
        <p className="text-xs text-muted-foreground">
          📐 Tamanho recomendado: {hint} — para a imagem não cortar.
        </p>
      )}
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
          {url ? (
            <Image src={url} alt="" fill sizes="96px" className="object-cover" />
          ) : (
            <span className="grid h-full place-items-center text-muted-foreground">
              <ImagePlus className="size-6" />
            </span>
          )}
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-navy-950/70 text-white"
              aria-label="Remover"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
          >
            {loading ? (
              <>
                <LoaderCircle className="size-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <ImagePlus className="size-4" /> Enviar imagem
              </>
            )}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={onFile}
            className="hidden"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="ou cole um endereço de imagem"
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-orange-500"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
