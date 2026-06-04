import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse — Seu projeto, vivo para o cliente",
  description:
    "Plataforma que transforma eventos técnicos do desenvolvimento em atualizações compreensíveis para o cliente, dando visibilidade em tempo real do progresso.",
  keywords: [
    "gestão de projetos",
    "freelancer",
    "agência",
    "cliente",
    "visibilidade",
    "timeline",
    "comunicação",
  ],
  openGraph: {
    title: "Pulse — Seu projeto, vivo para o cliente",
    description:
      "Transforme eventos técnicos em atualizações visuais compreensíveis para o seu cliente automaticamente.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
