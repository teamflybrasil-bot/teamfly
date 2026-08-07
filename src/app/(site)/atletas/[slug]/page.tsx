import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Trophy, Users, Award } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { InstagramIcon } from "@/components/shared/social-icons";
import { ImageCarousel } from "@/components/shared/image-carousel";
import { getSport } from "@/lib/data/sports";
import { getAthleteBySlug } from "@/server/data";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAthleteBySlug(slug);
  if (!a) return { title: "Atleta não encontrado" };
  return {
    title: a.name,
    description: a.bio.slice(0, 155),
    openGraph: { images: [{ url: a.photo }] },
  };
}

export default async function AtletaPage({ params }: Params) {
  const { slug } = await params;
  const a = await getAthleteBySlug(slug);
  if (!a) notFound();

  const sport = getSport(a.sportSlug);
  const images = [a.photo, ...a.gallery].filter(
    (src, i, arr): src is string => Boolean(src) && arr.indexOf(src) === i,
  );

  return (
    <>
      <PageHero
        eyebrow={sport?.name ?? "Atleta"}
        title={a.name}
        breadcrumbs={[
          { label: "Atletas", href: "/atletas" },
          { label: a.name },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <ImageCarousel images={images} alt={a.name} aspectClass="aspect-[4/5]" />

            <div>
              <div className="flex flex-wrap items-center gap-3">
                {sport && <Badge variant="orange">{sport.name}</Badge>}
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-orange-500" />
                  {a.city} — {a.state}
                </span>
                {a.team && (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="size-4 text-orange-500" />
                    {a.team}
                  </span>
                )}
              </div>

              <h2 className="mt-6 font-display text-2xl">Biografia</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {a.bio}
              </p>

              <h3 className="mt-8 flex items-center gap-2 font-display text-xl">
                <Trophy className="size-5 text-orange-500" /> Conquistas
              </h3>
              <ul className="mt-3 space-y-2">
                {a.achievements.map((ach) => (
                  <li key={ach} className="flex items-start gap-2 text-muted-foreground">
                    <Award className="mt-0.5 size-4 shrink-0 text-orange-500" />
                    {ach}
                  </li>
                ))}
              </ul>

              {a.sponsors.length > 0 && (
                <>
                  <h3 className="mt-8 font-display text-xl">Patrocinadores</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.sponsors.map((s) => (
                      <Badge key={s} variant="muted">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

              {a.instagram && (
                <a
                  href={a.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-800 px-5 py-2.5 font-medium text-white transition-colors hover:bg-navy-700"
                >
                  <InstagramIcon className="size-5 text-[#E4405F]" /> Seguir no Instagram
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
