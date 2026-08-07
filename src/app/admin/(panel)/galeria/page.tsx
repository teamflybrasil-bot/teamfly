import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Images, Video } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ActionForm } from "@/components/admin/action-form";
import { deleteMedia } from "@/server/actions";

export default async function AdminGaleriaPage() {
  const items = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Galeria</h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""} na galeria.
          </p>
        </div>
        <Link
          href="/admin/galeria/novo"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="size-4" /> Nova mídia
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <Images className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Nenhuma mídia cadastrada.</p>
          <Link href="/admin/galeria/novo" className="mt-4 inline-block font-semibold text-orange-500">
            Adicionar a primeira
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-square bg-muted">
                {(m.thumbnail || m.type === "PHOTO") && (
                  <Image src={m.thumbnail || m.url} alt={m.title ?? ""} fill sizes="200px" className="object-cover" />
                )}
                {m.type === "VIDEO" && (
                  <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-full bg-navy-950/70 text-white">
                    <Video className="size-4" />
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium">{m.title || "Sem título"}</p>
                <p className="text-xs text-muted-foreground">{m.year ?? "—"}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Link
                    href={`/admin/galeria/${m.id}`}
                    title="Editar"
                    className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground hover:border-orange-500/40 hover:text-orange-500"
                  >
                    <Pencil className="size-3.5" />
                  </Link>
                  <ActionForm
                    action={deleteMedia}
                    id={m.id}
                    confirm="Excluir esta mídia?"
                    title="Excluir"
                    className="size-8 hover:border-red-500/40 hover:text-red-500"
                  >
                    <Trash2 className="size-3.5" />
                  </ActionForm>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
