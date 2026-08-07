import type { GalleryItem } from "@/types";
import { img } from "./images";

/** Itens da galeria (fotos e vídeos). Em produção vêm do banco via Prisma. */
export const galleryItems: GalleryItem[] = [
  { id: "g1", type: "PHOTO", title: "Delegação a caminho da Copa", src: img("gal-1", 1200, 900), thumbnail: img("gal-1", 600, 450), sportSlug: "futebol", championship: "Copa Brasil de Base", city: "São Paulo", year: 2026 },
  { id: "g2", type: "PHOTO", title: "Largada da maratona", src: img("gal-2", 1200, 900), thumbnail: img("gal-2", 600, 450), sportSlug: "corrida-de-rua", championship: "Maratona Internacional", city: "Rio de Janeiro", year: 2026 },
  { id: "g3", type: "PHOTO", title: "Ataque decisivo", src: img("gal-3", 1200, 900), thumbnail: img("gal-3", 600, 450), sportSlug: "voleibol", championship: "Superliga Etapa Sul", city: "Curitiba", year: 2026 },
  { id: "g4", type: "VIDEO", title: "Bastidores da delegação", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: img("gal-4", 600, 450), sportSlug: "futebol", championship: "Copa Brasil de Base", city: "São Paulo", year: 2026 },
  { id: "g5", type: "PHOTO", title: "Pódio do Open de Jiu-Jitsu", src: img("gal-5", 1200, 900), thumbnail: img("gal-5", 600, 450), sportSlug: "jiu-jitsu", championship: "Open Nacional", city: "Fortaleza", year: 2026 },
  { id: "g6", type: "PHOTO", title: "WOD final do Desafio", src: img("gal-6", 1200, 900), thumbnail: img("gal-6", 600, 450), sportSlug: "crossfit", championship: "Desafio Nacional de Crossfit", city: "Belo Horizonte", year: 2026 },
  { id: "g7", type: "PHOTO", title: "Descida técnica no MTB", src: img("gal-7", 1200, 900), thumbnail: img("gal-7", 600, 450), sportSlug: "mountain-bike", championship: "Circuito Brasileiro de MTB", city: "Campos do Jordão", year: 2026 },
  { id: "g8", type: "PHOTO", title: "Concentração antes do jogo", src: img("gal-8", 1200, 900), thumbnail: img("gal-8", 600, 450), sportSlug: "voleibol", championship: "Superliga Etapa Sul", city: "Curitiba", year: 2025 },
  { id: "g9", type: "VIDEO", title: "Chegada dos atletas de elite", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: img("gal-9", 600, 450), sportSlug: "corrida-de-rua", championship: "Maratona Internacional", city: "Rio de Janeiro", year: 2025 },
  { id: "g10", type: "PHOTO", title: "Embarque da equipe", src: img("gal-10", 1200, 900), thumbnail: img("gal-10", 600, 450), sportSlug: "futebol", city: "São Paulo", year: 2025 },
  { id: "g11", type: "PHOTO", title: "Treino de base", src: img("gal-11", 1200, 900), thumbnail: img("gal-11", 600, 450), sportSlug: "basquete", city: "São Paulo", year: 2024 },
  { id: "g12", type: "PHOTO", title: "Cerimônia de premiação", src: img("gal-12", 1200, 900), thumbnail: img("gal-12", 600, 450), sportSlug: "jiu-jitsu", city: "Fortaleza", year: 2024 },
];

export const galleryYears = [...new Set(galleryItems.map((g) => g.year))].sort(
  (a, b) => b - a,
);
