import Link from "next/link";
import { Plus, Pencil, Trash2, Power, PowerOff, CalendarDays } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSport } from "@/lib/data/sports";
import { formatDate } from "@/lib/utils";
import { ActionForm } from "@/components/admin/action-form";
import { deleteChampionship, toggleChampionshipStatus } from "@/server/actions";

const statusStyle: Record<string, string> = {
  ATIVO: "bg-emerald-500/10 text-emerald-600",
  FINALIZADO: "bg-muted text-muted-foreground",
  RASCUNHO: "bg-orange-500/10 text-orange-600",
};

export default async function AdminEventosPage() {
  const events = await prisma.championship.findMany({ orderBy: { date: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Eventos</h1>
          <p className="mt-1 text-muted-foreground">
            {events.length} evento{events.length !== 1 ? "s" : ""} cadastrado
            {events.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/eventos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="size-4" /> Novo evento
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <CalendarDays className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Nenhum evento cadastrado.</p>
          <Link href="/admin/eventos/novo" className="mt-4 inline-block font-semibold text-orange-500">
            Cadastrar o primeiro
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Evento</th>
                <th className="px-5 py-3 font-medium">Local</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((e) => {
                const sport = getSport(e.modalitySlug);
                return (
                  <tr key={e.id} className="hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <p className="font-medium">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{sport?.name ?? e.modalitySlug}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {e.city}/{e.state}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDate(e.date)}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[e.status] ?? ""}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <ActionForm
                          action={toggleChampionshipStatus}
                          id={e.id}
                          title={e.status === "ATIVO" ? "Desativar" : "Ativar"}
                        >
                          {e.status === "ATIVO" ? (
                            <PowerOff className="size-4" />
                          ) : (
                            <Power className="size-4" />
                          )}
                        </ActionForm>
                        <Link
                          href={`/admin/eventos/${e.id}`}
                          title="Editar"
                          className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-orange-500"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <ActionForm
                          action={deleteChampionship}
                          id={e.id}
                          confirm={`Excluir o evento "${e.name}"? Esta ação não pode ser desfeita.`}
                          title="Excluir"
                          className="hover:border-red-500/40 hover:text-red-500"
                        >
                          <Trash2 className="size-4" />
                        </ActionForm>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
