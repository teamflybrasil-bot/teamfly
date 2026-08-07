import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/shared/social-icons";
import { getSettings } from "@/server/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a TeamFly Brasil. Telefone, WhatsApp, e-mail e formulário de contato para logística esportiva.",
};

export default async function ContatoPage() {
  const s = await getSettings();
  const phone = s["contact.phone"];
  const phoneRaw = phone.replace(/\D/g, "");
  const email = s["contact.email"];
  const whatsapp = s["contact.whatsapp"];
  const address = s["contact.address"];
  const socials = [
    { icon: InstagramIcon, href: s["social.instagram"], label: "Instagram", color: "#E4405F" },
    { icon: FacebookIcon, href: s["social.facebook"], label: "Facebook", color: "#1877F2" },
    { icon: LinkedinIcon, href: s["social.linkedin"], label: "LinkedIn", color: "#0A66C2" },
  ];
  const mapQuery = encodeURIComponent(address.split("·")[0].trim() || "Bebedouro SP");
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar"
        subtitle="Estamos prontos para planejar a próxima viagem da sua equipe. Escolha o canal que preferir."
        breadcrumbs={[{ label: "Contato" }]}
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            {/* Informações */}
            <div>
              <div className="space-y-4">
                <a
                  href={`tel:+55${phoneRaw}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-orange-500/40"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Phone className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-semibold">{phone}</p>
                  </div>
                </a>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-orange-500/40"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                    <WhatsappIcon className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="font-semibold">Clique para conversar</p>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-orange-500/40"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Mail className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-semibold">{email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="grid size-12 place-items-center rounded-xl bg-orange-500/10 text-orange-500">
                    <MapPin className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Localização</p>
                    <p className="font-semibold">{address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color }}
                    className="grid size-11 place-items-center rounded-full border border-border transition-transform hover:scale-110"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>

              {/* Mapa */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Mapa TeamFly Brasil"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
