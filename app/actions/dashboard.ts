'use server'

import { revalidatePath } from 'next/cache'
import { getLocale } from 'next-intl/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuthenticatedOrganization } from '@/lib/auth/get-organization'
import {
  assertClientAccess,
  assertMilestoneAccess,
  assertProjectAccess,
} from '@/lib/auth/assert-org-access'
import { generateUniqueProjectSlug } from '@/lib/slug'
import { calculateProgress } from '@/lib/milestones'
import { deriveProjectStatusFromProgress, mapMilestone } from '@/lib/dashboard/map-data'

async function revalidateDashboard(projectId?: string) {
  const locale = await getLocale()
  revalidatePath(`/${locale}/dashboard`)
  revalidatePath(`/${locale}/dashboard/projects`)
  if (projectId) {
    revalidatePath(`/${locale}/dashboard/projects/${projectId}`)
  }
}

async function syncProjectProgress(projectId: string) {
  const milestones = await prisma.milestone.findMany({ where: { projectId } })
  const progress = calculateProgress(milestones.map(mapMilestone), projectId)
  const status = deriveProjectStatusFromProgress(progress)

  await prisma.project.update({
    where: { id: projectId },
    data: { progress, status },
  })

  return { progress, status }
}

const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const createProjectSchema = z.object({
  projectName: z.string().min(2),
  description: z.string().optional(),
  clientId: z.string().uuid(),
})

const timelineEventSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().optional(),
})

const milestoneSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
})

export async function createClientAction(formData: FormData) {
  const ctx = await requireAuthenticatedOrganization()

  const parsed = createClientSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { error: 'invalid_data' as const }
  }

  try {
    await prisma.client.create({
      data: {
        organizationId: ctx.organization.id,
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })
  } catch {
    return { error: 'duplicate_email' as const }
  }

  await revalidateDashboard()
  return { success: true as const }
}

export async function createProjectAction(formData: FormData) {
  const ctx = await requireAuthenticatedOrganization()

  const parsed = createProjectSchema.safeParse({
    projectName: formData.get('projectName'),
    description: formData.get('description') || undefined,
    clientId: formData.get('clientId'),
  })

  if (!parsed.success) {
    return { error: 'invalid_data' as const }
  }

  await assertClientAccess(parsed.data.clientId)

  const slug = await generateUniqueProjectSlug()

  await prisma.project.create({
    data: {
      organizationId: ctx.organization.id,
      clientId: parsed.data.clientId,
      name: parsed.data.projectName,
      description: parsed.data.description,
      slug,
    },
  })

  await revalidateDashboard()
  return { success: true as const }
}

export async function addTimelineEventAction(formData: FormData) {
  const parsed = timelineEventSchema.safeParse({
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    description: formData.get('description') || undefined,
  })

  if (!parsed.success) {
    return { error: 'invalid_data' as const }
  }

  await assertProjectAccess(parsed.data.projectId)

  await prisma.$transaction([
    prisma.timelineEvent.create({
      data: {
        projectId: parsed.data.projectId,
        title: parsed.data.title,
        description: parsed.data.description,
        type: 'MANUAL',
        status: 'CURRENT',
      },
    }),
    prisma.project.update({
      where: { id: parsed.data.projectId },
      data: { updatedAt: new Date() },
    }),
  ])

  await revalidateDashboard(parsed.data.projectId)
  return { success: true as const }
}

export async function addMilestoneAction(formData: FormData) {
  const parsed = milestoneSchema.safeParse({
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    description: formData.get('description') || undefined,
  })

  if (!parsed.success) {
    return { error: 'invalid_data' as const }
  }

  await assertProjectAccess(parsed.data.projectId)

  await prisma.milestone.create({
    data: {
      projectId: parsed.data.projectId,
      title: parsed.data.title,
      description: parsed.data.description,
    },
  })

  await syncProjectProgress(parsed.data.projectId)
  await revalidateDashboard(parsed.data.projectId)
  return { success: true as const }
}

export async function toggleMilestoneAction(milestoneId: string) {
  const { milestone } = await assertMilestoneAccess(milestoneId)

  await prisma.milestone.update({
    where: { id: milestoneId },
    data: { completed: !milestone.completed },
  })

  await syncProjectProgress(milestone.projectId)
  await revalidateDashboard(milestone.projectId)
  return { success: true as const }
}

export async function updateProjectProgressAction(
  projectId: string,
  progress: number,
  status: 'Design' | 'Dev' | 'Done'
) {
  await assertProjectAccess(projectId)

  const statusMap = { Design: 'DESIGN', Dev: 'DEV', Done: 'DONE' } as const

  await prisma.project.update({
    where: { id: projectId },
    data: {
      progress: Math.min(100, Math.max(0, progress)),
      status: statusMap[status],
    },
  })

  await revalidateDashboard(projectId)
  return { success: true as const }
}
