import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MediaForm } from "@/components/admin/media-form";
import { getModalities } from "@/server/data";

export default async function NovaMidiaPage() {
  const modalities = await getModalities();
  return (
    <div>
      <Link href="/admin/galeria" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Nova mídia</h1>
      <MediaForm modalities={modalities} />
    </div>
  );
}
