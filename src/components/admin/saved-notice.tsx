import { CircleCheck } from "lucide-react";

/** Aviso verde de "salvo com sucesso" (mostrado quando ?ok=1). */
export function SavedNotice({ show }: { show?: boolean }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
      <CircleCheck className="size-5" /> Alterações salvas com sucesso.
    </div>
  );
}
