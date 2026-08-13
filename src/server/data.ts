import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { mergeSettings, type SiteSettings } from "@/lib/settings";
import { img } from "@/lib/data/images";
import { sports as staticSports } from "@/lib/data/sports";
import type {
  Championship,
  Team,
  Athlete,
  GalleryItem,
  Testimonial,
  ChampionshipStatus,
  Sport,
} from "@/types";

/* ----------------------------- Settings ----------------------------- */

export async function getSettings(): Promise<SiteSettings> {
  const rows = await prisma.setting.findMany();
  const overrides: Record<string, string> = {};
  for (const r of rows) overrides[r.key] = r.value;
  return mergeSettings(overrides);
}

/* --------------------------- Modalidades ---------------------------- */

export interface ModalityData extends Sport {
  order: number;
  active: boolean;
}

function rowToSport(r: {
  slug: string;
  name: string;
  icon: string;
  description: string | null;
}): Sport {
  return { slug: r.slug, name: r.name, icon: r.icon, description: r.description ?? "" };
}

/** Mapa slug→Sport (todas as modalidades), com fallback ao catálogo estático. */
export const getModalityMap = cache(async (): Promise<Map<string, Sport>> => {
  const map = new Map<string, Sport>();
  for (const s of staticSports) map.set(s.slug, s); // garante nomes se o banco falhar
  try {
    const rows = await prisma.modality.findMany();
    for (const r of rows) map.set(r.slug, rowToSport(r));
  } catch {
    // mantém o fallback estático
  }
  return map;
});

/** Modalidades ativas — para menu, filtros e formulários. */
export const getModalities = cache(async (): Promise<Sport[]> => {
  try {
    const rows = await prisma.modality.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    if (rows.length > 0) return rows.map(rowToSport);
  } catch {
    // cai no fallback
  }
  return staticSports;
});

/** Todas as modalidades (inclui inativas) — para o painel. */
export async function getAllModalities(): Promise<ModalityData[]> {
  const rows = await prisma.modality.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return rows.map((r) => ({ ...rowToSport(r), order: r.order, active: r.active }));
}

/* --------------------------- Championships -------------------------- */

type ChampRow = Awaited<ReturnType<typeof prisma.championship.findFirst>>;

function mapChampionship(
  r: NonNullable<ChampRow>,
  modMap: Map<string, Sport>,
): Championship {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    sportSlug: r.modalitySlug,
    sport: modMap.get(r.modalitySlug),
    city: r.city,
    state: r.state,
    venue: r.venue ?? "",
    date: r.date.toISOString(),
    time: r.time ?? "",
    registrationDeadline: (r.registrationDeadline ?? r.date).toISOString(),
    registrationFee: r.registrationFee ?? 0,
    prize: r.prize ?? "",
    description: r.description ?? "",
    organizer: r.organizer ?? "",
    image: r.image || img(`champ-${r.slug}`, 1400, 900),
    video: r.video ?? undefined,
    regulationPdf: r.regulationPdf ?? undefined,
    status: r.status as ChampionshipStatus,
    contact: {
      phone: r.phone ?? undefined,
      whatsapp: r.whatsapp ?? undefined,
      site: r.site ?? undefined,
      instagram: r.instagram ?? undefined,
    },
  };
}

export async function getChampionships(): Promise<Championship[]> {
  const rows = await prisma.championship.findMany({
    where: { status: { not: "RASCUNHO" } },
    orderBy: { date: "asc" },
  });
  const modMap = await getModalityMap();
  return rows.map((r) => mapChampionship(r, modMap));
}

export async function getActiveChampionships(): Promise<Championship[]> {
  const rows = await prisma.championship.findMany({
    where: { status: "ATIVO" },
    orderBy: { date: "asc" },
  });
  const modMap = await getModalityMap();
  return rows.map((r) => mapChampionship(r, modMap));
}

export async function getChampionshipsByModality(
  slug: string,
): Promise<Championship[]> {
  const rows = await prisma.championship.findMany({
    where: { modalitySlug: slug, status: { not: "RASCUNHO" } },
    orderBy: { date: "asc" },
  });
  const modMap = await getModalityMap();
  return rows.map((r) => mapChampionship(r, modMap));
}

export async function getChampionshipBySlug(
  slug: string,
): Promise<Championship | null> {
  const r = await prisma.championship.findUnique({ where: { slug } });
  return r ? mapChampionship(r, await getModalityMap()) : null;
}

export async function getAllChampionshipSlugs(): Promise<string[]> {
  const rows = await prisma.championship.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

/* ------------------------------- Teams ------------------------------ */

type TeamRow = Awaited<ReturnType<typeof prisma.team.findFirst>>;

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapTeam(r: NonNullable<TeamRow>, modMap: Map<string, Sport>): Team {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    sportSlug: r.modalitySlug,
    sport: modMap.get(r.modalitySlug),
    city: r.city,
    state: r.state,
    logo: r.logo || img(`logo-${r.slug}`, 400, 400),
    cover: r.cover || img(`team-${r.slug}`, 1400, 800),
    description: r.description ?? "",
    instagram: r.instagram ?? undefined,
    site: r.site ?? undefined,
    gallery: parseJsonArray(r.gallery),
    video: r.video ?? undefined,
  };
}

export async function getTeams(): Promise<Team[]> {
  const rows = await prisma.team.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  const modMap = await getModalityMap();
  return rows.map((r) => mapTeam(r, modMap));
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  const r = await prisma.team.findUnique({ where: { slug } });
  return r ? mapTeam(r, await getModalityMap()) : null;
}

