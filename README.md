# TeamFly Brasil — Site Institucional

> **Logística do Embarque ao Pódio.**
> Site institucional premium para a TeamFly Brasil — logística aérea especializada para equipes esportivas, atletas, empresas e eventos.

Construído com **Next.js 16 (App Router) · React 19 · TypeScript · TailwindCSS v4 · Framer Motion · Prisma · PostgreSQL**.

---

## ✨ O que já está pronto (Fase 1 — Fundação + Front público)

- **Design system** com a identidade da marca (Azul Marinho `#131B2E`, Laranja `#FF6A00`), tipografia **Anton** (títulos) + **Inter** (textos), modo claro/escuro.
- **Páginas públicas completas e responsivas:**
  Home, Quem Somos, Esportes (26 modalidades), página por modalidade, detalhe de campeonato, Eventos (com filtros), Galeria (lightbox + filtros + carregar mais), Atletas (grid + perfil), Equipes (grid + perfil), Orçamento, Contato, Privacidade (LGPD) e Termos.
- **Formulários** de Orçamento e Contato com validação **Zod + React Hook Form**, honeypot anti-spam e API routes.
- **SEO técnico:** metadata dinâmica, OpenGraph, Schema.org (JSON-LD), `sitemap.xml`, `robots.txt`, **PWA manifest**.
- **Extras:** animações suaves (scroll reveal, contadores), botão flutuante de WhatsApp, banner de cookies (LGPD), 404 customizado.
- **Banco de dados:** schema **Prisma** completo com todas as tabelas relacionais + script de seed.

## 🚧 Próximas fases (roadmap)

- **Fase 2 — Backend/Admin:** autenticação JWT, painel administrativo protegido, dashboard com gráficos, CRUD completo (campeonatos, atletas, equipes, mídia, orçamentos, contatos, usuários), upload de imagens/vídeos, envio de e-mail dos formulários.
- **Fase 3 — Qualidade & Deploy:** testes (unitários/integração), Docker de produção, scripts de deploy (Vercel + Railway/Supabase), Google Analytics, otimização final de Lighthouse.

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 20+ (testado no 24)
- Docker (para o PostgreSQL) — opcional na Fase 1, pois o front usa dados mock

### 1. Instalar dependências
```bash
npm install --legacy-peer-deps
```
> `--legacy-peer-deps` é necessário por um peer opcional (valibot) do `@hookform/resolvers`.

### 2. Variáveis de ambiente
```bash
cp .env.example .env
```
Ajuste os valores conforme necessário.

### 3. Rodar em desenvolvimento
```bash
npm run dev
```
Acesse http://localhost:3000

### 4. Build de produção
```bash
npm run build
npm start
```

---

## 🗄️ Banco de dados (Prisma + PostgreSQL)

O front da Fase 1 funciona com dados mock (`src/lib/data`). Para ativar a persistência:

```bash
npm run db:up        # sobe PostgreSQL + Adminer via Docker
npm run db:generate  # gera o Prisma Client
npm run db:migrate   # cria as tabelas
npm run db:seed      # popula com os dados de exemplo
npm run db:studio    # abre o Prisma Studio
```

Usuário admin inicial criado pelo seed:
`admin@teamflybrasil.com.br` / `teamfly@2026` — **troque em produção.**

---

## 📁 Estrutura do projeto

```
src/
├── app/                 # Rotas (App Router)
│   ├── (páginas públicas)/…
│   ├── api/             # API routes (orçamento, contato)
│   ├── layout.tsx       # Layout raiz (fontes, tema, header/footer)
│   ├── sitemap.ts · robots.ts · manifest.ts
├── components/
│   ├── ui/              # Primitivas (Button, Card, Field, …)
│   ├── layout/          # Header, Footer, Logo, ThemeToggle
│   ├── home/            # Seções da home
│   ├── cards/           # Cartões (campeonato, atleta, equipe)
│   ├── forms/           # Formulários (orçamento, contato)
│   ├── shared/          # Reveal, CountUp, ícones, PageHero, …
│   └── providers/       # ThemeProvider
├── lib/
│   ├── data/            # Dados mock (troque por Prisma na Fase 2)
│   ├── site.ts          # Config central (contato, navegação)
│   ├── validations.ts   # Schemas Zod
│   ├── prisma.ts        # Singleton do Prisma Client
│   └── utils.ts
└── types/               # Tipos de domínio
prisma/
├── schema.prisma        # Modelo de dados completo
└── seed.ts
```

---

## 🎨 Identidade visual

| Token            | Valor       |
|------------------|-------------|
| Azul Marinho     | `#131B2E`   |
| Laranja          | `#FF6A00`   |
| Cinza Claro      | `#F4F5F7`   |
| Títulos          | Anton       |
| Textos           | Inter       |

> As imagens usam `picsum.photos` como placeholder (`src/lib/data/images.ts`). Troque por URLs de um CDN (Cloudinary/S3) em produção.

---

## 📞 Contato TeamFly Brasil
- Telefone/WhatsApp: (17) 99136-9593
- E-mail: teamflybrasil@gmail.com
