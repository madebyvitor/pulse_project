'use client'

import React, { useState } from 'react'
import {
  Search,
  Bell,
  ChevronRight,
  ExternalLink,
  Briefcase,
  Users as UsersIcon,
  DollarSign,
  CheckCircle,
  FileText,
  Rocket,
  Plus,
  Milestone,
  Link2,
  LayoutDashboard,
  FolderKanban,
  Settings,
  Menu,
  X,
  MoreVertical,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AgencySidebar, type DashboardSection } from './AgencySidebar'
import { MetricCardBase } from './MetricCardBase'
import { ProgressBar } from './ProgressBar'
import { NewProjectModal } from './NewProjectModal'
import { AddTimelineEventModal } from './AddTimelineEventModal'
import { ManageMilestonesModal } from './ManageMilestonesModal'
import { ShareLinkModal } from './ShareLinkModal'
import { ClientsSection } from './ClientsSection'
import type {
  Activity,
  DashboardClient,
  DashboardProject,
} from '@/lib/dashboard/types'
import { calculateProgress, type Milestone as MilestoneType } from '@/lib/milestones'

interface AgencyDashboardProps {
  organizationName: string
  userName: string
  userInitials: string
  clients: DashboardClient[]
  projects: DashboardProject[]
  milestones: MilestoneType[]
  activities: Activity[]
}

const StatusBadge: React.FC<{ status: DashboardProject['status'] }> = ({ status }) => {
  const styles = {
    Design: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Dev: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Done: 'bg-[#C6FF4A15] text-[#C6FF4A] border-[#C6FF4A20]',
  }
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}
    >
      {status}
    </span>
  )
}

const ActivityIcon: React.FC<{ type: Activity['type'] }> = ({ type }) => {
  switch (type) {
    case 'file':
      return <FileText size={14} className="text-blue-400 shrink-0" />
    case 'deploy':
      return <Rocket size={14} className="text-[#C6FF4A] shrink-0" />
    case 'client':
      return <UsersIcon size={14} className="text-orange-400 shrink-0" />
    case 'message':
      return <Bell size={14} className="text-purple-400 shrink-0" />
    case 'milestone':
      return <Milestone size={14} className="text-blue-400 shrink-0" />
    default:
      return null
  }
}

