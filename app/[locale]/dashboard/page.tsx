import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { AgencyDashboard } from '@/components/dashboard/AgencyDashboard'
import { getOrganizationOrRedirectOnboarding } from '@/lib/auth/get-organization'
import { prisma } from '@/lib/prisma'
import {
  mapClient,
  mapMilestone,
  mapProject,
  mapTimelineEventsToActivities,
} from '@/lib/dashboard/map-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? { title: 'Dashboard — Progressly' }
    : { title: 'Dashboard — Progressly' }
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { organization, user } = await getOrganizationOrRedirectOnboarding()
  const organizationId = organization.id

  const [clients, projects, milestones, recentEvents] = await Promise.all([
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
    prisma.timelineEvent.findMany({
      where: { project: { organizationId } },
      include: { project: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const userInitials = (user.name ?? user.email)
    .split(/[\s@]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <AgencyDashboard
      organizationName={organization.name}
      userName={user.name ?? user.email.split('@')[0]}
      userInitials={userInitials || 'U'}
      clients={clients.map(mapClient)}
      projects={projects.map((p) => mapProject(p, organization.name, locale))}
      milestones={milestones.map(mapMilestone)}
      activities={mapTimelineEventsToActivities(recentEvents, locale)}
    />
  )
}
