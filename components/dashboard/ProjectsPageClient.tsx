'use client'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { ProjectsListView } from '@/components/dashboard/ProjectsListView'
import type { DashboardClient, DashboardProject } from '@/lib/dashboard/types'
import type { Milestone } from '@/lib/milestones'

interface ProjectsPageClientProps {
  organizationName: string
  userName: string
  userInitials: string
  clients: DashboardClient[]
  projects: DashboardProject[]
  milestones: Milestone[]
}

export function ProjectsPageClient({
  organizationName,
  userName,
  userInitials,
  clients,
  projects,
  milestones,
}: ProjectsPageClientProps) {
  return (
    <DashboardShell
      activeSection="projects"
      userName={userName}
      organizationName={organizationName}
      userInitials={userInitials}
      clients={clients}
    >
      {(shell) => (
        <ProjectsListView
          projects={projects}
          milestones={milestones}
          onNewProject={shell.openNewProject}
        />
      )}
    </DashboardShell>
  )
}
