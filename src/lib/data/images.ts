/**
 * Helper de imagens placeholder (picsum.photos).
 * Determinístico por `seed` — troque por URLs de CDN/Cloudinary em produção.
 */
export function img(seed: string, w = 1200, h = 800): string {
  return `https://picsum.photos/seed/teamfly-${seed}/${w}/${h}`;
}
