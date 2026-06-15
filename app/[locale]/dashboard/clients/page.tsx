import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ClientsPageClient } from '@/components/dashboard/ClientsPageClient'
import { getOrganizationOrRedirectOnboarding } from '@/lib/auth/get-organization'
import { prisma } from '@/lib/prisma'
import { mapClient } from '@/lib/dashboard/map-data'
import { getInitials } from '@/lib/dashboard/get-initials'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? { title: 'Clients — Progressly' }
    : { title: 'Clientes — Progressly' }
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { organization, user } = await getOrganizationOrRedirectOnboarding()
  const organizationId = organization.id

  const clients = await prisma.client.findMany({
    where: { organizationId },
    include: { _count: { select: { projects: true } } },
    orderBy: { name: 'asc' },
  })

  const displayName = user.name ?? user.email.split('@')[0]

  return (
    <ClientsPageClient
      organizationName={organization.name}
      userName={displayName}
      userInitials={getInitials(user.name ?? user.email) || 'U'}
      clients={clients.map(mapClient)}
    />
  )
}
