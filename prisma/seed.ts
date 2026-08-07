/**
 * Seed do banco (SQLite) a partir dos dados de exemplo em src/lib/data.
 * Uso: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { championships } from "../src/lib/data/championships";
import { athletes } from "../src/lib/data/athletes";
import { teams } from "../src/lib/data/teams";
import { galleryItems } from "../src/lib/data/gallery";
import { testimonials } from "../src/lib/data/content";
import {
  diferenciaisPro,
  servicos,
  processo,
  sla,
  abrangencia,
  juridico,
  planos,
} from "../src/lib/data/company";
import { defaultSettings } from "../src/lib/settings";

const prisma = new PrismaClient();

async function main() {
  // Em produção: só popula se o banco estiver vazio (evita recriar itens que
  // você excluiu). Use SEED_FORCE=1 para forçar.
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0 && process.env.SEED_FORCE !== "1") {
    console.log("Banco já populado — seed ignorado.");
    return;
  }
  // SEED_EXAMPLES=0 pula os dados fictícios (eventos/parceiros/atletas/galeria/
  // depoimentos de exemplo), deixando a produção limpa para você preencher.
  const seedExamples = process.env.SEED_EXAMPLES !== "0";

  // 1) Usuário admin inicial
  const email = process.env.ADMIN_EMAIL || "admin@teamflybrasil.com.br";
  const password = process.env.ADMIN_PASSWORD || "teamfly@2026";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name: "Administrador", email, password: passwordHash, role: "ADMIN" },
  });
  console.log(`👤 Admin: ${email} / ${password}`);

  // 2) Configurações padrão do site
  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  // 3) Campeonatos / eventos (exemplo)
  for (const c of seedExamples ? championships : []) {
    await prisma.championship.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        name: c.name,
        modalitySlug: c.sportSlug,
        city: c.city,
        state: c.state,
        venue: c.venue,
        date: new Date(c.date),
        time: c.time,
        registrationDeadline: new Date(c.registrationDeadline),
        registrationFee: c.registrationFee,
        prize: c.prize,
        description: c.description,
        organizer: c.organizer,
        image: c.image,
        video: c.video,
        phone: c.contact.phone,
        whatsapp: c.contact.whatsapp,
        site: c.contact.site,
        instagram: c.contact.instagram,
        status: c.status,
      },
    });
  }

  // 4) Parceiros / equipes
  let order = 0;
  for (const t of seedExamples ? teams : []) {
    await prisma.team.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        name: t.name,
        modalitySlug: t.sportSlug,
        city: t.city,
        state: t.state,
        logo: t.logo,
        cover: t.cover,
        description: t.description,
        instagram: t.instagram,
        site: t.site,
        gallery: JSON.stringify(t.gallery ?? []),
        order: order++,
      },
    });
  }

  // 5) Atletas (exemplo)
  for (const a of seedExamples ? athletes : []) {
    await prisma.athlete.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        name: a.name,
        modalitySlug: a.sportSlug,
        city: a.city,
        state: a.state,
        team: a.team,
        photo: a.photo,
        bio: a.bio,
        achievements: JSON.stringify(a.achievements ?? []),
        sponsors: JSON.stringify(a.sponsors ?? []),
        instagram: a.instagram,
        gallery: JSON.stringify(a.gallery ?? []),
        featured: a.featured,
      },
    });
  }

  // 6) Galeria (exemplo)
  for (const g of seedExamples ? galleryItems : []) {
    await prisma.media.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        type: g.type,
        title: g.title,
        url: g.src,
        thumbnail: g.thumbnail,
        year: g.year,
        city: g.city,
        modalitySlug: g.sportSlug,
        championship: g.championship,
      },
    });
  }

  // 7) Depoimentos (exemplo)
  let torder = 0;
  for (const t of seedExamples ? testimonials : []) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        role: t.role,
        quote: t.quote,
        order: torder++,
      },
    });
  }

  // 8) Blocos de conteúdo (diferenciais, serviços, etapas)
  const blockSets: Record<string, { icon: string | null; title: string; text: string }[]> = {
    differentials: diferenciaisPro.map((d) => ({ icon: d.icon, title: d.title, text: d.description })),
    services: servicos.map((s) => ({ icon: s.icon, title: s.title, text: s.description })),
    process: processo.map((p) => ({ icon: null, title: p.title, text: p.description })),
    sla: sla.map((s) => ({ icon: null, title: s.label, text: s.value })),
    coverage: abrangencia.map((a) => ({ icon: null, title: a.title, text: a.text })),
    legal: juridico.map((j) => ({ icon: null, title: j.title, text: j.items.join("\n") })),
  };
  for (const [section, blocks] of Object.entries(blockSets)) {
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      await prisma.contentBlock.upsert({
        where: { id: `blk-${section}-${i}` },
        update: {},
        create: { id: `blk-${section}-${i}`, section, icon: b.icon, title: b.title, text: b.text, order: i },
      });
    }
  }

  // 9) Banners do carrossel da home
  const banners = [
    {
      id: "banner-1",
      image: "/brand/foto-corporativa.png",
      badge: "Logística Aérea Especializada para Equipes Esportivas",
      title: "A logística que leva sua equipe *ao pódio.*",
      subtitle:
        "Do embarque ao pódio, cuidamos de tudo: passagens, fretamento, transporte terrestre e suporte 24/7. Para quem viaja para competir, não para descansar.",
      tagline: "Voa junto. Chega forte.",
      ctaLabel: "Solicitar Orçamento",
      ctaHref: "/orcamento",
      order: 0,
    },
    {
      id: "banner-2",
      image: "/brand/diferenca.png",
      badge: "A diferença TeamFly",
      title: "Uma agência comum te leva. *A TeamFly te prepara* para vencer.",
      subtitle:
        "Logística esportiva especializada para times e atletas. Coletivo ou individual, cada detalhe da viagem é pensado para você chegar em condição de competir.",
      tagline: null,
      ctaLabel: "Prepare sua equipe para vencer",
      ctaHref: "/orcamento",
      order: 1,
    },
  ];
  for (const b of banners) {
    await prisma.banner.upsert({ where: { id: b.id }, update: {}, create: b });
  }

  // 10) Planos de atendimento
  for (let i = 0; i < planos.length; i++) {
    const p = planos[i];
    await prisma.plan.upsert({
      where: { id: `plan-${i}` },
      update: {},
      create: {
        id: `plan-${i}`,
        name: p.name,
        audience: p.audience,
        features: JSON.stringify(p.features),
        highlight: p.highlight,
        order: i,
      },
    });
  }

  console.log("✅ Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
