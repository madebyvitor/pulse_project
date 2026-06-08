import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AuthScreen } from "@/components/auth/AuthScreen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "en"
    ? {
        title: "Log in — Progressly",
        description: "Access your Progressly dashboard to manage your projects, clients and reports in one place.",
      }
    : {
        title: "Entrar — Progressly",
        description: "Acesse o painel Progressly para gerenciar seus projetos, clientes e relatórios em um único lugar.",
      };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuthScreen />;
}
