import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BannerForm } from "@/components/admin/banner-form";

export default async function EditarBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const b = await prisma.banner.findUnique({ where: { id } });
  if (!b) notFound();

  return (
    <div>
      <Link href="/admin/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Editar banner</h1>
      <BannerForm
        initial={{
          id: b.id,
          image: b.image ?? undefined,
          badge: b.badge ?? undefined,
          title: b.title ?? undefined,
          subtitle: b.subtitle ?? undefined,
          tagline: b.tagline ?? undefined,
          ctaLabel: b.ctaLabel ?? undefined,
          ctaHref: b.ctaHref ?? undefined,
          order: String(b.order),
          active: b.active,
        }}
      />
    </div>
  );
}
