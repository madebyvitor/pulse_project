import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { IntegrationsPageClient } from '@/components/dashboard/IntegrationsPageClient'
import { getOrganizationOrRedirectOnboarding } from '@/lib/auth/get-organization'
import { prisma } from '@/lib/prisma'
import { mapClient } from '@/lib/dashboard/map-data'
import { mapIntegrations } from '@/lib/integrations/map-data'
import { getInitials } from '@/lib/dashboard/get-initials'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? { title: 'Integrations — Progressly' }
    : { title: 'Integrações — Progressly' }
}

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { organization, user } = await getOrganizationOrRedirectOnboarding()
  const organizationId = organization.id

  const [clients, integrationRows] = await Promise.all([
    prisma.client.findMany({
      where: { organizationId },
      include: { _count: { select: { projects: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.organizationIntegration.findMany({
      where: { organizationId },
    }),
  ])

  const displayName = user.name ?? user.email.split('@')[0]

  return (
    <IntegrationsPageClient
      organizationName={organization.name}
      userName={displayName}
      userInitials={getInitials(user.name ?? user.email) || 'U'}
      clients={clients.map(mapClient)}
      integrations={mapIntegrations(integrationRows)}
    />
  )
}
