import { getLocale } from 'next-intl/server'
import { getAuthUser } from '@/lib/auth/get-auth-user'
import { redirect } from '@/src/i18n/navigation'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthUser()

  if (!user) {
    redirect({ href: '/login', locale: await getLocale() })
  }

  return children
}
