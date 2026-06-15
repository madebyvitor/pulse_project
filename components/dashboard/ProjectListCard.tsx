'use client'

import { Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { ProgressBar } from './ProgressBar'
import type { DashboardProject } from '@/lib/dashboard/types'

interface ProjectListCardProps {
  project: DashboardProject
  progress: number
}

export function ProjectListCard({ project, progress }: ProjectListCardProps) {
  const t = useTranslations('Dashboard.projectsPage')

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="block bg-white/[0.03] border border-[#222222] border-l-2 border-l-transparent rounded-xl p-4 hover:border-l-[#C6FF4A]/40 hover:bg-white/[0.05] transition-all group"
    >
      <div className="mb-3 min-w-0">
        <p className="font-bold text-sm text-white truncate group-hover:text-[#C6FF4A] transition-colors">
          {project.name}
        </p>
        <p className="text-xs text-[#888888] truncate mt-0.5">{project.client}</p>
      </div>

      <ProgressBar progress={progress} showPercentage={false} size="sm" animated={false} />

      <div className="flex justify-between items-center mt-2">
        <span className="text-[10px] font-semibold text-[#444444] uppercase tracking-[0.2em] flex items-center gap-1">
          <Clock size={12} className="shrink-0" />
          {project.lastUpdate}
        </span>
        <span className="text-[10px] text-[#C6FF4A] font-bold">{progress}%</span>
      </div>

      <span className="sr-only">
        {t('lastUpdated')}: {project.lastUpdate}
      </span>
    </Link>
  )
}
