import {
  Goal,
  Volleyball,
  Hand,
  PersonStanding,
  Footprints,
  Medal,
  Bike,
  Mountain,
  Target,
  Droplets,
  CircleDot,
  Swords,
  Shield,
  Zap,
  Flame,
  Dumbbell,
  Activity,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Goal,
  Volleyball,
  Hand,
  PersonStanding,
  Footprints,
  Medal,
  Bike,
  Mountain,
  Target,
  Droplets,
  CircleDot,
  Swords,
  Shield,
  Zap,
  Flame,
  Dumbbell,
  Activity,
  Sparkles,
  Trophy,
};

/** Renderiza o ícone Lucide de uma modalidade, com fallback para Trophy. */
export function SportIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Trophy;
  return <Icon className={cn("size-6", className)} aria-hidden />;
}
