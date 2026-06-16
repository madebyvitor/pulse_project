import type {
  Client,
  Milestone,
  Project,
  ProjectStatus as PrismaProjectStatus,
  TimelineEvent,
  TimelineEventSource as PrismaTimelineEventSource,
  TimelineEventStatus as PrismaTimelineEventStatus,
  TimelineEventType as PrismaTimelineEventType,
} from '@/src/generated/prisma/client'
import type {
  Activity,
  DashboardClient,
  DashboardProject,
  DashboardTimelineEvent,
  ProjectStatus,
  TimelineEventSource,
  TimelineEventStatus,
  TimelineEventType,
} from '@/lib/dashboard/types'

const STATUS_MAP: Record<PrismaProjectStatus, ProjectStatus> = {
  DESIGN: 'Design',
  DEV: 'Dev',
  DONE: 'Done',
}

const TIMELINE_TYPE_MAP: Record<PrismaTimelineEventType, TimelineEventType> = {
  MILESTONE: 'milestone',
  DESIGN: 'design',
  DEPLOY: 'deploy',
  ROCKET: 'rocket',
  MANUAL: 'manual',
}

const TIMELINE_STATUS_MAP: Record<PrismaTimelineEventStatus, TimelineEventStatus> = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  PENDING: 'pending',
}

const SOURCE_MAP: Record<PrismaTimelineEventSource, TimelineEventSource> = {
  GITHUB: 'github',
  VERCEL: 'vercel',
  FIGMA: 'figma',
  MANUAL: 'manual',
}

export function mapProjectStatus(status: PrismaProjectStatus): ProjectStatus {
  return STATUS_MAP[status]
}

export function toPrismaProjectStatus(status: ProjectStatus): PrismaProjectStatus {
  const entry = Object.entries(STATUS_MAP).find(([, value]) => value === status)
  return (entry?.[0] ?? 'DESIGN') as PrismaProjectStatus
}

export function formatRelativeTime(date: Date, locale: string): string {
  const now = Date.now()
  const diffMs = now - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (locale.startsWith('pt')) {
    if (diffMinutes < 1) return 'Agora'
    if (diffMinutes < 60) return `Há ${diffMinutes} min`
    if (diffHours < 24) return `Há ${diffHours}h`
    if (diffDays === 1) return 'Ontem'
    return `Há ${diffDays} dias`
  }

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays}d ago`
}

export function mapClient(
  client: Client & { _count?: { projects: number } }
): DashboardClient {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    projectCount: client._count?.projects ?? 0,
  }
}

export function mapProject(
  project: Project & { client: Client },
  agencyName: string,
  locale: string
): DashboardProject {
  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    description: project.description ?? undefined,
    clientId: project.clientId,
    client: project.client.name,
    clientEmail: project.client.email,
    status: mapProjectStatus(project.status),
    lastUpdate: formatRelativeTime(project.updatedAt, locale),
    agencyName,
  }
}

export function mapMilestone(milestone: Milestone) {
  return {
    id: milestone.id,
    projectId: milestone.projectId,
    title: milestone.title,
    description: milestone.description ?? undefined,
    completed: milestone.completed,
  }
}

export function mapTimelineEvent(
  event: TimelineEvent,
  locale: string,
  projectName = ''
): DashboardTimelineEvent {
  return {
    id: event.id,
    projectId: event.projectId,
    title: event.title,
    description: event.description ?? '',
    timestamp: formatRelativeTime(event.createdAt, locale),
    status: TIMELINE_STATUS_MAP[event.status],
    type: TIMELINE_TYPE_MAP[event.type],
    source: SOURCE_MAP[event.source],
    projectName,
    createdAt: event.createdAt.toISOString(),
  }
}

export function mapTimelineEventWithProject(
  event: TimelineEvent & { project: Project },
  locale: string
): DashboardTimelineEvent {
  return mapTimelineEvent(event, locale, event.project.name)
}

export function mapTimelineEventsToActivities(
  events: (TimelineEvent & { project: Project })[],
  locale: string
): Activity[] {
  return events.map((event) => ({
    id: event.id,
    type: event.type === 'MILESTONE' ? 'milestone' : 'deploy',
    content: `[${event.project.name}] ${event.title}`,
    time: formatRelativeTime(event.createdAt, locale),
  }))
}

export function deriveProjectStatusFromProgress(progress: number): PrismaProjectStatus {
  if (progress >= 100) return 'DONE'
  if (progress > 0) return 'DEV'
  return 'DESIGN'
}
