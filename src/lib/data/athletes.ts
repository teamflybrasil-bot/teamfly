import type { Athlete } from "@/types";
import { img } from "./images";

/** Atletas em destaque de exemplo. Em produção vêm do banco via Prisma. */
export const athletes: Athlete[] = [
  {
    id: "a1",
    slug: "marina-alves",
    name: "Marina Alves",
    sportSlug: "corrida-de-rua",
    city: "Rio de Janeiro",
    state: "RJ",
    team: "Rio Runners Elite",
    photo: img("atleta-marina", 800, 1000),
    bio: "Maratonista de elite com melhor marca de 2h31 nos 42k. Representou o Brasil em circuitos internacionais e é referência em provas de rua.",
    achievements: [
      "1º lugar — Maratona do Rio 2025",
      "Top 10 — Maratona de Berlim 2024",
      "Recordista estadual dos 21k",
    ],
    sponsors: ["Fly Sports", "NutriMax", "RunTech"],
    instagram: "https://instagram.com/marina",
    gallery: [img("marina-1", 800, 600), img("marina-2", 800, 600), img("marina-3", 800, 600)],
    featured: true,
  },
  {
    id: "a2",
    slug: "diego-santos",
    name: "Diego Santos",
    sportSlug: "jiu-jitsu",
    city: "Fortaleza",
    state: "CE",
    team: "Gracie Fortaleza",
    photo: img("atleta-diego", 800, 1000),
    bio: "Faixa-preta campeão brasileiro e sul-americano. Competidor de alto nível na categoria pesado, com dezenas de finalizações em campeonatos oficiais.",
    achievements: [
      "Campeão Brasileiro 2025",
      "Campeão Sul-Americano 2024",
      "Vice-campeão Mundial (faixa-marrom) 2023",
    ],
    sponsors: ["Kimono Pro", "TeamFly Brasil"],
    instagram: "https://instagram.com/diego",
    gallery: [img("diego-1", 800, 600), img("diego-2", 800, 600)],
    featured: true,
  },
  {
    id: "a3",
    slug: "juliana-costa",
    name: "Juliana Costa",
    sportSlug: "voleibol",
    city: "Curitiba",
    state: "PR",
    team: "Curitiba Vôlei",
    photo: img("atleta-juliana", 800, 1000),
    bio: "Ponteira titular na Superliga, com passagens pela seleção de base. Destaque em recepção e ataque de fundo.",
    achievements: [
      "Campeã da Superliga B 2025",
      "Convocada para a seleção Sub-21",
      "MVP da etapa Sul 2024",
    ],
    sponsors: ["VolleyGear", "Hidrate"],
    instagram: "https://instagram.com/juliana",
    gallery: [img("juliana-1", 800, 600), img("juliana-2", 800, 600)],
    featured: true,
  },
  {
    id: "a4",
    slug: "rafael-mendes",
    name: "Rafael Mendes",
    sportSlug: "mountain-bike",
    city: "Campos do Jordão",
    state: "SP",
    team: "Serra Bike Team",
    photo: img("atleta-rafael", 800, 1000),
    bio: "Especialista em XCO e provas de maratona de montanha, com pódios no circuito nacional e participação em etapas internacionais.",
    achievements: [
      "Campeão do Circuito Brasileiro de MTB 2025",
      "3º lugar — Copa Internacional XCO 2024",
    ],
    sponsors: ["TrailBike", "PowerFuel", "TeamFly Brasil"],
    instagram: "https://instagram.com/rafael",
    gallery: [img("rafael-1", 800, 600), img("rafael-2", 800, 600)],
    featured: true,
  },
];

export function getAthlete(slug: string): Athlete | undefined {
  return athletes.find((a) => a.slug === slug);
}

export function getFeaturedAthletes(): Athlete[] {
  return athletes.filter((a) => a.featured);
}