export async function getAllTeamSlugs(): Promise<string[]> {
  const rows = await prisma.team.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

/* ------------------------------ Athletes ---------------------------- */

type AthleteRow = Awaited<ReturnType<typeof prisma.athlete.findFirst>>;

function mapAthlete(r: NonNullable<AthleteRow>, modMap: Map<string, Sport>): Athlete {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    sportSlug: r.modalitySlug,
    sport: modMap.get(r.modalitySlug),
    city: r.city,
    state: r.state,
    team: r.team ?? undefined,
    photo: r.photo || img(`atleta-${r.slug}`, 800, 1000),
    bio: r.bio ?? "",
    achievements: parseJsonArray(r.achievements),
    sponsors: parseJsonArray(r.sponsors),
    instagram: r.instagram ?? undefined,
    video: r.video ?? undefined,
    gallery: parseJsonArray(r.gallery),
    featured: r.featured,
  };
}

export async function getAthletes(): Promise<Athlete[]> {
  const rows = await prisma.athlete.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  const modMap = await getModalityMap();
  return rows.map((r) => mapAthlete(r, modMap));
}

export async function getFeaturedAthletes(): Promise<Athlete[]> {
  const rows = await prisma.athlete.findMany({
    where: { active: true, featured: true },
    orderBy: { createdAt: "desc" },
  });
  const modMap = await getModalityMap();
  return rows.map((r) => mapAthlete(r, modMap));
}

export async function getAthleteBySlug(slug: string): Promise<Athlete | null> {
  const r = await prisma.athlete.findUnique({ where: { slug } });
  return r ? mapAthlete(r, await getModalityMap()) : null;
}

export async function getAllAthleteSlugs(): Promise<string[]> {
  const rows = await prisma.athlete.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

/* ------------------------------ Gallery ----------------------------- */

export async function getGallery(): Promise<GalleryItem[]> {
  const rows = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    type: (r.type as "PHOTO" | "VIDEO") ?? "PHOTO",
    title: r.title ?? "",
    src: r.url,
    thumbnail: r.thumbnail || r.url,
    sportSlug: r.modalitySlug ?? undefined,
    championship: r.championship ?? undefined,
    city: r.city ?? undefined,
    year: r.year ?? new Date().getFullYear(),
  }));
}

export async function getGalleryYears(): Promise<number[]> {
  const rows = await prisma.media.findMany({ select: { year: true } });
  const years = new Set<number>();
  for (const r of rows) if (r.year) years.add(r.year);
  return [...years].sort((a, b) => b - a);
}

/* ------------------------------- Planos ----------------------------- */

export interface PlanData {
  id: string;
  name: string;
  audience?: string;
  price?: string;
  features: string[];
  highlight: boolean;
}

export async function getPlans(): Promise<PlanData[]> {
  const rows = await prisma.plan.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    audience: r.audience ?? undefined,
    price: r.price ?? "Sob consulta",
    features: parseJsonArray(r.features),
    highlight: r.highlight,
  }));
}

/* ------------------------------ Banners ----------------------------- */

export interface BannerData {
  id: string;
  image?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export async function getBanners(): Promise<BannerData[]> {
  const rows = await prisma.banner.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    image: r.image ?? undefined,
    badge: r.badge ?? undefined,
    title: r.title ?? undefined,
    subtitle: r.subtitle ?? undefined,
    tagline: r.tagline ?? undefined,
    ctaLabel: r.ctaLabel ?? undefined,
    ctaHref: r.ctaHref ?? undefined,
  }));
}

/* -------------------------- Blocos de conteúdo ---------------------- */

import {
  diferenciaisPro,
  servicos,
  processo,
  sla,
  abrangencia,
  juridico,
} from "@/lib/data/company";

export interface Block {
  id?: string;
  icon?: string | null;
  title: string;
  text: string;
}

const blockFallback: Record<string, Block[]> = {
  differentials: diferenciaisPro.map((d) => ({ icon: d.icon, title: d.title, text: d.description })),
  services: servicos.map((s) => ({ icon: s.icon, title: s.title, text: s.description })),
  process: processo.map((p) => ({ icon: null, title: p.title, text: p.description })),
  sla: sla.map((s) => ({ icon: null, title: s.label, text: s.value })),
  coverage: abrangencia.map((a) => ({ icon: null, title: a.title, text: a.text })),
  legal: juridico.map((j) => ({ icon: null, title: j.title, text: j.items.join("\n") })),
};

export async function getContentBlocks(section: string): Promise<Block[]> {
  const rows = await prisma.contentBlock.findMany({
    where: { section, active: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  if (rows.length === 0) return blockFallback[section] ?? [];
  return rows.map((r) => ({ id: r.id, icon: r.icon, title: r.title, text: r.text }));
}

/* ---------------------------- Depoimentos --------------------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    quote: r.quote,
    avatar: r.avatar ?? undefined,
  }));
}

/* ---------------------------- Dashboard ----------------------------- */

export async function getDashboardCounts() {
  const [championships, active, teams, athletes, media, quotes, contacts] =
    await Promise.all([
      prisma.championship.count(),
      prisma.championship.count({ where: { status: "ATIVO" } }),
      prisma.team.count(),
      prisma.athlete.count(),
      prisma.media.count(),
      prisma.quoteRequest.count(),
      prisma.contactMessage.count(),
    ]);
  return { championships, active, teams, athletes, media, quotes, contacts };
}