const ProjectCard: React.FC<{ project: DashboardProject; progress: number }> = ({
  project,
  progress,
}) => (
  <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 hover:border-[#333333] transition-all">
    <div className="flex items-start justify-between gap-2 mb-3">
      <div className="min-w-0">
        <p className="font-bold text-sm truncate">{project.name}</p>
        <p className="text-xs text-[#888888] truncate">{project.client}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={project.status} />
        <button className="text-[#444444] hover:text-white transition-colors">
          <MoreVertical size={14} />
        </button>
      </div>
    </div>
    <ProgressBar progress={progress} showPercentage={false} size="sm" animated={false} />
    <div className="flex justify-between items-center mt-1.5">
      <span className="text-[10px] text-[#444444]">{project.lastUpdate}</span>
      <span className="text-[10px] text-[#C6FF4A] font-bold">{progress}%</span>
    </div>
  </div>
)

export const AgencyDashboard: React.FC<AgencyDashboardProps> = ({
  organizationName,
  userName,
  userInitials,
  clients,
  projects,
  milestones,
  activities,
}) => {
  const t = useTranslations('Dashboard')
  const [activeSection, setActiveSection] = useState<DashboardSection>('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [milestonesOpen, setMilestonesOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getProjectProgress = (projectId: string) => calculateProgress(milestones, projectId)

  const sidebarProps = {
    activeSection,
    onSectionChange: setActiveSection,
    onNewProject: () => setNewProjectOpen(true),
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
        onGoToClients={() => setActiveSection('clients')}
      />
      <AddTimelineEventModal
        open={timelineOpen}
        onClose={() => setTimelineOpen(false)}
        projects={projects}
      />
      <ManageMilestonesModal
        open={milestonesOpen}
        onClose={() => setMilestonesOpen(false)}
        projects={projects}
        milestones={milestones}
      />
      <ShareLinkModal open={shareOpen} onClose={() => setShareOpen(false)} projects={projects} />

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
                  setNewProjectOpen(true)
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
                <Image src="/logotipo.svg" alt="Progressly Logo" width={28} height={28} className="w-7 h-7" />
                <span className="text-base font-bold">Progressly</span>
              </div>

              {activeSection === 'dashboard' && (
                <div className="hidden md:block relative group w-full max-w-sm">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444444] group-focus-within:text-[#C6FF4A] transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('header.searchPlaceholder')}
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C6FF4A]/30 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              {activeSection === 'dashboard' && (
                <button
                  onClick={() => setMobileSearchOpen((v) => !v)}
                  className="md:hidden p-2 text-[#888888] hover:text-white hover:bg-[#111111] rounded-lg transition-colors"
                >
                  <Search size={18} />
                </button>
              )}

              <button
                onClick={() => setNewProjectOpen(true)}
                className="md:hidden p-2 bg-[#C6FF4A] text-black rounded-lg hover:opacity-90 active:scale-95 transition-all"
              >
                <Plus size={18} />
              </button>

              <button className="relative p-2 text-[#888888] hover:bg-[#111111] rounded-lg transition-colors">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C6FF4A] rounded-full border-2 border-[#050505]" />
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

          <AnimatePresence>
            {mobileSearchOpen && activeSection === 'dashboard' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-b border-[#222222] overflow-hidden"
              >
                <div className="px-4 py-3 relative">
                  <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-[#444444]" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('header.searchPlaceholder')}
                    autoFocus
                    className="w-full bg-[#111111] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C6FF4A]/30 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8 custom-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeSection === 'clients' ? (
                <ClientsSection clients={clients} />
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 md:mb-8">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                        {t('header.title')}
                      </h1>
                      <p className="text-[#888888] text-xs md:text-sm">{t('header.welcome')}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setTimelineOpen(true)}
                        className="bg-[#111111] border border-[#222222] text-white px-3 py-2 rounded-lg text-sm font-medium hover:border-[#333333] transition-all flex items-center gap-2"
                      >
                        <Milestone size={15} className="text-purple-400" />
                        <span className="hidden md:inline">{t('quickActions.newEvent')}</span>
                      </button>
                      <button
                        onClick={() => setMilestonesOpen(true)}
                        className="bg-[#111111] border border-[#222222] text-white px-3 py-2 rounded-lg text-sm font-medium hover:border-[#333333] transition-all flex items-center gap-2"
                      >
                        <Milestone size={15} className="text-blue-400" />
                        <span className="hidden md:inline">{t('quickActions.milestones')}</span>
                      </button>
                      <button
                        onClick={() => setShareOpen(true)}
                        className="bg-[#111111] border border-[#222222] text-white px-3 py-2 rounded-lg text-sm font-medium hover:border-[#333333] transition-all flex items-center gap-2"
                      >
                        <Link2 size={15} className="text-orange-400" />
                        <span className="hidden md:inline">{t('quickActions.share')}</span>
                      </button>
                      <button
                        onClick={() => setNewProjectOpen(true)}
                        className="bg-[#C6FF4A] text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <Plus size={16} />
                        {t('quickActions.newProject')}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
                    <MetricCardBase
                      title={t('metrics.activeProjects')}
                      value={projects.filter((p) => p.status !== 'Done').length}
                      trend="neutral"
                      icon={<Briefcase size={18} />}
                      description={t('metrics.activeProjectsDesc')}
                    />
                    <MetricCardBase
                      title={t('metrics.activeClients')}
                      value={clients.length}
                      trend="neutral"
                      icon={<UsersIcon size={18} />}
                      description={t('metrics.activeClientsDesc')}
                    />
                    <MetricCardBase
                      title={t('metrics.mrr')}
                      value="—"
                      trend="neutral"
                      icon={<DollarSign size={18} />}
                      description={t('metrics.mrrDesc')}
                    />
                    <MetricCardBase
                      title={t('metrics.completed')}
                      value={projects.filter((p) => p.status === 'Done').length}
                      trend="neutral"
                      icon={<CheckCircle size={18} />}
                      description={t('metrics.completedDesc')}
                    />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                    <div className="xl:col-span-2 space-y-4 md:space-y-6">
                      <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
                        <div className="px-4 md:px-6 py-4 border-b border-[#222222] flex justify-between items-center bg-[#161616]/50">
                          <h2 className="font-bold text-base md:text-lg">{t('projects.title')}</h2>
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="text-[#444444] text-[10px] font-black uppercase tracking-widest border-b border-[#222222]">
                                <th className="px-6 py-4">{t('projects.colProject')}</th>
                                <th className="px-6 py-4">{t('projects.colClient')}</th>
                                <th className="px-6 py-4">{t('projects.colStatus')}</th>
                                <th className="px-6 py-4">{t('projects.colProgress')}</th>
                                <th className="px-6 py-4"></th>
                              </tr>
                            </thead>
                            <tbody className="text-sm">
                              {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => {
                                  const progress = getProjectProgress(project.id)
                                  return (
                                    <tr
                                      key={project.id}
                                      className="border-b border-[#222222]/50 hover:bg-white/[0.02] transition-colors group"
                                    >
                                      <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                          <span className="font-bold group-hover:text-[#C6FF4A] transition-colors">
                                            {project.name}
                                          </span>
                                          <span className="text-xs text-[#888888]">{project.lastUpdate}</span>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 text-[#888888]">{project.client}</td>
                                      <td className="px-6 py-4">
                                        <StatusBadge status={project.status} />
                                      </td>
                                      <td className="px-6 py-4 w-40">
                                        <ProgressBar
                                          progress={progress}
                                          showPercentage={false}
                                          size="sm"
                                          animated={false}
                                        />
                                        <span className="text-[10px] text-[#444444] mt-1 block text-right font-bold">
                                          {progress}%
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 text-right">
                                        <button className="text-[#444444] hover:text-white transition-colors">
                                          <MoreVertical size={16} />
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })
                              ) : (
                                <tr>
                                  <td colSpan={5} className="px-6 py-10 text-center text-[#444444] text-sm">
                                    {searchQuery
                                      ? `${t('projects.noResults')} "${searchQuery}"`
                                      : t('projects.empty')}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="md:hidden p-4 space-y-3">
                          {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                              <ProjectCard
                                key={project.id}
                                project={project}
                                progress={getProjectProgress(project.id)}
                              />
                            ))
                          ) : (
                            <p className="text-center text-[#444444] text-sm py-6">
                              {searchQuery
                                ? `${t('projects.noResults')} "${searchQuery}"`
                                : t('projects.empty')}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <button
                          onClick={() => setTimelineOpen(true)}
                          className="bg-[#111111] border border-[#222222] p-4 md:p-6 rounded-2xl flex items-center gap-4 hover:border-[#333333] transition-all text-left group"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                            <Rocket size={22} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm md:text-base group-hover:text-[#C6FF4A] transition-colors">
                              {t('cards.nextLaunch')}
                            </h4>
                            <p className="text-xs text-[#888888]">{t('cards.nextLaunchDesc')}</p>
                          </div>
                          <ChevronRight
                            size={18}
                            className="ml-auto text-[#222222] group-hover:text-[#444444] transition-colors shrink-0"
                          />
                        </button>

                        <button
                          onClick={() => setShareOpen(true)}
                          className="bg-[#111111] border border-[#222222] p-4 md:p-6 rounded-2xl flex items-center gap-4 hover:border-[#333333] transition-all text-left group"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                            <ExternalLink size={22} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm md:text-base group-hover:text-[#C6FF4A] transition-colors">
                              {t('cards.clientPortal')}
                            </h4>
                            <p className="text-xs text-[#888888] truncate">/client/{projects[0]?.slug ?? '…'}</p>
                          </div>
                          <ChevronRight
                            size={18}
                            className="ml-auto text-[#222222] group-hover:text-[#444444] transition-colors shrink-0"
                          />
                        </button>

                        <button
                          onClick={() => setMilestonesOpen(true)}
                          className="bg-[#111111] border border-[#222222] p-4 md:p-6 rounded-2xl flex items-center gap-4 hover:border-[#333333] transition-all text-left group"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                            <Milestone size={22} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm md:text-base group-hover:text-[#C6FF4A] transition-colors">
                              {t('cards.milestones')}
                            </h4>
                            <p className="text-xs text-[#888888]">{t('cards.milestonesDesc')}</p>
                          </div>
                          <ChevronRight
                            size={18}
                            className="ml-auto text-[#222222] group-hover:text-[#444444] transition-colors shrink-0"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="xl:col-span-1 space-y-6 md:space-y-8">
                      <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
                        <div className="px-4 md:px-6 py-4 border-b border-[#222222] flex justify-between items-center bg-[#161616]/50">
                          <h2 className="font-bold text-base md:text-lg">{t('activities.title')}</h2>
                        </div>
                        <div className="p-4 md:p-6">
                          {activities.length === 0 ? (
                            <p className="text-sm text-[#444444] text-center py-6">{t('activities.empty')}</p>
                          ) : (
                            <div className="space-y-6 md:space-y-8 relative">
                              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[#222222]" />
                              {activities.slice(0, 5).map((activity) => (
                                <div key={activity.id} className="relative pl-7 group">
                                  <div className="absolute left-0 top-[2px] w-4 h-4 rounded-full bg-[#111111] border border-[#222222] z-10 flex items-center justify-center group-hover:border-[#C6FF4A] transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#444444] group-hover:bg-[#C6FF4A] transition-colors" />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      <ActivityIcon type={activity.type} />
                                      <span className="text-[10px] font-bold text-[#444444] uppercase tracking-wider">
                                        {activity.time}
                                      </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed">
                                      {activity.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222222] p-4 md:p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-sm md:text-base">{t('team.title')}</h3>
                          <span className="flex h-2 w-2 rounded-full bg-[#C6FF4A]" />
                        </div>
                        <p className="text-[10px] text-[#444444] font-bold uppercase tracking-widest">
                          {t('team.workspace', { name: organizationName })}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </main>
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#222222]">
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${activeSection === 'dashboard' ? 'text-[#C6FF4A]' : 'text-[#888888]'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{t('sidebar.dashboard')}</span>
          </button>
          <button
            onClick={() => setNewProjectOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[#888888] hover:text-white transition-colors"
          >
            <FolderKanban size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('sidebar.projects')}</span>
          </button>
          <button
            onClick={() => setNewProjectOpen(true)}
            className="-mt-6 w-14 h-14 rounded-full bg-[#C6FF4A] text-black flex items-center justify-center shadow-[0_0_20px_rgba(198,255,74,0.3)] hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={24} />
          </button>
          <button
            onClick={() => setActiveSection('clients')}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${activeSection === 'clients' ? 'text-[#C6FF4A]' : 'text-[#888888]'}`}
          >
            <UsersIcon size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('sidebar.clients')}</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[#888888] hover:text-white transition-colors">
            <Settings size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('quickActions.settings')}</span>
          </button>
        </div>
      </nav>
    </>
  )
}
