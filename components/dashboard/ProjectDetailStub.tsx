'use client'

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import type { DashboardProject } from '@/lib/dashboard/types'

interface ProjectDetailStubProps {
  project: DashboardProject
}

export function ProjectDetailStub({ project }: ProjectDetailStubProps) {
  const t = useTranslations('Dashboard.projectsPage')

  return (
    <div className="space-y-6 max-w-2xl">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#C6FF4A] transition-colors"
      >
        <ArrowLeft size={16} />
        {t('backToProjects')}
      </Link>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{project.name}</h1>
        <p className="text-[#888888] text-sm">{project.client}</p>
      </div>

      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8 md:p-12 text-center">
        <p className="text-[10px] font-semibold text-[#444444] uppercase tracking-[0.2em] mb-3">
          {t('comingSoon')}
        </p>
        <p className="text-sm text-[#888888]">{project.description ?? '—'}</p>
      </div>
    </div>
  )
}
