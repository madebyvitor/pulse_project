import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { TimelinePageClient } from '@/components/dashboard/TimelinePageClient'
import { getOrganizationOrRedirectOnboarding } from '@/lib/auth/get-organization'
import { prisma } from '@/lib/prisma'
import { mapClient, mapProject, mapTimelineEventWithProject } from '@/lib/dashboard/map-data'
import { calculateAgencyProgress } from '@/lib/dashboard/timeline-utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? { title: 'Timeline — Progressly' }
    : { title: 'Timeline — Progressly' }
}

function getUserInitials(name: string): string {
  return name
    .split(/[\s@]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { organization, user } = await getOrganizationOrRedirectOnboarding()
  const organizationId = organization.id

  const [clients, events, projects] = await Promise.all([
    prisma.client.findMany({
      where: { organizationId },
      orderBy: { name: 'asc' },
    }),
    prisma.timelineEvent.findMany({
      where: { project: { organizationId } },
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.findMany({
      where: { organizationId },
      include: { client: true },
      orderBy: { updatedAt: 'desc' },
    }),
  ])

  const displayName = user.name ?? user.email.split('@')[0]
  const mappedProjects = projects.map((p) => mapProject(p, organization.name, locale))
  const mappedEvents = events.map((e) => mapTimelineEventWithProject(e, locale))
  const agencyProgress = calculateAgencyProgress(projects)
  const activeProjectCount = projects.filter((p) => p.status !== 'DONE').length

  return (
    <TimelinePageClient
      organizationName={organization.name}
      userName={displayName}
      userInitials={getUserInitials(user.name ?? user.email) || 'U'}
      events={mappedEvents}
      projects={mappedProjects}
      clients={clients.map(mapClient)}
      agencyProgress={agencyProgress}
      activeProjectCount={activeProjectCount}
    />
  )
}
