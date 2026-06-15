'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { deleteClientAction } from '@/app/actions/dashboard'
import { getInitials } from '@/lib/dashboard/get-initials'
import type { DashboardClient } from '@/lib/dashboard/types'

interface ClientListCardProps {
  client: DashboardClient
}

export function ClientListCard({ client }: ClientListCardProps) {
  const t = useTranslations('Dashboard.clientsPage')
  const [isPending, startTransition] = useTransition()

  const canDelete = client.projectCount === 0

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!canDelete || isPending) return
    if (!window.confirm(t('deleteConfirm'))) return

    startTransition(async () => {
      await deleteClientAction(client.id)
    })
  }

  return (
    <div className="relative bg-white/[0.03] border border-[#222222] border-l-2 border-l-transparent rounded-xl hover:border-l-[#C6FF4A]/40 hover:bg-white/[0.05] transition-all group">
      <Link
        href={`/dashboard/projects?clientId=${client.id}`}
        className="block p-4 pr-12"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center shrink-0 text-xs font-bold text-white">
            {getInitials(client.name) || '?'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-white truncate group-hover:text-[#C6FF4A] transition-colors">
              {client.name}
            </p>
            <p className="text-xs text-[#888888] truncate mt-0.5">{client.email}</p>
          </div>
        </div>

        <span className="text-[10px] font-semibold text-[#444444] uppercase tracking-[0.2em]">
          {t('activeProjects', { count: client.projectCount })}
        </span>
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={!canDelete || isPending}
        title={canDelete ? t('delete') : t('deleteDisabled')}
        className="absolute top-4 right-4 p-1.5 rounded-md text-[#444444] hover:text-red-400 hover:bg-[#1a1a1a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#444444] disabled:hover:bg-transparent"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
