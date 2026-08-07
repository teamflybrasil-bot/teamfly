// PM2 — mantém o site TeamFly rodando no servidor (VPS) e reinicia sozinho.
// Uso no servidor:  pm2 start ecosystem.config.cjs  &&  pm2 save
module.exports = {
  apps: [
    {
      name: "teamfly",
      cwd: __dirname,
      script: "./node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
