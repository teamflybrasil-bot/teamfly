import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { getGallery, getGalleryYears } from "@/server/data";
import { sports } from "@/lib/data/sports";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Fotos e vídeos das delegações, competições e momentos operados pela TeamFly Brasil. Filtre por modalidade, ano e tipo de mídia.",
};

export default async function GaleriaPage() {
  const galleryItems = await getGallery();
  const galleryYears = await getGalleryYears();
  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Do embarque ao pódio, em imagens"
        subtitle="Registros das equipes, atletas e eventos que voam com a TeamFly Brasil."
        breadcrumbs={[{ label: "Galeria" }]}
      />
      <section className="py-20">
        <Container>
          <GalleryExplorer
            items={galleryItems}
            sports={sports}
            years={galleryYears}
          />
        </Container>
      </section>
    </>
  );
}
