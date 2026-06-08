'use client';

import React, { useState } from 'react';
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
  SlidersHorizontal,
  Link2,
  LayoutDashboard,
  FolderKanban,
  Settings,
  Menu,
  X,
  MoreVertical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AgencySidebar } from './AgencySidebar';
import { MetricCardBase } from './MetricCardBase';
import { ProgressBar } from './ProgressBar';
import { NewProjectModal } from './NewProjectModal';
import { AddTimelineEventModal } from './AddTimelineEventModal';
import { UpdateProgressModal } from './UpdateProgressModal';
import { ShareLinkModal } from './ShareLinkModal';

// --- Types ---

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Design' | 'Dev' | 'Done';
  progress: number;
  lastUpdate: string;
}

interface Activity {
  id: string;
  type: 'file' | 'deploy' | 'client' | 'message';
  content: string;
  time: string;
}

// --- Mock Data ---

const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'Rebranding 2024', client: 'Acme Corp', status: 'Design', progress: 65, lastUpdate: '2h atrás' },
  { id: '2', name: 'E-commerce Platform', client: 'Globex Inc', status: 'Dev', progress: 40, lastUpdate: '5h atrás' },
  { id: '3', name: 'Mobile App Revamp', client: 'Stark Ind', status: 'Done', progress: 100, lastUpdate: 'Ontem' },
  { id: '4', name: 'SEO Campaign', client: 'Wayne Ent', status: 'Dev', progress: 85, lastUpdate: '2 dias atrás' },
  { id: '5', name: 'User Research', client: 'Umbrella Corp', status: 'Design', progress: 15, lastUpdate: '3 dias atrás' },
];

const INITIAL_ACTIVITIES: Activity[] = [
  { id: 'a1', type: 'file', content: 'Cliente Acme Corp enviou documento de identidade visual', time: 'Há 10 minutos' },
  { id: 'a2', type: 'deploy', content: 'Deploy realizado em E-commerce Platform (Staging)', time: 'Há 2 horas' },
  { id: 'a3', type: 'client', content: 'Novo cliente Globex Inc onboarded com sucesso', time: 'Há 5 horas' },
  { id: 'a4', type: 'message', content: 'Stark Ind aprovou a fase de design do Mobile App', time: 'Ontem' },
  { id: 'a5', type: 'file', content: 'Wayne Ent enviou o briefing para a campanha de SEO', time: '2 dias atrás' },
];

// --- Sub-components ---

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const styles = {
    Design: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Dev: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Done: 'bg-[#C6FF4A15] text-[#C6FF4A] border-[#C6FF4A20]',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

const ActivityIcon: React.FC<{ type: Activity['type'] }> = ({ type }) => {
  switch (type) {
    case 'file': return <FileText size={14} className="text-blue-400 shrink-0" />;
    case 'deploy': return <Rocket size={14} className="text-[#C6FF4A] shrink-0" />;
    case 'client': return <UsersIcon size={14} className="text-orange-400 shrink-0" />;
    case 'message': return <Bell size={14} className="text-purple-400 shrink-0" />;
    default: return null;
  }
};

// Mobile project card (replaces table on small screens)
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
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
    <ProgressBar progress={project.progress} showPercentage={false} size="sm" animated={false} />
    <div className="flex justify-between items-center mt-1.5">
      <span className="text-[10px] text-[#444444]">{project.lastUpdate}</span>
      <span className="text-[10px] text-[#C6FF4A] font-bold">{project.progress}%</span>
    </div>
  </div>
);

// --- Main Component ---

