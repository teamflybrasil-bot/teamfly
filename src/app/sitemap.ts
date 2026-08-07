import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { sports } from "@/lib/data/sports";
import { championships } from "@/lib/data/championships";
import { athletes } from "@/lib/data/athletes";
import { teams } from "@/lib/data/teams";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/quem-somos",
    "/servicos",
    "/esportes",
    "/eventos",
    "/galeria",
    "/atletas",
    "/equipes",
    "/depoimentos",
    "/orcamento",
    "/contato",
    "/privacidade",
    "/termos",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...sports.map((s) => `/esportes/${s.slug}`),
    ...championships.map((c) => `/campeonatos/${c.slug}`),
    ...athletes.map((a) => `/atletas/${a.slug}`),
    ...teams.map((t) => `/equipes/${t.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
