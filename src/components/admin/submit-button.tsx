"use client";

import { useFormStatus } from "react-dom";
import { Save, LoaderCircle } from "lucide-react";

export function SubmitButton({ label = "Salvar" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
    >
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" /> Salvando...
        </>
      ) : (
        <>
          <Save className="size-4" /> {label}
        </>
      )}
    </button>
  );
}
