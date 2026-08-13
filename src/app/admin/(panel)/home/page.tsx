import { BannerList } from "@/components/admin/banner-list";
import { AthleteList } from "@/components/admin/athlete-list";
import { SettingsForm } from "@/components/admin/settings-form";
import { SavedNotice } from "@/components/admin/saved-notice";
import { getSettings } from "@/server/data";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const settings = await getSettings();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Home</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie o topo da página inicial e os atletas em destaque.
        </p>
      </div>
      <SavedNotice />
      <SettingsForm values={settings} groups={["Home"]} returnTo="/admin/home" />
      <BannerList />
      <AthleteList />
    </div>
  );
}
