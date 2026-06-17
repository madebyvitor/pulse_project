'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuthenticatedOrganization } from '@/lib/auth/get-organization'

const feedbackSchema = z.object({
  category: z.enum(['BUG', 'SUGGESTION', 'PRAISE', 'NEW_INTEGRATION']),
  message: z.string().trim().min(10).max(2000),
})

export async function submitFeedbackAction(formData: FormData) {
  let ctx
  try {
    ctx = await requireAuthenticatedOrganization()
  } catch {
    return { error: 'unauthenticated' as const }
  }

  const parsed = feedbackSchema.safeParse({
    category: formData.get('category'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { error: 'invalid_data' as const }
  }

  await prisma.feedback.create({
    data: {
      message: parsed.data.message,
      category: parsed.data.category,
      userId: ctx.user.id,
    },
  })

  return { success: true as const }
}
