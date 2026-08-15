"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav, ctaNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "@/components/ui/button";

export function Header({ logo }: { logo?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu mobile ao navegar
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Logo src={logo} />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-orange-500",
                  isActive(item.href)
                    ? "text-orange-500"
                    : "text-foreground/80",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-orange-500"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={ctaNav.href}
            size="sm"
            className="hidden md:inline-flex"
          >
            {ctaNav.label}
          </ButtonLink>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-orange-500/10 text-orange-500"
                        : "hover:bg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <ButtonLink href={ctaNav.href} className="w-full">
                  {ctaNav.label}
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
