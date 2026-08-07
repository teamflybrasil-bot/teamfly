"use client";

import { CircleAlert, RotateCcw } from "lucide-react";

/** Tela de erro amigável do painel (captura erros inesperados). */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-red-500/10 text-red-500">
          <CircleAlert className="size-7" />
        </span>
        <h2 className="mt-5 font-display text-2xl">Algo deu errado</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "Ocorreu um erro ao processar a operação."}
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <RotateCcw className="size-4" /> Tentar novamente
        </button>
      </div>
    </div>
  );
}
