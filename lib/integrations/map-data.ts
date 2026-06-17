import type { OrganizationIntegration } from '@/src/generated/prisma/client'
import { INTEGRATION_CATALOG } from '@/lib/integrations/catalog'
import type { DashboardIntegration, TimelineEventSource } from '@/lib/dashboard/types'

export function mapIntegrations(rows: OrganizationIntegration[]): DashboardIntegration[] {
  const statusByProvider = new Map(rows.map((row) => [row.provider, row.status]))

  return INTEGRATION_CATALOG.map((entry) => ({
    provider: entry.provider,
    icon: entry.icon,
    timelineSource: entry.timelineSource,
    connected: statusByProvider.get(entry.provider) === 'CONNECTED',
  }))
}

export function getConnectedTimelineSources(
  rows: OrganizationIntegration[]
): TimelineEventSource[] {
  const connectedProviders = new Set(
    rows.filter((row) => row.status === 'CONNECTED').map((row) => row.provider)
  )

  return INTEGRATION_CATALOG.filter(
    (entry) => entry.timelineSource && connectedProviders.has(entry.provider)
  ).map((entry) => entry.timelineSource as TimelineEventSource)
}
