import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModalityForm } from "@/components/admin/modality-form";

export default function NovaModalidadePage() {
  return (
    <div>
      <Link
        href="/admin/esportes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para modalidades
      </Link>
      <h1 className="mt-3 font-display text-3xl">Nova modalidade</h1>
      <p className="mt-1 mb-8 text-muted-foreground">
        Cadastre uma nova modalidade esportiva.
      </p>
      <ModalityForm />
    </div>
  );
}
