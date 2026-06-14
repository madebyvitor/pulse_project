'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Users, Mail, Plus } from 'lucide-react'
import { FormSubmitButton } from '@/components/dashboard/FormSubmitButton'
import { createClientAction } from '@/app/actions/dashboard'
import type { DashboardClient } from '@/lib/dashboard/types'

interface ClientsSectionProps {
  clients: DashboardClient[]
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  const t = useTranslations('Dashboard.clients')
  const [, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createClientAction(formData)
      ;(document.getElementById('new-client-form') as HTMLFormElement | null)?.reset()
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{t('title')}</h1>
        <p className="text-[#888888] text-xs md:text-sm">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#222222] bg-[#161616]/50">
            <h2 className="font-bold text-base md:text-lg">{t('listTitle')}</h2>
          </div>
          <div className="p-4 md:p-6 space-y-3">
            {clients.length === 0 ? (
              <p className="text-sm text-[#444444] text-center py-8">{t('empty')}</p>
            ) : (
              clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#222222] hover:border-[#333333] transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center shrink-0">
                    <Users size={16} className="text-[#888888]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{client.name}</p>
                    <p className="text-xs text-[#888888] flex items-center gap-1 truncate">
                      <Mail size={12} />
                      {client.email}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#222222] bg-[#161616]/50 flex items-center gap-2">
            <Plus size={16} className="text-[#C6FF4A]" />
            <h2 className="font-bold text-base md:text-lg">{t('addTitle')}</h2>
          </div>
          <form id="new-client-form" action={handleSubmit} className="p-4 md:p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                {t('nameLabel')}
              </label>
              <input
                name="name"
                required
                minLength={2}
                placeholder={t('namePlaceholder')}
                className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                {t('emailLabel')}
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
              />
            </div>
            <FormSubmitButton label={t('addButton')} loadingLabel={t('adding')} className="w-full" />
          </form>
        </div>
      </div>
    </div>
  )
}
