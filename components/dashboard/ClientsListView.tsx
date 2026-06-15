'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ClientListCard } from './ClientListCard'
import type { DashboardClient } from '@/lib/dashboard/types'

interface ClientsListViewProps {
  clients: DashboardClient[]
  onNewClient: () => void
}

export function ClientsListView({ clients, onNewClient }: ClientsListViewProps) {
  const t = useTranslations('Dashboard.clientsPage')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{t('title')}</h1>
          <p className="text-[#888888] text-xs md:text-sm">{t('subtitle')}</p>
        </div>
        <button
          onClick={onNewClient}
          className="flex bg-[#C6FF4A] text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all items-center gap-2 shrink-0 justify-center"
        >
          <Plus size={16} />
          {t('newClient')}
        </button>
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

      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredClients.map((client) => (
            <ClientListCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#222222] rounded-2xl py-16 px-6 text-center">
          <p className="text-sm text-[#444444]">
            {searchQuery ? `${t('noResults')} "${searchQuery}"` : t('empty')}
          </p>
        </div>
      )}
    </div>
  )
}
