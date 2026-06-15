'use client'

import { Suspense } from 'react'
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
        <Suspense fallback={<div className="h-32" />}>
          <ProjectsListView
            projects={projects}
            milestones={milestones}
            clients={clients}
            onNewProject={shell.openNewProject}
          />
        </Suspense>
      )}
    </DashboardShell>
  )
}
