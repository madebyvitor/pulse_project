import type { Project } from '@/src/generated/prisma/client'
import type { DashboardTimelineEvent, TimelineEventSource, TimelineEventType } from '@/lib/dashboard/types'

export type DateGroupKey = 'today' | 'yesterday' | 'thisWeek' | 'earlier'

export interface TimelineDateGroup {
  key: DateGroupKey
  events: DashboardTimelineEvent[]
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function getDateGroupKey(date: Date, now: Date): DateGroupKey {
  const today = startOfDay(now)
  const eventDay = startOfDay(date)
  const diffDays = Math.floor((today.getTime() - eventDay.getTime()) / 86400000)

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'

  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())

  if (eventDay >= startOfWeek) return 'thisWeek'
  return 'earlier'
}

export function groupEventsByDate(events: DashboardTimelineEvent[]): TimelineDateGroup[] {
  const now = new Date()
  const groups: Record<DateGroupKey, DashboardTimelineEvent[]> = {
    today: [],
    yesterday: [],
    thisWeek: [],
    earlier: [],
  }

  for (const event of events) {
    const key = getDateGroupKey(new Date(event.createdAt), now)
    groups[key].push(event)
  }

  const order: DateGroupKey[] = ['today', 'yesterday', 'thisWeek', 'earlier']

  return order
    .filter((key) => groups[key].length > 0)
    .map((key) => ({
      key,
      events: groups[key],
    }))
}

export function calculateAgencyProgress(projects: Pick<Project, 'progress' | 'status'>[]): number {
  const activeProjects = projects.filter((p) => p.status !== 'DONE')
  if (activeProjects.length === 0) return 0
  const total = activeProjects.reduce((sum, p) => sum + p.progress, 0)
  return Math.round(total / activeProjects.length)
}

export interface EventVisual {
  iconName: 'gitBranch' | 'rocket' | 'layout' | 'zap' | 'milestone' | 'circle'
  iconColorClass: string
  badgeLabel: string
}

const SOURCE_BADGE_LABELS: Record<TimelineEventSource, string> = {
  github: 'GitHub',
  vercel: 'Vercel',
  figma: 'Figma',
  manual: 'Manual',
}

export function getEventVisual(
  source: TimelineEventSource,
  type: TimelineEventType
): EventVisual {
  const badgeLabel = SOURCE_BADGE_LABELS[source]

  if (source === 'github') {
    return { iconName: 'gitBranch', iconColorClass: 'text-emerald-400 bg-emerald-500/10', badgeLabel }
  }
  if (source === 'vercel') {
    return { iconName: 'rocket', iconColorClass: 'text-white bg-white/10', badgeLabel }
  }
  if (source === 'figma') {
    return { iconName: 'layout', iconColorClass: 'text-purple-400 bg-purple-500/10', badgeLabel }
  }
  if (source === 'manual') {
    return { iconName: 'zap', iconColorClass: 'text-amber-400 bg-amber-500/10', badgeLabel }
  }

  switch (type) {
    case 'deploy':
    case 'rocket':
      return { iconName: 'rocket', iconColorClass: 'text-blue-400 bg-blue-500/10', badgeLabel }
    case 'design':
      return { iconName: 'layout', iconColorClass: 'text-purple-400 bg-purple-500/10', badgeLabel }
    case 'milestone':
      return { iconName: 'milestone', iconColorClass: 'text-[#C6FF4A] bg-[#C6FF4A]/10', badgeLabel }
    default:
      return { iconName: 'circle', iconColorClass: 'text-[#888888] bg-[#222222]', badgeLabel }
  }
}

export function filterEventsBySource(
  events: DashboardTimelineEvent[],
  filter: 'all' | TimelineEventSource
): DashboardTimelineEvent[] {
  if (filter === 'all') return events
  return events.filter((e) => e.source === filter)
}
