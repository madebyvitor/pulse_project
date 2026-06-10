import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// This root layout is intentionally minimal.
// The [locale]/layout.tsx handles <html>, <body>, metadata, and NextIntlClientProvider.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

