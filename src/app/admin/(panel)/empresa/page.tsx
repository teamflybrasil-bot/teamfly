import { getSettings } from "@/server/data";
import { SettingsForm } from "@/components/admin/settings-form";
import { ContentBlockSection } from "@/components/admin/content-block-section";
import { SavedNotice } from "@/components/admin/saved-notice";

const RETURN = "/admin/empresa";

export default async function AdminEmpresaPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const values = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">A Empresa</h1>
        <p className="mt-1 text-muted-foreground">
          Textos e imagem da página “A Empresa” e os cards de diferenciais.
        </p>
      </div>

      <SavedNotice show={!!ok} />

      <SettingsForm values={values} groups={["A Empresa"]} returnTo={RETURN} />

      <ContentBlockSection
        section="differentials"
        title="Nossos diferenciais"
        hint="Cards exibidos na página A Empresa."
        returnTo={RETURN}
      />
    </div>
  );
}
