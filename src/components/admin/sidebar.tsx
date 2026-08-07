"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Building2,
  Wrench,
  Trophy,
  CalendarDays,
  Images,
  Handshake,
  Quote,
  Mail,
  Inbox,
  UserRound,
  ExternalLink,
} from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { LogoutButton } from "./logout-button";
import { cn } from "@/lib/utils";

// Espelha o menu do site: cada item reúne as ferramentas daquela página.
const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Home", href: "/admin/home", icon: Home },
  { label: "A Empresa", href: "/admin/empresa", icon: Building2 },
  { label: "Serviços", href: "/admin/servicos", icon: Wrench },
  { label: "Esportes", href: "/admin/esportes", icon: Trophy },
  { label: "Eventos", href: "/admin/eventos", icon: CalendarDays },
  { label: "Galeria", href: "/admin/galeria", icon: Images },
  { label: "Parceiros", href: "/admin/parceiros", icon: Handshake },
  { label: "Depoimentos", href: "/admin/depoimentos", icon: Quote },
  { label: "Contato", href: "/admin/contato", icon: Mail },
  { label: "Solicitações", href: "/admin/solicitacoes", icon: Inbox },
];

export function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    // "Serviços" (/admin/servicos) não deve acender em "Solicitações" etc.
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-navy-950 p-4 text-white">
      <div className="flex items-center gap-2.5 px-2 py-3">
        <BrandMark className="size-9" />
        <div className="leading-tight">
          <p className="font-display text-sm">TEAMFLY</p>
          <p className="text-xs text-white/50">Painel administrativo</p>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-orange-500 text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 pt-4">
        <Link
          href="/admin/conta"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            isActive("/admin/conta")
              ? "bg-orange-500 text-white"
              : "text-white/70 hover:bg-white/5 hover:text-white",
          )}
        >
          <UserRound className="size-5" />
          Minha conta
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-5" />
          Ver site
        </Link>
        <LogoutButton />
        <p className="px-3 pt-2 text-xs text-white/40">{userName}</p>
      </div>
    </aside>
  );
}
