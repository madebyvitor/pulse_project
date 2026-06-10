import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Integrations } from "@/components/landing/Integrations";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ClientTimelineFeature } from "@/components/landing/ClientTimelineFeature";
import { ProjectFeedFeature } from "@/components/landing/ProjectFeedFeature";
import { GithubIntegrationSpotlight } from "@/components/landing/GithubIntegrationSpotlight";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
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
        <HowItWorks />
        <ClientTimelineFeature />
        <ProjectFeedFeature />
        <GithubIntegrationSpotlight />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
