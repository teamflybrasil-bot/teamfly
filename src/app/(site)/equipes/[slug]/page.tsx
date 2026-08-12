import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Globe } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { InstagramIcon } from "@/components/shared/social-icons";
import { ImageCarousel } from "@/components/shared/image-carousel";
import { VideoPlayer } from "@/components/shared/video-player";
import { getTeamBySlug } from "@/server/data";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTeamBySlug(slug);
  if (!t) return { title: "Equipe não encontrada" };
  return {
    title: t.name,
    description: t.description.slice(0, 155),
    openGraph: { images: [{ url: t.cover }] },
  };
}

export default async function EquipePage({ params }: Params) {
  const { slug } = await params;
  const t = await getTeamBySlug(slug);
  if (!t) notFound();

  const sport = t.sport;

  // Carrossel: Foto 2 (capa) primeiro, depois as demais fotos. A Foto 1 (logo)
  // fica no quadrado de destaque e NÃO entra no carrossel.
  const carousel = [t.cover, ...t.gallery].filter(
    (src, i, arr): src is string => Boolean(src) && arr.indexOf(src) === i,
  );
  const highlight = t.logo;

  return (
    <>
      <PageHero
        eyebrow={sport?.name ?? "Equipe"}
        title={t.name}
        breadcrumbs={[
          { label: "Parceiros", href: "/equipes" },
          { label: t.name },
        ]}
      />

      <section className="py-16">
        <Container className="max-w-4xl">
          <div className="relative">
            <ImageCarousel images={carousel} alt={t.name} />
            {highlight && (
              <div className="absolute -bottom-6 left-6 size-24 overflow-hidden rounded-2xl border-4 border-background bg-white shadow-premium">
                <Image
                  src={highlight}
                  alt={`${t.name} — destaque`}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              {sport && <Badge variant="orange">{sport.name}</Badge>}
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-orange-500" />
                {t.city} — {t.state}
              </span>
            </div>
            <h2 className="mt-6 font-display text-2xl">Sobre a equipe</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {t.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {t.instagram && (
                <a
                  href={t.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
                >
                  <InstagramIcon className="size-4 text-[#E4405F]" /> Instagram
                </a>
              )}
              {t.site && (
                <a
                  href={t.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
                >
                  <Globe className="size-4 text-orange-500" /> Site oficial
                </a>
              )}
            </div>

            {t.video && (
              <div className="mt-10">
                <h2 className="mb-4 font-display text-2xl">Vídeo</h2>
                <VideoPlayer src={t.video} />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
