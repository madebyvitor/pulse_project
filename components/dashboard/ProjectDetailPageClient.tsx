'use client'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { ProjectDetailStub } from '@/components/dashboard/ProjectDetailStub'
import type { DashboardClient, DashboardProject } from '@/lib/dashboard/types'

interface ProjectDetailPageClientProps {
  organizationName: string
  userName: string
  userInitials: string
  clients: DashboardClient[]
  project: DashboardProject
}

export function ProjectDetailPageClient({
  organizationName,
  userName,
  userInitials,
  clients,
  project,
}: ProjectDetailPageClientProps) {
  return (
    <DashboardShell
      activeSection="projects"
      userName={userName}
      organizationName={organizationName}
      userInitials={userInitials}
      clients={clients}
    >
      <ProjectDetailStub project={project} />
    </DashboardShell>
  )
}
