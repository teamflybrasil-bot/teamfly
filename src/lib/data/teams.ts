import type { Team } from "@/types";
import { img } from "./images";

/** Equipes parceiras de exemplo. Em produção vêm do banco via Prisma. */
export const teams: Team[] = [
  {
    id: "t1",
    slug: "rio-runners-elite",
    name: "Rio Runners Elite",
    sportSlug: "corrida-de-rua",
    city: "Rio de Janeiro",
    state: "RJ",
    logo: img("logo-rio", 400, 400),
    cover: img("team-rio", 1400, 800),
    description:
      "Assessoria de corrida de elite que reúne maratonistas de alto rendimento. Parceira da TeamFly em provas nacionais e internacionais.",
    instagram: "https://instagram.com/riorunners",
    site: "https://exemplo.com.br",
    gallery: [img("rio-g1", 800, 600), img("rio-g2", 800, 600), img("rio-g3", 800, 600)],
  },
  {
    id: "t2",
    slug: "curitiba-volei",
    name: "Curitiba Vôlei",
    sportSlug: "voleibol",
    city: "Curitiba",
    state: "PR",
    logo: img("logo-cwb", 400, 400),
    cover: img("team-cwb", 1400, 800),
    description:
      "Clube tradicional do voleibol paranaense, com equipes adulto e de base disputando os principais campeonatos do país.",
    instagram: "https://instagram.com/cwbvolei",
    gallery: [img("cwb-g1", 800, 600), img("cwb-g2", 800, 600)],
  },
  {
    id: "t3",
    slug: "gracie-fortaleza",
    name: "Gracie Fortaleza",
    sportSlug: "jiu-jitsu",
    city: "Fortaleza",
    state: "CE",
    logo: img("logo-gf", 400, 400),
    cover: img("team-gf", 1400, 800),
    description:
      "Academia de referência no jiu-jitsu nordestino, formadora de campeões brasileiros e mundiais em diversas faixas.",
    instagram: "https://instagram.com/graciefortaleza",
    gallery: [img("gf-g1", 800, 600), img("gf-g2", 800, 600)],
  },
  {
    id: "t4",
    slug: "serra-bike-team",
    name: "Serra Bike Team",
    sportSlug: "mountain-bike",
    city: "Campos do Jordão",
    state: "SP",
    logo: img("logo-serra", 400, 400),
    cover: img("team-serra", 1400, 800),
    description:
      "Equipe de mountain bike focada em provas de XCO e maratona, com estrutura de ponta para deslocamentos em todo o Brasil.",
    instagram: "https://instagram.com/serrabike",
    site: "https://exemplo.com.br",
    gallery: [img("serra-g1", 800, 600), img("serra-g2", 800, 600)],
  },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}
