import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ProjectsPageClient } from '@/components/dashboard/ProjectsPageClient'
import { getOrganizationOrRedirectOnboarding } from '@/lib/auth/get-organization'
import { prisma } from '@/lib/prisma'
import { mapClient, mapMilestone, mapProject } from '@/lib/dashboard/map-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? { title: 'Projects — Progressly' }
    : { title: 'Projetos — Progressly' }
}

function getUserInitials(name: string): string {
  return name
    .split(/[\s@]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { organization, user } = await getOrganizationOrRedirectOnboarding()
  const organizationId = organization.id

  const [clients, projects, milestones] = await Promise.all([
    prisma.client.findMany({
      where: { organizationId },
      orderBy: { name: 'asc' },
    }),
    prisma.project.findMany({
      where: { organizationId },
      include: { client: true },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.milestone.findMany({
      where: { project: { organizationId } },
    }),
  ])

  const displayName = user.name ?? user.email.split('@')[0]

  return (
    <ProjectsPageClient
      organizationName={organization.name}
      userName={displayName}
      userInitials={getUserInitials(user.name ?? user.email) || 'U'}
      clients={clients.map(mapClient)}
      projects={projects.map((p) => mapProject(p, organization.name, locale))}
      milestones={milestones.map(mapMilestone)}
    />
  )
}
