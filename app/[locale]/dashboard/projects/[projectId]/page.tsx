import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ProjectDetailPageClient } from '@/components/dashboard/ProjectDetailPageClient'
import { getOrganizationOrRedirectOnboarding } from '@/lib/auth/get-organization'
import { prisma } from '@/lib/prisma'
import { mapClient, mapProject } from '@/lib/dashboard/map-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? { title: 'Project — Progressly' }
    : { title: 'Projeto — Progressly' }
}

function getUserInitials(name: string): string {
  return name
    .split(/[\s@]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>
}) {
  const { locale, projectId } = await params
  setRequestLocale(locale)

  const { organization, user } = await getOrganizationOrRedirectOnboarding()

  const [project, clients] = await Promise.all([
    prisma.project.findFirst({
      where: { id: projectId, organizationId: organization.id },
      include: { client: true },
    }),
    prisma.client.findMany({
      where: { organizationId: organization.id },
      orderBy: { name: 'asc' },
    }),
  ])

  if (!project) {
    notFound()
  }

  const displayName = user.name ?? user.email.split('@')[0]

  return (
    <ProjectDetailPageClient
      organizationName={organization.name}
      userName={displayName}
      userInitials={getUserInitials(user.name ?? user.email) || 'U'}
      clients={clients.map(mapClient)}
      project={mapProject(project, organization.name, locale)}
    />
  )
}
