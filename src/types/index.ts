/**
 * Tipos de domínio compartilhados entre camada de dados (mock/Prisma) e UI.
 * Alinhados com o schema do Prisma em prisma/schema.prisma.
 */

export type ChampionshipStatus = "ATIVO" | "FINALIZADO" | "RASCUNHO";

export interface Sport {
  slug: string;
  name: string;
  /** Nome do ícone Lucide correspondente. */
  icon: string;
  /** Descrição curta usada nos cartões da página de Esportes. */
  description: string;
}

export interface Championship {
  id: string;
  slug: string;
  name: string;
  sportSlug: string;
  city: string;
  state: string;
  venue: string;
  date: string; // ISO
  time: string;
  registrationDeadline: string; // ISO
  registrationFee: number;
  prize: string;
  description: string;
  organizer: string;
  image: string;
  video?: string;
  regulationPdf?: string;
  status: ChampionshipStatus;
  contact: {
    phone?: string;
    whatsapp?: string;
    site?: string;
    instagram?: string;
  };
}

export interface Athlete {
  id: string;
  slug: string;
  name: string;
  sportSlug: string;
  city: string;
  state: string;
  team?: string;
  photo: string;
  bio: string;
  achievements: string[];
  sponsors: string[];
  instagram?: string;
  video?: string;
  gallery: string[];
  featured: boolean;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  sportSlug: string;
  city: string;
  state: string;
  logo: string;
  cover: string;
  description: string;
  instagram?: string;
  site?: string;
  gallery: string[];
  video?: string;
}

export type MediaType = "PHOTO" | "VIDEO";

export interface GalleryItem {
  id: string;
  type: MediaType;
  title: string;
  src: string;
  thumbnail: string;
  sportSlug?: string;
  championship?: string;
  city?: string;
  year: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
