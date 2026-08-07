import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Power, PowerOff } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionForm } from "./action-form";
import { deleteBanner, toggleBannerActive } from "@/server/actions";

/** Lista editável dos banners da home (embutível no menu Home). */
export async function BannerList() {
  const banners = await prisma.banner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">Banners do topo</h3>
          <p className="text-sm text-muted-foreground">
            Aparecem em rotação no topo da home.
          </p>
        </div>
        <Link
          href="/admin/banners/novo"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" /> Adicionar
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {banners.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            Nenhum banner.
          </p>
        ) : (
          banners.map((b) => (
            <div key={b.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={b.image} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{b.title || "(sem título)"}</p>
                <p className="truncate text-xs text-muted-foreground">{b.subtitle || b.badge || "—"}</p>
              </div>
              {!b.active && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Inativo</span>
              )}
              <div className="flex items-center gap-2">
                <ActionForm action={toggleBannerActive} id={b.id} title={b.active ? "Desativar" : "Ativar"}>
                  {b.active ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                </ActionForm>
                <Link
                  href={`/admin/banners/${b.id}`}
                  title="Editar"
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:border-orange-500/40 hover:text-orange-500"
                >
                  <Pencil className="size-4" />
                </Link>
                <ActionForm
                  action={deleteBanner}
                  id={b.id}
                  confirm="Excluir este banner?"
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
