'use client'

import { useTransition } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { toggleIntegrationAction } from '@/app/actions/integrations'
import { IntegrationIconDisplay } from '@/components/dashboard/IntegrationIconDisplay'
import type { DashboardIntegration } from '@/lib/dashboard/types'

interface IntegrationCardProps {
  integration: DashboardIntegration
  index: number
}

const CARD_KEY_BY_PROVIDER = {
  GITHUB: 'github',
  VERCEL: 'vercel',
  FIGMA: 'figma',
  SLACK: 'slack',
} as const

export function IntegrationCard({ integration, index }: IntegrationCardProps) {
  const t = useTranslations('Dashboard.integrationsPage')
  const cardKey = CARD_KEY_BY_PROVIDER[integration.provider]
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      await toggleIntegrationAction(integration.provider, !integration.connected)
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="bg-[#111111] border border-[#27272A] rounded-2xl p-5 md:p-6 flex flex-col gap-4 hover:border-[#3F3F46] hover:shadow-[0_0_20px_rgba(198,255,74,0.05)] transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#C6FF4A]/10 flex items-center justify-center text-[#C6FF4A] shrink-0">
          <IntegrationIconDisplay icon={integration.icon} />
        </div>

        {integration.connected ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C6FF4A]/10 text-[#C6FF4A] border border-[#C6FF4A]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF4A] animate-pulse" />
            {t('status.connected')}
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#27272A]/50 text-[#71717A] border border-[#27272A]">
            {t('status.disconnected')}
          </span>
        )}
      </div>

      <div className="space-y-1.5 flex-1">
        <h3 className="font-bold text-sm text-white">{t(`cards.${cardKey}.name`)}</h3>
        <p className="text-xs text-[#888888] leading-relaxed">{t(`cards.${cardKey}.description`)}</p>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all disabled:opacity-50 active:scale-[0.98] ${
          integration.connected
            ? 'bg-transparent text-[#EF4444] border border-transparent hover:bg-[#EF4444]/5'
            : 'bg-[#C6FF4A] text-black hover:opacity-90'
        }`}
      >
        {integration.connected ? t('actions.disconnect') : t('actions.connect')}
      </button>
    </motion.div>
  )
}
