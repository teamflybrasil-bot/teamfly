import Link from "next/link";
import {
  CalendarDays,
  Handshake,
  Users,
  Images,
  FileText,
  Mail,
  Plus,
  Settings,
} from "lucide-react";
import { getDashboardCounts } from "@/server/data";

export default async function AdminDashboard() {
  const c = await getDashboardCounts();

  const stats = [
    { label: "Eventos", sub: `${c.active} ativos`, value: c.championships, icon: CalendarDays, href: "/admin/eventos" },
    { label: "Parceiros", value: c.teams, icon: Handshake, href: "/admin/parceiros" },
    { label: "Atletas", value: c.athletes, icon: Users, href: "/admin/home" },
    { label: "Mídias", value: c.media, icon: Images, href: "/admin/galeria" },
    { label: "Orçamentos", value: c.quotes, icon: FileText, href: "/admin/solicitacoes" },
    { label: "Mensagens", value: c.contacts, icon: Mail, href: "/admin/solicitacoes" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Visão geral do conteúdo do site.
          </p>
        </div>
        <Link
          href="/admin/eventos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="size-4" /> Novo evento
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                <s.icon className="size-5" />
              </span>
              <span className="font-display text-4xl">{s.value}</span>
            </div>
            <p className="mt-4 font-semibold">{s.label}</p>
            {s.sub && <p className="text-sm text-muted-foreground">{s.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/eventos"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-orange-500/40"
        >
          <CalendarDays className="size-6 text-orange-500" />
          <span className="font-medium">Gerenciar eventos</span>
        </Link>
        <Link
          href="/admin/parceiros"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-orange-500/40"
        >
          <Handshake className="size-6 text-orange-500" />
          <span className="font-medium">Gerenciar parceiros</span>
        </Link>
        <Link
          href="/admin/servicos"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-orange-500/40"
        >
          <Settings className="size-6 text-orange-500" />
          <span className="font-medium">Serviços & Planos</span>
        </Link>
      </div>
    </div>
  );
}
