import { CircleAlert } from "lucide-react";

/** Banner de erro exibido no topo dos formulários do admin. */
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
      <CircleAlert className="mt-0.5 size-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
