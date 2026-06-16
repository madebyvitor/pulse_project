'use client'

import React, { useState } from 'react'
import {
  FolderKanban,
  History,
  LayoutDashboard,
  Menu,
  Plus,
  Users as UsersIcon,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/src/i18n/navigation'
import { AgencySidebar, type DashboardSection } from './AgencySidebar'
import { NewProjectModal } from './NewProjectModal'
import type { DashboardClient } from '@/lib/dashboard/types'

interface DashboardShellProps {
  activeSection: DashboardSection
  userName: string
  organizationName: string
  userInitials: string
  clients: DashboardClient[]
  onSectionChange?: (section: DashboardSection) => void
  onNewClient?: () => void
  headerContent?: React.ReactNode
  children:
    | React.ReactNode
    | ((actions: { openNewProject: () => void; openNewClient: () => void }) => React.ReactNode)
}

export function DashboardShell({
  activeSection,
  userName,
  organizationName,
  userInitials,
  clients,
  onSectionChange,
  onNewClient,
  headerContent,
  children,
}: DashboardShellProps) {
  const t = useTranslations('Dashboard')
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [newProjectOpen, setNewProjectOpen] = useState(false)

  const openNewProject = () => setNewProjectOpen(true)
  const openNewClient = () => onNewClient?.()

  const handlePrimaryAction = () => {
    if (activeSection === 'clients') {
      openNewClient()
    } else {
      openNewProject()
    }
  }

  const sidebarProps = {
    activeSection,
    onSectionChange,
    onNewProject: openNewProject,
    userName,
    organizationName,
    userInitials,
  }

  return (
    <>
      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
        clients={clients}
        onGoToClients={() => router.push('/dashboard/clients')}
      />

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <AgencySidebar
                {...sidebarProps}
                onNewProject={() => {
                  openNewProject()
                  setMobileMenuOpen(false)
                }}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-[-40px] w-8 h-8 bg-[#222222] rounded-full flex items-center justify-center text-white"
              >
                <X size={14} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
        <div className="hidden md:block shrink-0">
          <AgencySidebar {...sidebarProps} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-14 md:h-16 border-b border-[#222222] flex items-center justify-between px-4 md:px-8 shrink-0 bg-[#050505]/90 backdrop-blur-md z-10 gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#888888] hover:text-white hover:bg-[#111111] rounded-lg transition-colors shrink-0"
              >
                <Menu size={20} />
              </button>

              <div className="md:hidden flex items-center gap-2 shrink-0">
                <Image
                  src="/logotipo.svg"
                  alt="Progressly Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <span className="text-base font-bold">Progressly</span>
              </div>

              {headerContent && <div className="hidden md:block flex-1 min-w-0">{headerContent}</div>}
            </div>

            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              <button
                onClick={handlePrimaryAction}
                className="md:hidden p-2 bg-[#C6FF4A] text-black rounded-lg hover:opacity-90 active:scale-95 transition-all"
              >
                <Plus size={18} />
              </button>

              <div className="hidden md:flex items-center gap-3">
                <div className="h-8 w-[1px] bg-[#222222]" />
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">{userName}</span>
                  <span className="text-[10px] text-[#888888]">{organizationName}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C6FF4A] to-emerald-500 p-[1px] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
                    <span className="text-[#C6FF4A] font-black text-sm">{userInitials}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8 custom-scrollbar bg-[#0a0a0a]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeSection === 'dashboard' && (
                <div className="mb-6 md:mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 md:px-5 md:py-4 text-sm text-[#cccccc] space-y-0.5">
                  <p className="font-semibold text-amber-400/90">{t('earlyAccess.title')}</p>
                  <p>{t('earlyAccess.feedback')}</p>
                  <p>{t('earlyAccess.features')}</p>
                </div>
              )}
              {typeof children === 'function'
                ? children({ openNewProject, openNewClient })
                : children}
            </motion.div>
          </main>
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#222222]">
        <div className="flex items-center justify-around px-2 py-3">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${
              activeSection === 'dashboard' ? 'text-[#C6FF4A]' : 'text-[#888888]'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{t('sidebar.dashboard')}</span>
          </Link>
          <Link
            href="/dashboard/projects"
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${
              activeSection === 'projects' ? 'text-[#C6FF4A]' : 'text-[#888888]'
            }`}
          >
            <FolderKanban size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('sidebar.projects')}</span>
          </Link>
          <button
            onClick={handlePrimaryAction}
            className="-mt-6 w-14 h-14 rounded-full bg-[#C6FF4A] text-black flex items-center justify-center shadow-[0_0_20px_rgba(198,255,74,0.3)] hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={24} />
          </button>
          <Link
            href="/dashboard/clients"
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${
              activeSection === 'clients' ? 'text-[#C6FF4A]' : 'text-[#888888]'
            }`}
          >
            <UsersIcon size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('sidebar.clients')}</span>
          </Link>
          <Link
            href="/dashboard/timeline"
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${
              activeSection === 'timeline' ? 'text-[#C6FF4A]' : 'text-[#888888]'
            }`}
          >
            <History size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('sidebar.timeline')}</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
