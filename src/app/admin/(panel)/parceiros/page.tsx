import Link from "next/link";
import { Plus, Pencil, Trash2, Power, PowerOff, Handshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSport } from "@/lib/data/sports";
import { ActionForm } from "@/components/admin/action-form";
import { deleteTeam, toggleTeamActive } from "@/server/actions";

export default async function AdminParceirosPage() {
  const teams = await prisma.team.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Parceiros</h1>
          <p className="mt-1 text-muted-foreground">
            {teams.length} parceiro{teams.length !== 1 ? "s" : ""} cadastrado
            {teams.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/parceiros/novo"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="size-4" /> Novo parceiro
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <Handshake className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Nenhum parceiro cadastrado.</p>
          <Link href="/admin/parceiros/novo" className="mt-4 inline-block font-semibold text-orange-500">
            Cadastrar o primeiro
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Parceiro</th>
                <th className="px-5 py-3 font-medium">Local</th>
                <th className="px-5 py-3 font-medium">Situação</th>
                <th className="px-5 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teams.map((t) => {
                const sport = getSport(t.modalitySlug);
                return (
                  <tr key={t.id} className="hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{sport?.name ?? t.modalitySlug}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {t.city}/{t.state}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          t.active
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {t.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <ActionForm
                          action={toggleTeamActive}
                          id={t.id}
                          title={t.active ? "Desativar" : "Ativar"}
                        >
                          {t.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                        </ActionForm>
                        <Link
                          href={`/admin/parceiros/${t.id}`}
                          title="Editar"
                          className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-orange-500"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <ActionForm
                          action={deleteTeam}
                          id={t.id}
                          confirm={`Excluir o parceiro "${t.name}"?`}
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
