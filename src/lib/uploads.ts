import path from "path";

/**
 * Pasta onde os uploads do painel são gravados/servidos.
 * Local: ./uploads (na raiz do projeto).
 * Produção (Railway): defina UPLOAD_DIR para o disco persistente, ex.: /data/uploads
 */
export const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(process.cwd(), "uploads");
