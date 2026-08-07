# 🚀 Guia de publicação — TeamFly Brasil (Hostinger VPS)

Este site é uma aplicação **Next.js + banco de dados**. Na Hostinger, ele precisa
rodar num **VPS** (Ubuntu). A hospedagem **compartilhada/WordPress NÃO funciona** para este tipo de site.

> Requisitos: 1 VPS Hostinger com **Ubuntu 22.04**, o domínio `teamflybrasil.com.br`
> e acesso ao **Terminal do navegador** (hPanel → VPS → Terminal) ou via SSH.

---

## Passo 1 — Apontar o domínio para o VPS
1. No painel da Hostinger, veja o **IP do seu VPS** (ex.: `191.101.x.x`).
2. Em **Domínios → DNS**, crie/edite os registros:
   - Tipo `A`, Nome `@`, Valor = IP do VPS
   - Tipo `A`, Nome `www`, Valor = IP do VPS
3. Aguarde a propagação (pode levar de minutos a algumas horas).

## Passo 2 — Instalar as ferramentas no servidor
Abra o **Terminal** do VPS e cole os comandos (um bloco por vez):

```bash
# Node.js 20 + ferramentas básicas
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx
sudo npm install -g pm2
```

## Passo 3 — Enviar o código para o servidor
**Opção A (recomendada) — via GitHub:**
```bash
cd /var/www
sudo git clone https://github.com/SEU_USUARIO/teamfly-site.git
sudo chown -R $USER:$USER teamfly-site
cd teamfly-site
```
> (Se preferir, dá pra enviar a pasta por SFTP com o FileZilla, sem GitHub — me avise que eu te explico.)

## Passo 4 — Configurar as variáveis (.env)
```bash
cp .env.production.example .env
nano .env
```
Preencha principalmente:
- `NEXT_PUBLIC_SITE_URL="https://teamflybrasil.com.br"`
- `JWT_SECRET=` → gere com: `openssl rand -base64 32`
- `ADMIN_PASSWORD=` → uma senha forte (você usará para entrar no painel)
- `SMTP_PASS=` → a "Senha de app" do Gmail (para receber os e-mails dos formulários)

Salve no `nano` com **Ctrl+O**, Enter, **Ctrl+X**.

## Passo 5 — Instalar, montar o banco e compilar
```bash
npm install
npm run build
npm run deploy:setup     # cria as tabelas e o admin inicial
```

## Passo 6 — Ligar o site (fica no ar 24h)
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup           # copie e rode a linha que ele mostrar (liga sozinho após reboot)
```
O site já está rodando internamente na porta 3000.

## Passo 7 — Nginx (deixar acessível pelo domínio)
```bash
sudo nano /etc/nginx/sites-available/teamfly
```
Cole (ajuste o domínio se precisar):
```nginx
server {
    listen 80;
    server_name teamflybrasil.com.br www.teamflybrasil.com.br;
    client_max_body_size 20M;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Ative e recarregue:
```bash
sudo ln -s /etc/nginx/sites-available/teamfly /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```
Teste: acesse `http://teamflybrasil.com.br` — o site deve abrir.

## Passo 8 — Cadeado (HTTPS grátis)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d teamflybrasil.com.br -d www.teamflybrasil.com.br
```
Siga as perguntas (informe um e-mail, aceite os termos, escolha redirecionar para HTTPS).
Pronto: `https://teamflybrasil.com.br` no ar com cadeado. 🔒

---

## ✅ Depois de publicar
- Painel: `https://teamflybrasil.com.br/admin`
- Login: o e-mail/senha que você definiu em `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- O site sobe **sem os dados de exemplo** (`SEED_EXAMPLES="0"`), pronto para você
  cadastrar os eventos, parceiros e fotos reais pelo painel.

## 🔄 Como atualizar o site no futuro (quando eu mexer no código)
```bash
cd /var/www/teamfly-site
git pull
npm install
npm run build
npm run deploy:setup     # aplica mudanças de banco (não apaga seus dados)
pm2 reload teamfly
```

## 🆘 Comandos úteis
- Ver se está rodando: `pm2 status`
- Ver logs de erro: `pm2 logs teamfly`
- Reiniciar: `pm2 restart teamfly`
