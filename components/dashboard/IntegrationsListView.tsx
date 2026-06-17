'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { IntegrationCard } from '@/components/dashboard/IntegrationCard'
import { FeedbackModal } from '@/components/dashboard/FeedbackModal'
import type { DashboardIntegration } from '@/lib/dashboard/types'

interface IntegrationsListViewProps {
  integrations: DashboardIntegration[]
}

const CARD_KEY_BY_PROVIDER = {
  GITHUB: 'github',
  VERCEL: 'vercel',
  FIGMA: 'figma',
  SLACK: 'slack',
} as const

export function IntegrationsListView({ integrations }: IntegrationsListViewProps) {
  const t = useTranslations('Dashboard.integrationsPage')
  const [searchQuery, setSearchQuery] = useState('')
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const activeCount = integrations.filter((item) => item.connected).length

  const filteredIntegrations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return integrations

    return integrations.filter((item) => {
      const cardKey = CARD_KEY_BY_PROVIDER[item.provider]
      const name = t(`cards.${cardKey}.name`).toLowerCase()
      const description = t(`cards.${cardKey}.description`).toLowerCase()
      return name.includes(query) || description.includes(query)
    })
  }, [integrations, searchQuery, t])

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('title')}</h1>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#111111] border border-[#27272A] text-[#888888]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF4A] animate-pulse" />
                {t('activeConnections', { count: activeCount })}
              </span>
            </div>
            <p className="text-[#888888] text-xs md:text-sm">{t('subtitle')}</p>
          </div>
        </div>

        <div className="relative group max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444444] group-focus-within:text-[#C6FF4A] transition-colors"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#111111] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C6FF4A]/30 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
          />
        </div>

        {filteredIntegrations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredIntegrations.map((integration, index) => (
                <IntegrationCard key={integration.provider} integration={integration} index={index} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-[#111111] border border-[#222222] rounded-2xl py-16 px-6 text-center">
            <p className="text-sm text-[#444444]">
              {searchQuery ? `${t('noResults')} "${searchQuery}"` : t('empty')}
            </p>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="text-xs font-medium text-[#888888] hover:text-[#C6FF4A] transition-colors underline-offset-4 hover:underline"
          >
            {t('requestIntegration')}
          </button>
        </div>
      </div>

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        defaultCategory="NEW_INTEGRATION"
      />
    </>
  )
}