export const AgencyDashboard: React.FC = () => {
  const t = useTranslations('Dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Modal states
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleNewProject = (data: { projectName: string; description?: string; clientName: string; clientEmail: string }) => {
    const newProject: Project = {
      id: String(Date.now()),
      name: data.projectName,
      client: data.clientName,
      status: 'Design',
      progress: 0,
      lastUpdate: 'Agora',
    };
    setProjects((prev) => [newProject, ...prev]);
    setActivities((prev) => [{
      id: `a${Date.now()}`,
      type: 'client',
      content: `Novo projeto "${data.projectName}" criado para ${data.clientName}`,
      time: 'Agora',
    }, ...prev]);
  };

  const handleTimelineEvent = (data: { projectId: string; title: string; description?: string }) => {
    const project = projects.find((p) => p.id === data.projectId);
    if (!project) return;
    setActivities((prev) => [{
      id: `a${Date.now()}`,
      type: 'deploy',
      content: `[${project.name}] Milestone: ${data.title}`,
      time: 'Agora',
    }, ...prev]);
  };

  const handleUpdateProgress = (projectId: string, progress: number) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, progress, status: progress === 100 ? 'Done' : p.status, lastUpdate: 'Agora' }
          : p
      )
    );
  };

  return (
    <>
      {/* Modals */}
      <NewProjectModal open={newProjectOpen} onClose={() => setNewProjectOpen(false)} onSave={handleNewProject} />
      <AddTimelineEventModal open={timelineOpen} onClose={() => setTimelineOpen(false)} onSave={handleTimelineEvent} projects={projects} />
      <UpdateProgressModal open={progressOpen} onClose={() => setProgressOpen(false)} onSave={handleUpdateProgress} projects={projects} />
      <ShareLinkModal open={shareOpen} onClose={() => setShareOpen(false)} projects={projects} />

      {/* Mobile Sidebar Drawer */}
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
                activeSection="dashboard"
                onNewProject={() => { setNewProjectOpen(true); setMobileMenuOpen(false); }}
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
        {/* Desktop Sidebar */}
        <div className="hidden md:block shrink-0">
          <AgencySidebar activeSection="dashboard" onNewProject={() => setNewProjectOpen(true)} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-14 md:h-16 border-b border-[#222222] flex items-center justify-between px-4 md:px-8 shrink-0 bg-[#050505]/90 backdrop-blur-md z-10 gap-3">
            {/* Left: Mobile hamburger + Desktop search */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#888888] hover:text-white hover:bg-[#111111] rounded-lg transition-colors shrink-0"
              >
                <Menu size={20} />
              </button>

              {/* Mobile logo */}
              <div className="md:hidden flex items-center gap-2 shrink-0">
                <Image src="/logotipo.svg" alt="Progressly Logo" width={28} height={28} className="w-7 h-7" />
                <span className="text-base font-bold">Progressly</span>
              </div>

              {/* Desktop search */}
              <div className="hidden md:block relative group w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444444] group-focus-within:text-[#C6FF4A] transition-colors" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.searchPlaceholder')}
                  className="w-full bg-[#111111] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C6FF4A]/30 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen((v) => !v)}
                className="md:hidden p-2 text-[#888888] hover:text-white hover:bg-[#111111] rounded-lg transition-colors"
              >
                <Search size={18} />
              </button>

              {/* Mobile: new project button */}
              <button
                onClick={() => setNewProjectOpen(true)}
                className="md:hidden p-2 bg-[#C6FF4A] text-black rounded-lg hover:opacity-90 active:scale-95 transition-all"
              >
                <Plus size={18} />
              </button>

              {/* Notification bell */}
              <button className="relative p-2 text-[#888888] hover:bg-[#111111] rounded-lg transition-colors">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C6FF4A] rounded-full border-2 border-[#050505]" />
              </button>

              {/* Divider + user — desktop only */}
              <div className="hidden md:flex items-center gap-3">
                <div className="h-8 w-[1px] bg-[#222222]" />
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">Alex Director</span>
                  <span className="text-[10px] text-[#888888]">Founder @ Agency</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C6FF4A] to-emerald-500 p-[1px] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
                    <span className="text-[#C6FF4A] font-black text-sm">AD</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile expandable search bar */}
          <AnimatePresence>
            {mobileSearchOpen && (
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

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8 custom-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Page Title + Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 md:mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{t('header.title')}</h1>
                  <p className="text-[#888888] text-xs md:text-sm">
                    {t('header.welcome')}
                  </p>
                </div>
                {/* Quick Action Buttons — desktop only */}
                <div className="hidden sm:flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setTimelineOpen(true)}
                    className="bg-[#111111] border border-[#222222] text-white px-3 py-2 rounded-lg text-sm font-medium hover:border-[#333333] transition-all flex items-center gap-2"
                  >
                    <Milestone size={15} className="text-purple-400" />
                    <span className="hidden md:inline">{t('quickActions.newEvent')}</span>
                  </button>
                  <button
                    onClick={() => setProgressOpen(true)}
                    className="bg-[#111111] border border-[#222222] text-white px-3 py-2 rounded-lg text-sm font-medium hover:border-[#333333] transition-all flex items-center gap-2"
                  >
                    <SlidersHorizontal size={15} className="text-blue-400" />
                    <span className="hidden md:inline">{t('quickActions.progress')}</span>
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

              {/* Metrics Grid — 2 cols on mobile, 4 on lg */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
                <MetricCardBase
                  title={t('metrics.activeProjects')}
                  value={projects.filter((p) => p.status !== 'Done').length}
                  change="+2"
                  trend="up"
                  icon={<Briefcase size={18} />}
                  description={t('metrics.activeProjectsDesc')}
                />
                <MetricCardBase
                  title={t('metrics.activeClients')}
                  value="24"
                  change="+5%"
                  trend="up"
                  icon={<UsersIcon size={18} />}
                  description={t('metrics.activeClientsDesc')}
                />
                <MetricCardBase
                  title={t('metrics.mrr')}
                  value="R$45.2k"
                  change="+12%"
                  trend="up"
                  icon={<DollarSign size={18} />}
                  description={t('metrics.mrrDesc')}
                />
                <MetricCardBase
                  title={t('metrics.completed')}
                  value={projects.filter((p) => p.status === 'Done').length}
                  change="98%"
                  trend="neutral"
                  icon={<CheckCircle size={18} />}
                  description={t('metrics.completedDesc')}
                />
              </div>

              {/* Main Content Sections */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Projects section */}
                <div className="xl:col-span-2 space-y-4 md:space-y-6">
                  <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
                    <div className="px-4 md:px-6 py-4 border-b border-[#222222] flex justify-between items-center bg-[#161616]/50">
                      <h2 className="font-bold text-base md:text-lg">{t('projects.title')}</h2>
                      <button className="text-xs text-[#C6FF4A] font-bold hover:underline">{t('projects.viewAll')}</button>
                    </div>

                    {/* Desktop table */}
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
                            filteredProjects.map((project) => (
                              <tr key={project.id} className="border-b border-[#222222]/50 hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                  <div className="flex flex-col">
                                    <span className="font-bold group-hover:text-[#C6FF4A] transition-colors">{project.name}</span>
                                    <span className="text-xs text-[#888888]">{project.lastUpdate}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-[#888888]">{project.client}</td>
                                <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                                <td className="px-6 py-4 w-40">
                                  <ProgressBar progress={project.progress} showPercentage={false} size="sm" animated={false} />
                                  <span className="text-[10px] text-[#444444] mt-1 block text-right font-bold">{project.progress}%</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button className="text-[#444444] hover:text-white transition-colors">
                                    <MoreVertical size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-6 py-10 text-center text-[#444444] text-sm">
                                {t('projects.noResults')} &ldquo;{searchQuery}&rdquo;
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile card list */}
                    <div className="md:hidden p-4 space-y-3">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))
                      ) : (
                        <p className="text-center text-[#444444] text-sm py-6">
                          {t('projects.noResults')} &ldquo;{searchQuery}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <button
                      onClick={() => setTimelineOpen(true)}
                      className="bg-[#111111] border border-[#222222] p-4 md:p-6 rounded-2xl flex items-center gap-4 hover:border-[#333333] transition-all text-left group"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                        <Rocket size={22} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm md:text-base group-hover:text-[#C6FF4A] transition-colors">{t('cards.nextLaunch')}</h4>
                        <p className="text-xs text-[#888888]">{t('cards.nextLaunchDesc')}</p>
                      </div>
                      <ChevronRight size={18} className="ml-auto text-[#222222] group-hover:text-[#444444] transition-colors shrink-0" />
                    </button>

                    <button
                      onClick={() => setShareOpen(true)}
                      className="bg-[#111111] border border-[#222222] p-4 md:p-6 rounded-2xl flex items-center gap-4 hover:border-[#333333] transition-all text-left group"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                        <ExternalLink size={22} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm md:text-base group-hover:text-[#C6FF4A] transition-colors">{t('cards.clientPortal')}</h4>
                        <p className="text-xs text-[#888888] truncate">progressly.app/p/...</p>
                      </div>
                      <ChevronRight size={18} className="ml-auto text-[#222222] group-hover:text-[#444444] transition-colors shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Right Column */}
                <div className="xl:col-span-1 space-y-6 md:space-y-8">
                  {/* Recent Activities Feed */}
                  <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
                    <div className="px-4 md:px-6 py-4 border-b border-[#222222] flex justify-between items-center bg-[#161616]/50">
                      <h2 className="font-bold text-base md:text-lg">{t('activities.title')}</h2>
                    </div>
                    <div className="p-4 md:p-6">
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
                                <span className="text-[10px] font-bold text-[#444444] uppercase tracking-wider">{activity.time}</span>
                              </div>
                              <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed">{activity.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-6 md:mt-8 py-3 bg-[#1a1a1a] border border-[#222222] rounded-xl text-xs font-bold text-[#888888] hover:text-white hover:border-[#333333] transition-all">
                        {t('activities.viewLog')}
                      </button>
                    </div>
                  </div>

                  {/* Team Card */}
                  <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222222] p-4 md:p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm md:text-base">{t('team.title')}</h3>
                      <span className="flex h-2 w-2 rounded-full bg-[#C6FF4A]" />
                    </div>
                    <div className="flex -space-x-2">
                      {['JP', 'MA', 'RT', 'CL'].map((initials, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-[#222222] flex items-center justify-center text-[10px] font-bold">
                          {initials}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-[#111111] text-[#444444] flex items-center justify-center text-[10px] font-bold">
                        +2
                      </div>
                    </div>
                    <p className="text-[10px] text-[#444444] mt-4 font-bold uppercase tracking-widest">
                      {t('team.workspace')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#222222]">
        <div className="flex items-center justify-around px-2 py-3">
          <button className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[#C6FF4A]">
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
          {/* Center FAB */}
          <button
            onClick={() => setNewProjectOpen(true)}
            className="-mt-6 w-14 h-14 rounded-full bg-[#C6FF4A] text-black flex items-center justify-center shadow-[0_0_20px_rgba(198,255,74,0.3)] hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={24} />
          </button>
          <button
            onClick={() => setTimelineOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[#888888] hover:text-white transition-colors"
          >
            <Milestone size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('quickActions.timeline')}</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[#888888] hover:text-white transition-colors">
            <Settings size={20} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t('quickActions.settings')}</span>
          </button>
        </div>
      </nav>
    </>
  );
};
