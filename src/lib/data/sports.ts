import type { Sport } from "@/types";

/**
 * Catálogo de modalidades atendidas pela TeamFly Brasil.
 * `icon` referencia um ícone Lucide mapeado em components/shared/sport-icon.tsx.
 */
export const sports: Sport[] = [
  { slug: "futebol", name: "Futebol", icon: "Goal", description: "Delegações, base e profissional para todo o Brasil." },
  { slug: "futsal", name: "Futsal", icon: "Goal", description: "Ligas e copas nacionais com logística ponta a ponta." },
  { slug: "voleibol", name: "Voleibol", icon: "Volleyball", description: "Quadra e praia, superliga e circuitos regionais." },
  { slug: "basquete", name: "Basquete", icon: "CircleDot", description: "NBB, ligas de base e intercâmbios internacionais." },
  { slug: "handebol", name: "Handebol", icon: "Hand", description: "Seleções e clubes em campeonatos por todo o país." },
  { slug: "atletismo", name: "Atletismo", icon: "PersonStanding", description: "Pista e campo, do regional ao internacional." },
  { slug: "corrida-de-rua", name: "Corrida de Rua", icon: "Footprints", description: "Maratonas e circuitos de rua no Brasil e exterior." },
  { slug: "triathlon", name: "Triathlon", icon: "Medal", description: "Ironman e circuitos com logística de equipamentos." },
  { slug: "ciclismo", name: "Ciclismo", icon: "Bike", description: "Estrada e velódromo com transporte de bikes." },
  { slug: "mountain-bike", name: "Mountain Bike", icon: "Mountain", description: "XCO, maratonas e etapas em terrenos remotos." },
  { slug: "tenis", name: "Tênis", icon: "Target", description: "Circuitos ATP, ITF e torneios juvenis." },
  { slug: "beach-tennis", name: "Beach Tennis", icon: "Droplets", description: "Etapas de praia e campeonatos nacionais." },
  { slug: "tenis-de-mesa", name: "Tênis de Mesa", icon: "CircleDot", description: "Ligas e torneios federados por todo o Brasil." },
  { slug: "judo", name: "Judô", icon: "Swords", description: "Competições federadas, seletivas e mundiais." },
  { slug: "jiu-jitsu", name: "Jiu-Jitsu", icon: "Swords", description: "Campeonatos nacionais e internacionais de BJJ." },
  { slug: "karate", name: "Karatê", icon: "Shield", description: "Circuitos WKF e competições continentais." },
  { slug: "taekwondo", name: "Taekwondo", icon: "Zap", description: "Seletivas olímpicas e opens internacionais." },
  { slug: "muay-thai", name: "Muay Thai", icon: "Flame", description: "Eventos nacionais e camps de treinamento." },
  { slug: "boxe", name: "Boxe", icon: "Hand", description: "Torneios amadores e eventos profissionais." },
  { slug: "natacao", name: "Natação", icon: "Droplets", description: "Troféus, meetings e competições em águas abertas." },
  { slug: "crossfit", name: "Crossfit", icon: "Dumbbell", description: "Throwdowns, sanctionals e competições de box." },
  { slug: "skate", name: "Skate", icon: "Activity", description: "Street, park e circuitos nacionais." },
  { slug: "surf", name: "Surf", icon: "Droplets", description: "Etapas de circuito e viagens de swell." },
  { slug: "ginastica", name: "Ginástica", icon: "Sparkles", description: "Artística, rítmica e trampolim." },
  { slug: "cheerleading", name: "Cheerleading", icon: "Sparkles", description: "Campeonatos e mundiais de cheer." },
  { slug: "outros", name: "Outros", icon: "Trophy", description: "Não achou sua modalidade? Fale com a gente." },
];

export function getSport(slug: string): Sport | undefined {
  return sports.find((s) => s.slug === slug);
}
