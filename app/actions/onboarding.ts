'use server'

import { revalidatePath } from 'next/cache'
import { getLocale } from 'next-intl/server'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedOrganization } from '@/lib/auth/get-organization'
import { redirect } from '@/src/i18n/navigation'

const agencyNameSchema = z.object({
  agencyName: z.string().min(2).max(80),
})

async function revalidateDashboard() {
  const locale = await getLocale()
  revalidatePath(`/${locale}/dashboard`)
}

export async function completeOnboardingAction(formData: FormData) {
  const parsed = agencyNameSchema.safeParse({
    agencyName: formData.get('agencyName'),
  })

  if (!parsed.success) {
    return
  }

  const existing = await getAuthenticatedOrganization()
  if (existing) {
    redirect({ href: '/dashboard', locale: await getLocale() })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userId = user?.id
  if (!userId) {
    redirect({ href: '/login', locale: await getLocale() })
    throw new Error('Unauthenticated')
  }

  await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: { name: parsed.data.agencyName },
    })

    await tx.userOrganization.create({
      data: {
        userId,
        organizationId: organization.id,
        role: 'OWNER',
      },
    })
  })

  await revalidateDashboard()
  redirect({ href: '/dashboard', locale: await getLocale() })
}
