import { getSettings } from "@/server/data";
import { SettingsForm } from "@/components/admin/settings-form";
import { SavedNotice } from "@/components/admin/saved-notice";

const RETURN = "/admin/contato";

export default async function AdminContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const values = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Contato</h1>
        <p className="mt-1 text-muted-foreground">
          Telefone, e-mail, WhatsApp, endereço e redes sociais. Refletem no
          rodapé, no botão do WhatsApp e na página de contato.
        </p>
      </div>

      <SavedNotice show={!!ok} />

      <SettingsForm
        values={values}
        groups={["Contato", "Redes sociais"]}
        returnTo={RETURN}
      />
    </div>
  );
}
