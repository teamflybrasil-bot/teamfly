import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "orange" | "navy" | "muted" | "outline" | "success";

const styles: Record<BadgeVariant, string> = {
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  navy: "bg-navy-800 text-white",
  muted: "bg-muted text-muted-foreground",
  outline: "border border-border text-foreground",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export function Badge({
  className,
  variant = "orange",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
