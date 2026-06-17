'use server'

import { revalidatePath } from 'next/cache'
import { getLocale } from 'next-intl/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuthenticatedOrganization } from '@/lib/auth/get-organization'

const toggleIntegrationSchema = z.object({
  provider: z.enum(['GITHUB', 'VERCEL', 'FIGMA', 'SLACK']),
  connect: z.boolean(),
})

async function revalidateIntegrations() {
  const locale = await getLocale()
  revalidatePath(`/${locale}/dashboard/integrations`)
  revalidatePath(`/${locale}/dashboard/timeline`)
}

export async function toggleIntegrationAction(provider: string, connect: boolean) {
  const parsed = toggleIntegrationSchema.safeParse({ provider, connect })
  if (!parsed.success) {
    return { error: 'invalid_data' as const }
  }

  let ctx
  try {
    ctx = await requireAuthenticatedOrganization()
  } catch {
    return { error: 'unauthenticated' as const }
  }

  const { provider: validProvider, connect: shouldConnect } = parsed.data

  await prisma.organizationIntegration.upsert({
    where: {
      organizationId_provider: {
        organizationId: ctx.organization.id,
        provider: validProvider,
      },
    },
    create: {
      organizationId: ctx.organization.id,
      provider: validProvider,
      status: shouldConnect ? 'CONNECTED' : 'DISCONNECTED',
      connectedAt: shouldConnect ? new Date() : null,
    },
    update: {
      status: shouldConnect ? 'CONNECTED' : 'DISCONNECTED',
      connectedAt: shouldConnect ? new Date() : null,
    },
  })

  await revalidateIntegrations()
  return { success: true as const }
}
