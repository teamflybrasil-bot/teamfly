import { cn } from "@/lib/utils";

/**
 * Marca TeamFly — círculo laranja com o avião de papel branco (fiel ao logo oficial).
 * Vetorial: nítido em qualquer tamanho e nos dois temas.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("size-9", className)}
      role="img"
      aria-label="TeamFly Brasil"
    >
      <circle cx="50" cy="50" r="50" fill="#FF6A00" />
      {/* Avião de papel: três lâminas brancas partindo de um vértice à esquerda */}
      <g fill="#ffffff">
        <path d="M26 50 L80 24 L57 47 Z" />
        <path d="M26 50 L84 50 L57 53 Z" />
        <path d="M26 50 L80 76 L57 53 Z" />
      </g>
    </svg>
  );
}
