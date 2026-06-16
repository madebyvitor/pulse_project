'use client'

import React from 'react'
import { GitBranch, Rocket, Layout, Zap, Circle, Milestone } from 'lucide-react'
import { getEventVisual, type EventVisual } from '@/lib/dashboard/timeline-utils'
import type { DashboardTimelineEvent } from '@/lib/dashboard/types'

interface TimelineFeedItemProps {
  event: DashboardTimelineEvent
  isLast?: boolean
}

function EventIcon({ visual }: { visual: EventVisual }) {
  const className = `w-4 h-4 ${visual.iconColorClass.split(' ')[0]}`

  switch (visual.iconName) {
    case 'gitBranch':
      return <GitBranch size={16} className={className} />
    case 'rocket':
      return <Rocket size={16} className={className} />
    case 'layout':
      return <Layout size={16} className={className} />
    case 'zap':
      return <Zap size={16} className={className} />
    case 'milestone':
      return <Milestone size={16} className={className} />
    default:
      return <Circle size={16} className={className} />
  }
}

export const TimelineFeedItem: React.FC<TimelineFeedItemProps> = ({ event, isLast = false }) => {
  const visual = getEventVisual(event.source, event.type)

  return (
    <div className={`flex gap-4 -ml-4 ${isLast ? 'pb-0' : 'pb-8'}`}>
      <div className="flex flex-col items-center shrink-0 w-8">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[#0a0a0a] ${visual.iconColorClass}`}
        >
          <EventIcon visual={visual} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-[24px] border-l border-dashed border-[#222222] mt-1" />
        )}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-white tracking-tight">{event.title}</h4>
          <span className="text-[10px] font-bold uppercase tracking-wider border border-[#333333] rounded-full px-2 py-0.5 text-[#888888]">
            {visual.badgeLabel}
          </span>
        </div>

        {event.description && (
          <p className="text-sm text-[#888888] leading-relaxed mb-2">{event.description}</p>
        )}

        <div className="flex items-center gap-2 text-[10px] font-medium text-[#444444] uppercase tracking-wider">
          <span className="text-[#666666]">{event.projectName}</span>
          <span>·</span>
          <span>{event.timestamp}</span>
        </div>
      </div>
    </div>
  )
}
