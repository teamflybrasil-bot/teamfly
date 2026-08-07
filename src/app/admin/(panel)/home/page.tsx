import { BannerList } from "@/components/admin/banner-list";
import { AthleteList } from "@/components/admin/athlete-list";

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Home</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie o topo da página inicial e os atletas em destaque.
        </p>
      </div>
      <BannerList />
      <AthleteList />
    </div>
  );
}
