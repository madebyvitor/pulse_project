'use client'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { IntegrationsListView } from '@/components/dashboard/IntegrationsListView'
import type { DashboardClient, DashboardIntegration } from '@/lib/dashboard/types'

interface IntegrationsPageClientProps {
  organizationName: string
  userName: string
  userInitials: string
  clients: DashboardClient[]
  integrations: DashboardIntegration[]
}

export function IntegrationsPageClient({
  organizationName,
  userName,
  userInitials,
  clients,
  integrations,
}: IntegrationsPageClientProps) {
  return (
    <DashboardShell
      activeSection="integrations"
      userName={userName}
      organizationName={organizationName}
      userInitials={userInitials}
      clients={clients}
    >
      <IntegrationsListView integrations={integrations} />
    </DashboardShell>
  )
}
