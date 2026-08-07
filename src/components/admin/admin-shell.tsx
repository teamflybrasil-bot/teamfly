"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { BrandMark } from "@/components/shared/brand-mark";
import { cn } from "@/lib/utils";

/** Estrutura do painel com sidebar retrátil (drawer) no mobile. */
export function AdminShell({
  userName,
  children,
}: {
  userName: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o drawer ao navegar
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-navy-950/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar: drawer no mobile, fixa no desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <Sidebar userName={userName} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra superior (mobile) */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="grid size-9 place-items-center rounded-lg border border-border"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <BrandMark className="size-7" />
            <span className="font-display text-sm">Painel TeamFly</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
