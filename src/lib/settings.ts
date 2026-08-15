/**
 * Configurações editáveis do site (textos e imagens gerenciados no painel admin).
 * Cada chave tem um valor padrão; o admin pode sobrescrever no banco (tabela Setting).
 */
import { siteConfig } from "./site";
import { missao, visao, historia } from "./data/company";

export type SettingType = "text" | "textarea" | "image";

export interface SettingField {
  key: string;
  label: string;
  group: string;
  type: SettingType;
  help?: string;
}

/** Definição dos campos editáveis, agrupados para a tela do admin. */
export const settingFields: SettingField[] = [
  // Home
  { key: "brand.logo", label: "Logo do site (cabeçalho)", group: "Home", type: "image", help: "Substitui a logo padrão no topo do site (sobre o fundo branco). Ideal PNG com fundo transparente, ex.: 220 × 60 px. Deixe em branco para usar a logo padrão." },
  { key: "home.heroImage", label: "Imagem fixa do banner", group: "Home", type: "image", help: "Imagem de fundo do banner da home (o texto gira à esquerda, sobre um sombreado). Ideal larga/panorâmica, ex.: 1920 × 800 px — sem texto." },
  // A Empresa
  { key: "about.historia", label: "Nossa história", group: "A Empresa", type: "textarea", help: "Separe parágrafos com uma linha em branco." },
  { key: "about.missao", label: "Missão", group: "A Empresa", type: "textarea" },
  { key: "about.visao", label: "Visão", group: "A Empresa", type: "textarea" },
  { key: "about.image", label: "Foto do fundador / empresa", group: "A Empresa", type: "image", help: "800 × 800 px (quadrada)" },
  // Serviços — textos da página
  { key: "servicos.title", label: "Título da página Serviços", group: "Serviços — textos", type: "textarea" },
  { key: "servicos.subtitle", label: "Subtítulo da página", group: "Serviços — textos", type: "textarea" },
  { key: "servicos.groundTitle", label: "Título da seção “Do ar à terra”", group: "Serviços — textos", type: "text" },
  { key: "servicos.groundText", label: "Texto da seção “Do ar à terra”", group: "Serviços — textos", type: "textarea" },
  // Frota (seção "Do ar à terra")
  { key: "fleet.airplane", label: "Foto do avião (com a marca)", group: "Serviços — frota", type: "image", help: "1200 × 750 px (16:10)" },
  { key: "fleet.bus", label: "Foto do ônibus (com a marca)", group: "Serviços — frota", type: "image", help: "1200 × 750 px (16:10)" },
  // Contato
  { key: "contact.phone", label: "Telefone", group: "Contato", type: "text" },
  { key: "contact.email", label: "E-mail", group: "Contato", type: "text" },
  { key: "contact.whatsapp", label: "Link do WhatsApp", group: "Contato", type: "text" },
  { key: "contact.address", label: "Endereço / localização", group: "Contato", type: "text" },
  { key: "social.instagram", label: "Instagram (URL)", group: "Redes sociais", type: "text" },
  { key: "social.facebook", label: "Facebook (URL)", group: "Redes sociais", type: "text" },
  { key: "social.linkedin", label: "LinkedIn (URL)", group: "Redes sociais", type: "text" },
];

/** Valores padrão (fallback quando não há registro no banco). */
export const defaultSettings: Record<string, string> = {
  "brand.logo": "/brand/logo-oficial.png",
  "home.heroImage": "/brand/home-hero.png",
  "hero.badge": siteConfig.positioning,
  "hero.title": "A logística que leva sua equipe *ao pódio.*",
  "hero.subtitle":
    "Do embarque ao pódio, cuidamos de tudo: passagens, fretamento, transporte terrestre e suporte 24/7. Para quem viaja para competir, não para descansar.",
  "hero.tagline": siteConfig.tagline,
  "hero.image": "/brand/foto-corporativa.png",
  "about.historia": historia.join("\n\n"),
  "about.missao": missao,
  "about.visao": visao,
  "about.image": "/brand/foto-perfil.png",
  "fleet.airplane": "/brand/aviao-exemplo.jpg",
  "fleet.bus": "/brand/onibus-exemplo.jpg",
  "servicos.title": "Soluções completas para equipes esportivas",
  "servicos.subtitle":
    "Fretamento, passagens, transporte terrestre e suporte 24/7 — do embarque ao pódio, com um único responsável.",
  "servicos.groundTitle": "Do ar à terra",
  "servicos.groundText":
    "Além do voo, coordenamos o transporte terrestre da delegação em veículos identificados com a marca TeamFly — do aeroporto ao hotel e à competição.",
  "contact.phone": siteConfig.contact.phone,
  "contact.email": siteConfig.contact.email,
  "contact.whatsapp": siteConfig.contact.whatsapp,
  "contact.address": siteConfig.contact.address,
  "social.instagram": siteConfig.social.instagram,
  "social.facebook": siteConfig.social.facebook,
  "social.linkedin": siteConfig.social.linkedin,
};

export type SiteSettings = Record<string, string>;

/** Mescla overrides do banco sobre os padrões. */
export function mergeSettings(overrides: Record<string, string>): SiteSettings {
  return { ...defaultSettings, ...overrides };
}
