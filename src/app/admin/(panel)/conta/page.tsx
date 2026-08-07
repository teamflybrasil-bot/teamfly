import { CircleCheck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { PasswordForm } from "@/components/admin/password-form";

export default async function ContaPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const session = await getSession();

  return (
    <div>
      <h1 className="font-display text-3xl">Minha conta</h1>
      <p className="mt-1 mb-6 text-muted-foreground">
        {session?.email} — altere sua senha de acesso.
      </p>

      {ok && (
        <div className="mb-6 flex max-w-md items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
          <CircleCheck className="size-5" /> Senha alterada com sucesso.
        </div>
      )}

      <PasswordForm />
    </div>
  );
}
