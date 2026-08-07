import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

/** Container central com largura máxima e padding lateral responsivo. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: { as?: T } & ComponentPropsWithoutRef<T>) {
  const Comp = (as ?? "div") as ElementType;
  return (
    <Comp className={cn("mx-auto w-full max-w-7xl px-6", className)} {...props} />
  );
}
