'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { TimelineFeed } from '@/components/dashboard/TimelineFeed'
import { TimelineAside } from '@/components/dashboard/TimelineAside'
import { AddTimelineEventModal } from '@/components/dashboard/AddTimelineEventModal'
import { ComingSoonModal } from '@/components/shared/ComingSoonModal'
import type { DashboardClient, DashboardProject, DashboardTimelineEvent } from '@/lib/dashboard/types'

interface TimelinePageClientProps {
  organizationName: string
  userName: string
  userInitials: string
  events: DashboardTimelineEvent[]
  projects: DashboardProject[]
  clients: DashboardClient[]
  agencyProgress: number
  activeProjectCount: number
}

export function TimelinePageClient({
  organizationName,
  userName,
  userInitials,
  events,
  projects,
  clients,
  agencyProgress,
  activeProjectCount,
}: TimelinePageClientProps) {
  const t = useTranslations('Dashboard.timelinePage')
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [integrationsOpen, setIntegrationsOpen] = useState(false)

  return (
    <>
      <DashboardShell
        activeSection="timeline"
        userName={userName}
        organizationName={organizationName}
        userInitials={userInitials}
        clients={clients}
        headerContent={
          <button
            type="button"
            onClick={() => setEventModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C6FF4A] text-black rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={16} />
            {t('newEvent')}
          </button>
        }
      >
        <div className="space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
              {t('title')}
            </h1>
            <p className="text-sm text-[#888888]">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 md:gap-8">
            <TimelineFeed events={events} />
            <TimelineAside
              agencyProgress={agencyProgress}
              activeProjectCount={activeProjectCount}
              onConfigureIntegrations={() => setIntegrationsOpen(true)}
            />
          </div>
        </div>
      </DashboardShell>

      <AddTimelineEventModal
        open={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        projects={projects}
      />

      <ComingSoonModal
        open={integrationsOpen}
        onClose={() => setIntegrationsOpen(false)}
        feature={t('integrations.featureName')}
      />
    </>
  )
}
