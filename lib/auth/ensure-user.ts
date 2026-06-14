import type { User as SupabaseUser } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma'

export async function ensureUserSync(authUser: SupabaseUser) {
  const existing = await prisma.user.findUnique({
    where: { id: authUser.id },
  })

  if (existing) return existing

  return prisma.user.create({
    data: {
      id: authUser.id,
      email: authUser.email!,
      name: (authUser.user_metadata?.full_name as string | undefined) ?? null,
    },
  })
}
