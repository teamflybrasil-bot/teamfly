# 🚀 Guia de publicação — TeamFly Brasil (Vercel + Neon + Blob, grátis)

Stack gratuita: **Vercel** (site) · **Neon** (banco PostgreSQL) · **Vercel Blob** (fotos).

> O banco Neon já foi criado e populado. Falta: enviar o código ao GitHub, importar na
> Vercel, criar o Blob store e configurar as variáveis. Passo a passo abaixo.

---

## Passo 1 — Enviar o código para o GitHub
1. Crie uma conta em **https://github.com** (se ainda não tiver).
2. Crie um repositório **novo e privado** chamado `teamfly-site` (sem README).
3. No seu computador, na pasta do projeto, rode (o Git vai pedir login no navegador):
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/teamfly-site.git
   git branch -M main
   git push -u origin main
   ```

## Passo 2 — Importar na Vercel
1. Crie conta em **https://vercel.com** entrando com o **GitHub**.
2. **Add New… → Project** → selecione o repositório `teamfly-site` → **Import**.
3. Framework: **Next.js** (detecta sozinho). **Não** clique em Deploy ainda — primeiro as variáveis (Passo 3 e 4).

## Passo 3 — Criar o armazenamento de fotos (Vercel Blob)
1. No projeto da Vercel → aba **Storage** → **Create Database** → **Blob** → **Create**.
2. Conecte ao projeto. A Vercel adiciona sozinha a variável `BLOB_READ_WRITE_TOKEN`.

## Passo 4 — Variáveis de ambiente (Settings → Environment Variables)
Adicione (marque para **Production, Preview e Development**):

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://teamflybrasil.com.br` |
| `DATABASE_URL` | connection string **pooled** do Neon |
| `DIRECT_URL` | connection string **direta** do Neon |
| `JWT_SECRET` | um segredo forte (ex.: `openssl rand -base64 32`) |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `teamflybrasil@gmail.com` |
| `SMTP_PASS` | a "Senha de app" do Gmail (pode deixar vazio por ora) |
| `CONTACT_TO_EMAIL` | `teamflybrasil@gmail.com` |

> `BLOB_READ_WRITE_TOKEN` já foi adicionado automaticamente no Passo 3.

## Passo 5 — Publicar
Clique em **Deploy**. Em ~2 minutos o site sobe num endereço `...vercel.app`.
Teste o painel em `SEU-ENDERECO.vercel.app/admin`.

## Passo 6 — Domínio próprio
1. No projeto da Vercel → **Settings → Domains** → adicione `teamflybrasil.com.br` e `www.teamflybrasil.com.br`.
2. A Vercel mostra os registros DNS (um `A` e/ou `CNAME`). No painel da **Hostinger → Domínios → DNS**, crie exatamente esses registros.
3. Aguarde a propagação. A Vercel emite o **HTTPS (cadeado) automaticamente**. 🔒

---

## 🔄 Como atualizar o site depois (quando o código mudar)
Basta enviar as mudanças para o GitHub — a Vercel **republica sozinha**:
```bash
git add -A
git commit -m "descrição da mudança"
git push
```

## ℹ️ Observações
- O banco (Neon) e as fotos (Blob) ficam na nuvem — **não se perdem** a cada deploy.
- Login inicial do painel: `admin@teamflybrasil.com.br` / a senha do seed (troque em **Minha conta**).
- Se mexer no **schema do banco**, rode localmente `npx prisma db push` (com o `.env` apontando pro Neon) antes do deploy.
