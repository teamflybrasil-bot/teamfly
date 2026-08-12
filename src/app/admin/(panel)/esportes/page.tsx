import Link from "next/link";
import { Plus, Pencil, Power, PowerOff, Trash2 } from "lucide-react";
import { SportIcon } from "@/components/shared/sport-icon";
import { ActionForm } from "@/components/admin/action-form";
import { getAllModalities } from "@/server/data";
import { deleteModality, toggleModalityActive } from "@/server/actions";

export const dynamic = "force-dynamic";

export default async function AdminEsportesPage() {
  const modalities = await getAllModalities();
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Esportes / Modalidades</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie as modalidades atendidas. Elas aparecem no site e nas
            opções ao cadastrar atletas, eventos e parceiros.
          </p>
        </div>
        <Link
          href="/admin/esportes/nova"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" /> Adicionar modalidade
        </Link>
      </div>

      <div className="space-y-2">
        {modalities.map((m) => (
          <div
            key={m.slug}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
              <SportIcon name={m.icon} className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{m.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {m.description || m.slug}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                m.active
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {m.active ? "Ativa" : "Inativa"}
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <ActionForm
                action={toggleModalityActive}
                id={m.slug}
                title={m.active ? "Desativar" : "Ativar"}
              >
                {m.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
              </ActionForm>
              <Link
                href={`/admin/esportes/${m.slug}`}
                title="Editar"
                className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-orange-500"
              >
                <Pencil className="size-4" />
              </Link>
              <ActionForm
                action={deleteModality}
                id={m.slug}
                confirm={`Excluir a modalidade "${m.name}"? (só é possível se não estiver em uso por eventos, parceiros ou atletas)`}
                title="Excluir"
                className="hover:border-red-500/40 hover:text-red-500"
              >
                <Trash2 className="size-4" />
              </ActionForm>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
