import { getLocale } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from '@/src/i18n/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect({ href: '/login', locale: await getLocale() })
  }

  return children
}
