import Link from "next/link";
import { Plus, Pencil, Trash2, Power, PowerOff, Quote } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionForm } from "@/components/admin/action-form";
import { deleteTestimonial, toggleTestimonialActive } from "@/server/actions";

export default async function AdminDepoimentosPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Depoimentos</h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} depoimento{items.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/depoimentos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="size-4" /> Novo depoimento
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <Quote className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Nenhum depoimento cadastrado.</p>
          <Link href="/admin/depoimentos/novo" className="mt-4 inline-block font-semibold text-orange-500">
            Cadastrar o primeiro
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((t) => (
            <div key={t.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <Quote className="mt-1 size-6 shrink-0 text-orange-500" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm">{t.quote}</p>
                <p className="mt-2 text-sm font-semibold">
                  {t.name}
                  <span className="font-normal text-muted-foreground"> · {t.role}</span>
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    t.active ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.active ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ActionForm action={toggleTestimonialActive} id={t.id} title={t.active ? "Desativar" : "Ativar"}>
                  {t.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                </ActionForm>
                <Link
                  href={`/admin/depoimentos/${t.id}`}
                  title="Editar"
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-orange-500"
                >
                  <Pencil className="size-4" />
                </Link>
                <ActionForm
                  action={deleteTestimonial}
                  id={t.id}
                  confirm={`Excluir o depoimento de "${t.name}"?`}
                  title="Excluir"
                  className="hover:border-red-500/40 hover:text-red-500"
                >
                  <Trash2 className="size-4" />
                </ActionForm>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
