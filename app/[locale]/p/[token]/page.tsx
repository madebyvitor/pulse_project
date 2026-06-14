import { redirect } from 'next/navigation'

export default async function LegacyPortalRedirect({
  params,
}: {
  params: Promise<{ locale: string; token: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}`)
}
