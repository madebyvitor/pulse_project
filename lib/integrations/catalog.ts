import type { TimelineEventSource } from '@/lib/dashboard/types'

export const INTEGRATION_CATALOG = [
  { provider: 'GITHUB', icon: 'github', timelineSource: 'github' as TimelineEventSource },
  { provider: 'VERCEL', icon: 'vercel', timelineSource: 'vercel' as TimelineEventSource },
  { provider: 'FIGMA', icon: 'figma', timelineSource: 'figma' as TimelineEventSource },
  { provider: 'SLACK', icon: 'slack', timelineSource: null },
] as const

export type IntegrationProviderKey = (typeof INTEGRATION_CATALOG)[number]['provider']
export type IntegrationIconKey = (typeof INTEGRATION_CATALOG)[number]['icon']
