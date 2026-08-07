import Image from "next/image";
import { BrandMark } from "./brand-mark";
import { cn } from "@/lib/utils";

/** Chip com a logo TeamFly sobreposto a uma imagem (exemplo de identificação). */
function LogoChip() {
  return (
    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-md">
      <BrandMark className="size-5" />
      <span className="font-display text-xs leading-none text-navy-800">
        TEAM<span className="text-orange-500">FLY</span>
      </span>
    </span>
  );
}

/**
 * Exemplos de frota (avião + ônibus) com a logo TeamFly aplicada.
 * Imagens ilustrativas — troque por fotos reais da operação no painel/CDN.
 */
export function FleetImages({
  airplane = "/brand/aviao-exemplo.jpg",
  bus = "/brand/onibus-exemplo.jpg",
  className,
}: {
  airplane?: string;
  bus?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={airplane}
          alt="Avião com a marca TeamFly"
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover"
        />
        <LogoChip />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={bus}
          alt="Ônibus com a marca TeamFly"
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover"
        />
        <LogoChip />
      </div>
    </div>
  );
}
