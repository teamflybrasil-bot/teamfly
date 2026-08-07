import type { Championship } from "@/types";
import { img } from "./images";

/** Campeonatos de exemplo. Em produção vêm do banco via Prisma. */
export const championships: Championship[] = [
  {
    id: "c1",
    slug: "copa-brasil-futebol-base-2026",
    name: "Copa Brasil de Futebol de Base 2026",
    sportSlug: "futebol",
    city: "São Paulo",
    state: "SP",
    venue: "Complexo Esportivo Ibirapuera",
    date: "2026-09-12T09:00:00-03:00",
    time: "09:00",
    registrationDeadline: "2026-08-20T23:59:00-03:00",
    registrationFee: 1200,
    prize: "R$ 50.000 + troféus por categoria",
    description:
      "Uma das maiores competições de base do país, reunindo clubes das cinco regiões em disputas Sub-15, Sub-17 e Sub-20. A TeamFly Brasil opera a logística oficial das delegações participantes.",
    organizer: "Confederação Brasileira de Futebol de Base",
    image: img("champ-futebol", 1400, 900),
    status: "ATIVO",
    contact: {
      phone: "(11) 3000-0000",
      whatsapp: "https://wa.me/5511300000000",
      site: "https://exemplo.com.br",
      instagram: "https://instagram.com/copabase",
    },
  },
  {
    id: "c2",
    slug: "maratona-internacional-do-brasil-2026",
    name: "Maratona Internacional do Brasil 2026",
    sportSlug: "corrida-de-rua",
    city: "Rio de Janeiro",
    state: "RJ",
    venue: "Aterro do Flamengo",
    date: "2026-10-05T06:00:00-03:00",
    time: "06:00",
    registrationDeadline: "2026-09-15T23:59:00-03:00",
    registrationFee: 320,
    prize: "Premiação para o pódio geral e por faixa etária",
    description:
      "Percurso à beira-mar com provas de 42k, 21k e 10k. Atletas de elite e amadores de mais de 30 países. Pacotes de logística e hospedagem gerenciados pela TeamFly Brasil.",
    organizer: "Rio Running Series",
    image: img("champ-maratona", 1400, 900),
    status: "ATIVO",
    contact: {
      whatsapp: "https://wa.me/5521999999999",
      site: "https://exemplo.com.br",
      instagram: "https://instagram.com/maratonario",
    },
  },
  {
    id: "c3",
    slug: "superliga-de-voleibol-etapa-sul-2026",
    name: "Superliga de Voleibol — Etapa Sul 2026",
    sportSlug: "voleibol",
    city: "Curitiba",
    state: "PR",
    venue: "Ginásio do Tarumã",
    date: "2026-08-30T18:00:00-03:00",
    time: "18:00",
    registrationDeadline: "2026-08-10T23:59:00-03:00",
    registrationFee: 900,
    prize: "Vaga na fase nacional + R$ 20.000",
    description:
      "Etapa regional classificatória com os principais clubes da região Sul. Transporte de delegações, comissão técnica e equipamentos sob responsabilidade da TeamFly.",
    organizer: "Federação Paranaense de Voleibol",
    image: img("champ-volei", 1400, 900),
    status: "ATIVO",
    contact: {
      phone: "(41) 3200-0000",
      instagram: "https://instagram.com/volei",
    },
  },
  {
    id: "c4",
    slug: "open-nacional-de-jiu-jitsu-2026",
    name: "Open Nacional de Jiu-Jitsu 2026",
    sportSlug: "jiu-jitsu",
    city: "Fortaleza",
    state: "CE",
    venue: "Centro de Formação Olímpica",
    date: "2026-11-22T08:00:00-03:00",
    time: "08:00",
    registrationDeadline: "2026-11-01T23:59:00-03:00",
    registrationFee: 180,
    prize: "Medalhas e ranking nacional",
    description:
      "Competição federada com todas as faixas e categorias, do infantil ao master. Logística de equipes e atletas individuais com tarifas negociadas pela TeamFly Brasil.",
    organizer: "Federação Cearense de Jiu-Jitsu",
    image: img("champ-jiujitsu", 1400, 900),
    status: "ATIVO",
    contact: {
      whatsapp: "https://wa.me/5585988888888",
      instagram: "https://instagram.com/openjj",
    },
  },
  {
    id: "c5",
    slug: "desafio-nacional-de-crossfit-2026",
    name: "Desafio Nacional de Crossfit 2026",
    sportSlug: "crossfit",
    city: "Belo Horizonte",
    state: "MG",
    venue: "Expominas",
    date: "2026-07-18T08:00:00-03:00",
    time: "08:00",
    registrationDeadline: "2026-06-30T23:59:00-03:00",
    registrationFee: 450,
    prize: "R$ 30.000 em premiações",
    description:
      "Competição por equipes e individual com WODs classificatórios. Já finalizado — confira a galeria do evento.",
    organizer: "BH Fitness Events",
    image: img("champ-crossfit", 1400, 900),
    status: "FINALIZADO",
    contact: {
      instagram: "https://instagram.com/desafiocf",
    },
  },
  {
    id: "c6",
    slug: "circuito-brasileiro-de-mtb-etapa-serra-2026",
    name: "Circuito Brasileiro de MTB — Etapa Serra 2026",
    sportSlug: "mountain-bike",
    city: "Campos do Jordão",
    state: "SP",
    venue: "Parque Estadual",
    date: "2026-09-27T07:00:00-03:00",
    time: "07:00",
    registrationDeadline: "2026-09-05T23:59:00-03:00",
    registrationFee: 260,
    prize: "Pódio geral e por categoria",
    description:
      "Etapa de montanha com percursos XCO e maratona. Transporte de atletas e bikes com estrutura dedicada da TeamFly Brasil.",
    organizer: "Circuito Brasileiro de MTB",
    image: img("champ-mtb", 1400, 900),
    status: "ATIVO",
    contact: {
      site: "https://exemplo.com.br",
      instagram: "https://instagram.com/mtbbr",
    },
  },
];

export function getChampionshipsBySport(sportSlug: string): Championship[] {
  return championships.filter((c) => c.sportSlug === sportSlug);
}

export function getChampionship(slug: string): Championship | undefined {
  return championships.find((c) => c.slug === slug);
}

export function getActiveChampionships(): Championship[] {
  return championships.filter((c) => c.status === "ATIVO");
}
