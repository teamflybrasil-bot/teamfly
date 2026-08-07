"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Formulário mínimo que dispara uma server action com um id, opcionalmente confirmando. */
export function ActionForm({
  action,
  id,
  confirm,
  title,
  className,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  confirm?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title={title}
        className={cn(
          "grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-orange-500",
          className,
        )}
      >
        {children}
      </button>
    </form>
  );
}
