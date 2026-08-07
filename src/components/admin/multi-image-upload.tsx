"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, LoaderCircle, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Upload de VÁRIAS imagens (galeria/carrossel). Envia os arquivos para
 * /api/admin/upload e guarda as URLs (uma por linha) num input escondido.
 * Também aceita colar uma URL manualmente.
 */
export function MultiImageUpload({
  name,
  label,
  hint,
  defaultValue = "",
  className,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
  className?: string;
}) {
  const [urls, setUrls] = useState<string[]>(() =>
    defaultValue
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manual, setManual] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError("");
    setLoading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Falha no upload");
        setUrls((prev) => [...prev, data.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function addManual() {
    const v = manual.trim();
    if (v) {
      setUrls((prev) => [...prev, v]);
      setManual("");
    }
  }

  function remove(i: number) {
    setUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input type="hidden" name={name} value={urls.join("\n")} />

      {/* Miniaturas + botão de adicionar */}
      <div className="mt-1 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {urls.map((url, i) => (
          <div key={url + i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={url} alt="" fill sizes="120px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remover foto"
              className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-navy-950/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-orange-500/50 hover:text-orange-500"
        >
          {loading ? (
            <LoaderCircle className="size-6 animate-spin" />
          ) : (
            <span className="flex flex-col items-center gap-1 text-xs">
              <Plus className="size-6" /> Adicionar
            </span>
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFiles}
        className="hidden"
      />

      {/* Colar URL (opcional) */}
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addManual();
            }
          }}
          placeholder="ou cole um endereço de imagem e clique em +"
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-orange-500"
        />
        <button
          type="button"
          onClick={addManual}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-border hover:border-orange-500/40 hover:text-orange-500"
          aria-label="Adicionar URL"
        >
          <ImagePlus className="size-5" />
        </button>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
