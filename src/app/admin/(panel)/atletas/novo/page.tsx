import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AthleteForm } from "@/components/admin/athlete-form";

export default function NovoAtletaPage() {
  return (
    <div>
      <Link href="/admin/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Novo atleta</h1>
      <AthleteForm />
    </div>
  );
}
