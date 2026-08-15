import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/shared/brand-mark";

/**
 * Wordmark oficial da TeamFly Brasil. `light` usa texto branco (sobre fundo
 * escuro). Se `src` for informado (logo enviada no painel), exibe a imagem
 * no lugar da marca+texto padrão.
 */
export function Logo({
  light = false,
  className,
  src,
}: {
  light?: boolean;
  className?: string;
  src?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="TeamFly Brasil — página inicial"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      {src ? (
        <Image
          src={src}
          alt="TeamFly Brasil"
          width={240}
          height={64}
          priority
          className="h-11 w-auto max-w-[240px] object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      ) : (
        <>
          <BrandMark className="size-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="flex flex-col leading-[0.95]">
            <span
              className={cn(
                "font-display text-lg tracking-wide",
                light ? "text-white" : "text-foreground",
              )}
            >
              TEAM<span className="text-orange-500">FLY</span>
            </span>
            <span className="font-display text-lg tracking-wide text-orange-500">
              BRASIL
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
