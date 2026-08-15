import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { getSettings } from "@/server/data";

export const dynamic = "force-dynamic";

/** Layout do site público: header, barra legal e elementos flutuantes. */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return (
    <div className="flex min-h-full flex-col">
      <Header logo={settings["brand.logo"] || undefined} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
