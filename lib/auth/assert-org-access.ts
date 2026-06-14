import { prisma } from '@/lib/prisma'
import { requireAuthenticatedOrganization } from '@/lib/auth/get-organization'

export async function assertProjectAccess(projectId: string) {
  const ctx = await requireAuthenticatedOrganization()

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId: ctx.organization.id,
    },
  })

  if (!project) {
    throw new Error('Project not found or access denied')
  }

  return { ctx, project }
}

export async function assertClientAccess(clientId: string) {
  const ctx = await requireAuthenticatedOrganization()

  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      organizationId: ctx.organization.id,
    },
  })

  if (!client) {
    throw new Error('Client not found or access denied')
  }

  return { ctx, client }
}

export async function assertMilestoneAccess(milestoneId: string) {
  const ctx = await requireAuthenticatedOrganization()

  const milestone = await prisma.milestone.findFirst({
    where: {
      id: milestoneId,
      project: { organizationId: ctx.organization.id },
    },
    include: { project: true },
  })

  if (!milestone) {
    throw new Error('Milestone not found or access denied')
  }

  return { ctx, milestone }
}
