'use client'

import React from 'react'
import { Plug } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ProgressBar } from '@/components/dashboard/ProgressBar'

interface TimelineAsideProps {
  agencyProgress: number
  activeProjectCount: number
  onConfigureIntegrations: () => void
}

export const TimelineAside: React.FC<TimelineAsideProps> = ({
  agencyProgress,
  activeProjectCount,
  onConfigureIntegrations,
}) => {
  const t = useTranslations('Dashboard.timelinePage')

  return (
    <div className="space-y-6">
      <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-[#222222] bg-[#161616]/50">
          <h3 className="font-bold text-base">{t('progress.title')}</h3>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          <ProgressBar progress={agencyProgress} label={t('progress.title')} size="lg" />
          <p className="text-[10px] text-[#444444] font-bold uppercase tracking-widest">
            {t('progress.activeProjects', { count: activeProjectCount })}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfigureIntegrations}
        className="w-full text-left bg-[#111111] border border-dashed border-[#222222] hover:border-[#C6FF4A]/30 rounded-2xl p-4 md:p-6 transition-all group"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C6FF4A]/10 flex items-center justify-center text-[#C6FF4A] shrink-0 group-hover:bg-[#C6FF4A]/20 transition-colors">
            <Plug size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm mb-1 group-hover:text-[#C6FF4A] transition-colors">
              {t('integrations.title')}
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed mb-3">
              {t('integrations.description')}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6FF4A]">
              {t('integrations.cta')}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}
