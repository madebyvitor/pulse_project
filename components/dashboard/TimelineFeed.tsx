'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { TimelineFeedItem } from '@/components/dashboard/TimelineFeedItem'
import {
  filterEventsBySource,
  groupEventsByDate,
  type TimelineDateGroup,
} from '@/lib/dashboard/timeline-utils'
import type { DashboardTimelineEvent, TimelineEventSource } from '@/lib/dashboard/types'

interface TimelineFeedProps {
  events: DashboardTimelineEvent[]
}

type SourceFilter = 'all' | TimelineEventSource

const FILTER_KEYS: SourceFilter[] = ['all', 'github', 'vercel', 'figma', 'manual']

export const TimelineFeed: React.FC<TimelineFeedProps> = ({ events }) => {
  const t = useTranslations('Dashboard.timelinePage')
  const [filter, setFilter] = useState<SourceFilter>('all')

  const filteredEvents = useMemo(
    () => filterEventsBySource(events, filter),
    [events, filter]
  )

  const groups: TimelineDateGroup[] = useMemo(
    () => groupEventsByDate(filteredEvents),
    [filteredEvents]
  )

  const filterLabel = (key: SourceFilter) => t(`filters.${key}`)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {FILTER_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
              filter === key
                ? 'bg-[#C6FF4A]/10 text-[#C6FF4A] border-[#C6FF4A]/30'
                : 'bg-transparent text-[#888888] border-[#222222] hover:border-[#333333] hover:text-white'
            }`}
          >
            {filterLabel(key)}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-12 text-center">
          <p className="text-sm text-[#444444]">
            {filter === 'all' ? t('empty') : t('emptyFiltered')}
          </p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {groups.map((group) => (
            <motion.section
              key={group.key}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-4"
            >
              <h3 className="text-[10px] font-bold text-[#444444] uppercase tracking-tight">
                {t(`groups.${group.key}`)}
              </h3>

              <div className="relative ml-4 border-l border-dashed border-[#222222]">
                {group.events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                  >
                    <TimelineFeedItem
                      event={event}
                      isLast={index === group.events.length - 1}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}
