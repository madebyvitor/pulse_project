// This root layout is intentionally minimal.
// The [locale]/layout.tsx handles <html>, <body>, metadata, and NextIntlClientProvider.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

