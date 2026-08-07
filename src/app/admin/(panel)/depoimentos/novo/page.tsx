import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NovoDepoimentoPage() {
  return (
    <div>
      <Link href="/admin/depoimentos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Novo depoimento</h1>
      <TestimonialForm />
    </div>
  );
}
