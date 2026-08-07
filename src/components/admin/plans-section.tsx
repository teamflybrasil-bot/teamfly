import Link from "next/link";
import { Plus, Pencil, Trash2, Power, PowerOff, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionForm } from "./action-form";
import { deletePlan, togglePlanActive } from "@/server/actions";

/** Lista editável dos planos de atendimento (embutível no menu Serviços). */
export async function PlansSection({ returnTo }: { returnTo: string }) {
  const plans = await prisma.plan.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  const enc = encodeURIComponent(returnTo);

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">Planos de atendimento</h3>
          <p className="text-sm text-muted-foreground">Esportista, Clube, Elite…</p>
        </div>
        <Link
          href={`/admin/planos/novo?returnTo=${enc}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" /> Adicionar
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {plans.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            Nenhum plano.
          </p>
        ) : (
          plans.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium">
                  {p.name}
                  {p.highlight && <Star className="size-4 fill-orange-500 text-orange-500" />}
                </p>
                <p className="truncate text-xs text-muted-foreground">{p.audience}</p>
              </div>
              {!p.active && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inativo</span>
              )}
              <div className="flex items-center gap-2">
                <ActionForm action={togglePlanActive} id={p.id} title={p.active ? "Desativar" : "Ativar"}>
                  {p.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                </ActionForm>
                <Link
                  href={`/admin/planos/${p.id}?returnTo=${enc}`}
                  title="Editar"
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:border-orange-500/40 hover:text-orange-500"
                >
                  <Pencil className="size-4" />
                </Link>
                <ActionForm
                  action={deletePlan}
                  id={p.id}
                  confirm={`Excluir o plano "${p.name}"?`}
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
