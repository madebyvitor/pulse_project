'use client'

import React, { useTransition } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  LogOut,
  Plus,
  History,
} from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import { logout } from '@/app/actions/auth'

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

const SidebarLink = ({ href, icon, label, active }: SidebarLinkProps) => (
  <Link
    href={href}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
      active
        ? 'bg-[#1a1a1a] text-[#C6FF4A]'
        : 'text-[#888888] hover:bg-[#111111] hover:text-white'
    }`}
  >
    <span className={`${active ? 'text-[#C6FF4A]' : 'text-[#888888] group-hover:text-white'}`}>
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
    {active && <div className="ml-auto w-1 h-4 bg-[#C6FF4A] rounded-full" />}
  </Link>
)

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
      active
        ? 'bg-[#1a1a1a] text-[#C6FF4A]'
        : 'text-[#888888] hover:bg-[#111111] hover:text-white'
    }`}
  >
    <span className={`${active ? 'text-[#C6FF4A]' : 'text-[#888888] group-hover:text-white'}`}>
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
    {active && <div className="ml-auto w-1 h-4 bg-[#C6FF4A] rounded-full" />}
  </button>
)

export type DashboardSection = 'dashboard' | 'projects' | 'clients' | 'timeline'

interface AgencySidebarProps {
  activeSection?: DashboardSection
  onSectionChange?: (section: DashboardSection) => void
  onNewProject?: () => void
  userName?: string
  organizationName?: string
  userInitials?: string
}

export const AgencySidebar: React.FC<AgencySidebarProps> = ({
  activeSection = 'dashboard',
  onSectionChange,
  onNewProject,
  userName = 'User',
  organizationName = 'Agency',
  userInitials = 'U',
}) => {
  const t = useTranslations('Dashboard.sidebar')
  const [isSigningOut, startSignOut] = useTransition()

  const handleSignOut = () => {
    startSignOut(async () => {
      await logout()
    })
  }

  return (
    <div className="w-64 h-screen bg-[#050505] border-r border-[#222222] flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Image src="/logotipo.svg" alt="Progressly Logo" width={32} height={32} className="w-8 h-8 shrink-0" />
        <span className="text-xl font-bold tracking-tight text-white">Progressly</span>
      </div>

      <div className="space-y-1 mb-auto">
        <div className="text-[10px] font-bold text-[#444444] uppercase tracking-widest px-3 mb-2">
          {t('mainSection')}
        </div>
        <SidebarLink
          href="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label={t('dashboard')}
          active={activeSection === 'dashboard'}
        />
        <SidebarLink
          href="/dashboard/projects"
          icon={<FolderKanban size={18} />}
          label={t('projects')}
          active={activeSection === 'projects'}
        />
        <SidebarLink
          href="/dashboard/clients"
          icon={<Users size={18} />}
          label={t('clients')}
          active={activeSection === 'clients'}
        />
        <SidebarLink
          href="/dashboard/timeline"
          icon={<History size={18} />}
          label={t('timeline')}
          active={activeSection === 'timeline'}
        />

        <div className="text-[10px] font-bold text-[#444444] uppercase tracking-widest px-3 mb-2 mt-6">
          {t('systemSection')}
        </div>
        <SidebarItem icon={<Settings size={18} />} label={t('settings')} />
      </div>

      <div className="mt-auto border-t border-[#222222] pt-4">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          aria-label={t('signOut')}
          className="w-full flex items-center gap-3 px-3 py-2 text-[#888888] hover:text-white transition-colors mb-4 disabled:opacity-50"
        >
          <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-xs font-bold shrink-0">
            {userInitials}
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-medium text-white truncate max-w-[140px]">{userName}</span>
            <span className="text-[10px] text-[#444444] truncate max-w-[140px]">{organizationName}</span>
          </div>
          <LogOut size={14} className="ml-auto shrink-0" />
        </button>

        <button
          onClick={onNewProject}
          className="w-full py-2 bg-[#C6FF4A] text-black rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
        >
          <Plus size={16} />
          {t('newProject')}
        </button>
      </div>
    </div>
  )
}
