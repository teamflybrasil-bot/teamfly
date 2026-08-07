import {
  PlaneTakeoff,
  Users,
  Luggage,
  Clock,
  ShieldCheck,
  Trophy,
  Target,
  Handshake,
  Zap,
  Gem,
  Sparkles,
  BadgeCheck,
  Ticket,
  Scale,
  FileText,
  Globe,
  Percent,
  Wrench,
  ChartColumn,
  Network,
  Bus,
  DollarSign,
  Building2,
  Route,
  LifeBuoy,
  Gauge,
  Baby,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const map: Record<string, LucideIcon> = {
  PlaneTakeoff,
  Users,
  Luggage,
  Clock,
  ShieldCheck,
  Trophy,
  Target,
  Handshake,
  Zap,
  Gem,
  Sparkles,
  BadgeCheck,
  Ticket,
  Scale,
  FileText,
  Globe,
  Percent,
  Wrench,
  ChartColumn,
  Network,
  Bus,
  DollarSign,
  Building2,
  Route,
  LifeBuoy,
  Gauge,
  Baby,
  Stamp,
};

/** Renderiza um ícone Lucide por nome (para dados de conteúdo). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={cn("size-6", className)} aria-hidden />;
}
