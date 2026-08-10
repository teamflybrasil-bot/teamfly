/**
 * Configuração central do site TeamFly Brasil.
 * Fonte única de verdade para dados institucionais, contato e navegação.
 */

export const siteConfig = {
  name: "TeamFly Brasil",
  shortName: "TeamFly",
  slogan: "Logística do Embarque ao Pódio",
  tagline: "Voa junto. Chega forte.",
  positioning: "Logística Aérea Especializada para Equipes Esportivas",
  description:
    "A TeamFly Brasil cuida do deslocamento aéreo e operacional de atletas e equipes esportivas — do planejamento da viagem ao acompanhamento em tempo real. Passagens, fretamento, roteiros e suporte 24/7 para quem viaja para competir.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://teamflybrasil.com.br",
  locale: "pt-BR",
  contact: {
    phone: "(17) 99136-9593",
    phoneRaw: "5517991369593",
    email: "contato@teamflybrasil.com.br",
    whatsapp: "https://wa.me/5517991369593",
    address: "Bebedouro — SP · Atendimento Nacional",
  },
  social: {
    instagram: "https://instagram.com/teamflybrasil",
    facebook: "https://facebook.com/teamflybrasil",
    linkedin: "https://linkedin.com/company/teamflybrasil",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Menu principal exibido no header e no rodapé. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "A Empresa", href: "/quem-somos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Esportes", href: "/esportes" },
  { label: "Eventos", href: "/eventos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Parceiros", href: "/equipes" },
  { label: "Depoimentos", href: "/depoimentos" },
  { label: "Contato", href: "/contato" },
];

/** Link de destaque (CTA) que fica separado no menu. */
export const ctaNav: NavItem = {
  label: "Solicite um Orçamento",
  href: "/orcamento",
};
