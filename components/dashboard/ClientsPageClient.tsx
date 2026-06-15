'use client'

import { useState } from 'react'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { ClientsListView } from '@/components/dashboard/ClientsListView'
import { NewClientModal } from '@/components/dashboard/NewClientModal'
import type { DashboardClient } from '@/lib/dashboard/types'

interface ClientsPageClientProps {
  organizationName: string
  userName: string
  userInitials: string
  clients: DashboardClient[]
}

export function ClientsPageClient({
  organizationName,
  userName,
  userInitials,
  clients,
}: ClientsPageClientProps) {
  const [newClientOpen, setNewClientOpen] = useState(false)

  const openNewClient = () => setNewClientOpen(true)

  return (
    <>
      <NewClientModal open={newClientOpen} onClose={() => setNewClientOpen(false)} />

      <DashboardShell
        activeSection="clients"
        userName={userName}
        organizationName={organizationName}
        userInitials={userInitials}
        clients={clients}
        onNewClient={openNewClient}
      >
        <ClientsListView clients={clients} onNewClient={openNewClient} />
      </DashboardShell>
    </>
  )
}
