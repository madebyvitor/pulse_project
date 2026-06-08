import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AgencyDashboard } from "@/components/dashboard/AgencyDashboard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? { title: "Dashboard — Progressly" }
    : { title: "Dashboard — Progressly" };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AgencyDashboard />;
}
