import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Crumb {
  label: string;
  href?: string;
}

/** Cabeçalho padrão das páginas internas: breadcrumb + título + subtítulo. */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbs = [],
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-28 text-white">
      <div className="pointer-events-none absolute -right-32 -top-24 size-96 rounded-full bg-orange-500/15 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <Container className="relative">
        <nav className="flex items-center gap-1.5 text-sm text-white/50">
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>
          {breadcrumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-orange-400">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
            <span className="h-px w-6 bg-orange-500" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
