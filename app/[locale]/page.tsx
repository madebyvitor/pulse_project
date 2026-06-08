import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Integrations } from "@/components/landing/Integrations";
import { Benefits } from "@/components/landing/Benefits";
import { FeaturesSplit } from "@/components/landing/FeaturesSplit";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Nav />
      <main>
        <Hero />
        <Integrations />
        <Benefits />
        <FeaturesSplit />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
