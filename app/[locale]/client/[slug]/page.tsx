import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ClientPortalView } from '@/components/client-portal/ClientPortalView'
import { prisma } from '@/lib/prisma'
import { calculateProgress } from '@/lib/milestones'
import { mapMilestone, mapProject, mapTimelineEvent } from '@/lib/dashboard/map-data'

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      client: true,
      organization: true,
      milestones: true,
      timelineEvents: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!project) {
    notFound()
  }

  const mappedProject = mapProject(project, project.organization.name, locale)
  const milestones = project.milestones.map(mapMilestone)
  const progress = calculateProgress(milestones, project.id)
  const timelineEvents = project.timelineEvents.map((event) => mapTimelineEvent(event, locale))

  return (
    <ClientPortalView
      project={mappedProject}
      progress={progress}
      timelineEvents={timelineEvents}
    />
  )
}
