import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata: Record<string, { title: string; description: string }> = {
    pt: {
      title: "Progressly — Seu projeto, vivo para o cliente",
      description:
        "Plataforma que transforma eventos técnicos do desenvolvimento em atualizações compreensíveis para o cliente, dando visibilidade em tempo real do progresso.",
    },
    en: {
      title: "Progressly — Your project, alive for the client",
      description:
        "Platform that transforms technical development events into understandable updates for the client, providing real-time visibility of progress.",
    },
  };

  const meta = metadata[locale] ?? metadata["pt"];

  return {
    title: meta.title,
    description: meta.description,
    keywords: ["project management", "freelancer", "agency", "client", "visibility", "timeline", "communication"],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${inter.variable} ${instrumentSerif.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
