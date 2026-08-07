import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BannerForm } from "@/components/admin/banner-form";

export default function NovoBannerPage() {
  return (
    <div>
      <Link href="/admin/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Novo banner</h1>
      <BannerForm />
    </div>
  );
}
