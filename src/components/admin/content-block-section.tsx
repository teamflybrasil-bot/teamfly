import Link from "next/link";
import { Plus, Pencil, Trash2, Power, PowerOff } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Icon } from "@/components/shared/icon";
import { ActionForm } from "./action-form";
import { deleteContentBlock, toggleContentBlockActive } from "@/server/actions";

/** Lista editável dos blocos de uma seção (para embutir nos menus do painel). */
export async function ContentBlockSection({
  section,
  title,
  hint,
  returnTo,
}: {
  section: string;
  title: string;
  hint?: string;
  returnTo: string;
}) {
  const items = await prisma.contentBlock.findMany({
    where: { section },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  const enc = encodeURIComponent(returnTo);

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">{title}</h3>
          {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
        </div>
        <Link
          href={`/admin/conteudo/novo?section=${section}&returnTo=${enc}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" /> Adicionar
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            Nenhum item.
          </p>
        ) : (
          items.map((b) => (
            <div key={b.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              {b.icon ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-orange-500">
                  <Icon name={b.icon} className="size-5" />
                </span>
              ) : (
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-800 font-display text-sm text-white">
                  {String(b.order + 1).padStart(2, "0")}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{b.title}</p>
                <p className="truncate text-xs text-muted-foreground">{b.text}</p>
              </div>
              {!b.active && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inativo</span>
              )}
              <div className="flex items-center gap-2">
                <ActionForm action={toggleContentBlockActive} id={b.id} title={b.active ? "Desativar" : "Ativar"}>
                  {b.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                </ActionForm>
                <Link
                  href={`/admin/conteudo/${b.id}?returnTo=${enc}`}
                  title="Editar"
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:border-orange-500/40 hover:text-orange-500"
                >
                  <Pencil className="size-4" />
                </Link>
                <ActionForm
                  action={deleteContentBlock}
                  id={b.id}
                  confirm={`Excluir "${b.title}"?`}
                  title="Excluir"
                  className="hover:border-red-500/40 hover:text-red-500"
                >
                  <Trash2 className="size-4" />
                </ActionForm>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
