import { BannerCarousel } from "@/components/home/banner-carousel";
import { Partners } from "@/components/home/partners";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedAthletes } from "@/components/home/featured-athletes";
import { CtaBand } from "@/components/home/cta-band";
import { siteConfig } from "@/lib/site";
import { getBanners, getSettings } from "@/server/data";

export const dynamic = "force-dynamic";

/** JSON-LD (Schema.org) para a organização. */
function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: `+${siteConfig.contact.phoneRaw}`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage() {
  const banners = await getBanners();
  const settings = await getSettings();
  return (
    <>
      <OrganizationSchema />
      <BannerCarousel banners={banners} staticImage={settings["home.heroImage"]} />
      <Partners />
      <StatsSection />
      <FeaturedAthletes />
      <CtaBand />
    </>
  );
}
