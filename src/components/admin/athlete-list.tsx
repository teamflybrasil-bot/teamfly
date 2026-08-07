import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Power, PowerOff, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSport } from "@/lib/data/sports";
import { ActionForm } from "./action-form";
import { deleteAthlete, toggleAthleteActive } from "@/server/actions";

/** Lista editável dos atletas em destaque (embutível no menu Home). */
export async function AthleteList() {
  const athletes = await prisma.athlete.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">Atletas em destaque</h3>
          <p className="text-sm text-muted-foreground">Aparecem na seção de atletas da home.</p>
        </div>
        <Link
          href="/admin/atletas/novo"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" /> Adicionar
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {athletes.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            Nenhum atleta.
          </p>
        ) : (
          athletes.map((a) => {
            const sport = getSport(a.modalitySlug);
            return (
              <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {a.photo && <Image src={a.photo} alt="" fill sizes="48px" className="object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {a.name}
                    {a.featured && <Star className="size-4 fill-orange-500 text-orange-500" />}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {sport?.name ?? a.modalitySlug} · {a.city}/{a.state}
                  </p>
                </div>
                {!a.active && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inativo</span>
                )}
                <div className="flex items-center gap-2">
                  <ActionForm action={toggleAthleteActive} id={a.id} title={a.active ? "Desativar" : "Ativar"}>
                    {a.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                  </ActionForm>
                  <Link
                    href={`/admin/atletas/${a.id}`}
                    title="Editar"
                    className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:border-orange-500/40 hover:text-orange-500"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <ActionForm
                    action={deleteAthlete}
                    id={a.id}
                    confirm={`Excluir o atleta "${a.name}"?`}
                    title="Excluir"
                    className="hover:border-red-500/40 hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </ActionForm>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
