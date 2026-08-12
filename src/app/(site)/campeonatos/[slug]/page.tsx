import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Trophy,
  DollarSign,
  CalendarClock,
  Building2,
  Phone,
  Globe,
  FileText,
  Ticket,
  Hotel,
  PlaneTakeoff,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { VideoPlayer } from "@/components/shared/video-player";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  InstagramIcon,
  WhatsappIcon,
} from "@/components/shared/social-icons";
import { getChampionshipBySlug } from "@/server/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = await getChampionshipBySlug(slug);
  if (!c) return { title: "Campeonato não encontrado" };
  return {
    title: c.name,
    description: c.description.slice(0, 155),
    openGraph: { images: [{ url: c.image }] },
  };
}

const statusMap = {
  ATIVO: { label: "Inscrições abertas", variant: "success" as const },
  FINALIZADO: { label: "Finalizado", variant: "muted" as const },
  RASCUNHO: { label: "Em breve", variant: "orange" as const },
};

export default async function CampeonatoPage({ params }: Params) {
  const { slug } = await params;
  const c = await getChampionshipBySlug(slug);
  if (!c) notFound();

  const sport = c.sport;
  const status = statusMap[c.status];
  const orcamentoHref = `/orcamento?competicao=${encodeURIComponent(c.name)}`;

  const info = [
    { icon: MapPin, label: "Local", value: `${c.venue} — ${c.city}/${c.state}` },
    { icon: CalendarDays, label: "Data", value: formatDate(c.date) },
    { icon: Clock, label: "Horário", value: c.time },
    { icon: CalendarClock, label: "Fim das inscrições", value: formatDate(c.registrationDeadline) },
    { icon: DollarSign, label: "Inscrição", value: formatCurrency(c.registrationFee) },
    { icon: Trophy, label: "Premiação", value: c.prize },
    { icon: Building2, label: "Organizador", value: c.organizer },
  ];

  return (
    <>
      <PageHero
        eyebrow={sport?.name ?? "Campeonato"}
        title={c.name}
        breadcrumbs={[
          { label: "Esportes", href: "/esportes" },
          { label: sport?.name ?? "Modalidade", href: `/esportes/${c.sportSlug}` },
          { label: c.name },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Conteúdo principal */}
            <div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-navy-950">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-contain"
                />
                <div className="absolute left-5 top-5 flex gap-2">
                  <Badge variant={status.variant}>{status.label}</Badge>
                  {sport && <Badge variant="navy">{sport.name}</Badge>}
                </div>
              </div>

              <h2 className="mt-10 font-display text-3xl">Sobre o campeonato</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {c.description}
              </p>

              {c.regulationPdf ? (
                <a
                  href={c.regulationPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-orange-500/40"
                >
                  <FileText className="size-6 text-orange-500" />
                  <span>
                    <span className="block font-semibold">Regulamento</span>
                    <span className="text-sm text-muted-foreground">
                      Baixar PDF do campeonato
                    </span>
                  </span>
                </a>
              ) : (
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-muted-foreground">
                  <FileText className="size-6" />
                  <span className="text-sm">
                    Regulamento em PDF disponível em breve.
                  </span>
                </div>
              )}

              {c.video && (
                <div className="mt-10">
                  <h2 className="mb-4 font-display text-2xl">Vídeo</h2>
                  <VideoPlayer src={c.video} />
                </div>
              )}

              {/* Informações do organizador */}
              <div className="mt-10 rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-xl">Organização e contato</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {c.contact.whatsapp && (
                    <a
                      href={c.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
                    >
                      <WhatsappIcon className="size-4 text-[#25D366]" /> WhatsApp
                    </a>
                  )}
                  {c.contact.phone && (
                    <a
                      href={`tel:${c.contact.phone}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
                    >
                      <Phone className="size-4 text-orange-500" /> {c.contact.phone}
                    </a>
                  )}
                  {c.contact.site && (
                    <a
                      href={c.contact.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
                    >
                      <Globe className="size-4 text-orange-500" /> Site
                    </a>
                  )}
                  {c.contact.instagram && (
                    <a
                      href={c.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-500/40"
                    >
                      <InstagramIcon className="size-4 text-[#E4405F]" /> Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar sticky com infos e CTAs */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <dl className="space-y-4">
                  {info.map((row) => (
                    <div key={row.label} className="flex gap-3">
                      <row.icon className="mt-0.5 size-5 shrink-0 text-orange-500" />
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                          {row.label}
                        </dt>
                        <dd className="font-medium text-foreground">
                          {row.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <ButtonLink href={orcamentoHref} className="w-full">
                    <Ticket className="size-5" /> Solicitar Passagens
                  </ButtonLink>
                  <ButtonLink
                    href={orcamentoHref}
                    variant="navy"
                    className="w-full"
                  >
                    <Hotel className="size-5" /> Solicitar Hospedagem
                  </ButtonLink>
                  <ButtonLink
                    href={orcamentoHref}
                    variant="outline"
                    className="w-full"
                  >
                    <PlaneTakeoff className="size-5" /> Logística Completa
                  </ButtonLink>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Resposta rápida via {siteConfig.contact.phone}
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
