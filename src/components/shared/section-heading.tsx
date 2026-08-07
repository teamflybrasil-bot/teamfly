import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

/** Cabeçalho de seção padronizado: eyebrow + título display + descrição. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
            <span className="h-px w-6 bg-orange-500" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2
          className={cn(
            "font-display text-4xl leading-[1.05] sm:text-5xl",
            light ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              light ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
