import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentBlockForm } from "@/components/admin/content-block-form";

export default async function NovoConteudoPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; returnTo?: string }>;
}) {
  const { section, returnTo } = await searchParams;
  const back = returnTo || "/admin";
  return (
    <div>
      <Link href={back} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl">Novo item</h1>
      <ContentBlockForm initial={{ section: section || "differentials" }} returnTo={back} />
    </div>
  );
}
