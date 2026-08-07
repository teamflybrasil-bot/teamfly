import { getSettings } from "@/server/data";
import { SettingsForm } from "@/components/admin/settings-form";
import { ContentBlockSection } from "@/components/admin/content-block-section";
import { PlansSection } from "@/components/admin/plans-section";
import { SavedNotice } from "@/components/admin/saved-notice";

const RETURN = "/admin/servicos";

export default async function AdminServicosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const values = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Serviços</h1>
        <p className="mt-1 text-muted-foreground">
          Todos os blocos da página Serviços: textos, fotos, cards, processo,
          SLA, abrangência, assessoria jurídica e planos.
        </p>
      </div>

      <SavedNotice show={!!ok} />

      <SettingsForm
        values={values}
        groups={["Serviços — textos", "Serviços — frota"]}
        returnTo={RETURN}
      />

      <ContentBlockSection section="services" title="Portfólio de serviços" hint="Cards “O que a TeamFly faz por você”." returnTo={RETURN} />
      <ContentBlockSection section="process" title="Como trabalhamos" hint="Etapas do processo." returnTo={RETURN} />
      <ContentBlockSection section="legal" title="Assessoria jurídica" hint="Texto = itens, um por linha." returnTo={RETURN} />
      <PlansSection returnTo={RETURN} />
    </div>
  );
}
