import { getLocale } from 'next-intl/server'
import { redirect } from '@/src/i18n/navigation'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export type AuthenticatedOrganization = {
  user: {
    id: string
    email: string
    name: string | null
  }
  organization: {
    id: string
    name: string
  }
  membership: {
    id: string
    role: 'OWNER' | 'MEMBER'
  }
}

export async function getAuthenticatedOrganization(): Promise<AuthenticatedOrganization | null> {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser?.email) {
    return null
  }

  const membership = await prisma.userOrganization.findFirst({
    where: { userId: authUser.id },
    include: { organization: true },
  })

  if (!membership) {
    return null
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { id: true, email: true, name: true },
  })

  return {
    user: {
      id: authUser.id,
      email: dbUser?.email ?? authUser.email,
      name: dbUser?.name ?? (authUser.user_metadata?.full_name as string | undefined) ?? null,
    },
    organization: {
      id: membership.organization.id,
      name: membership.organization.name,
    },
    membership: {
      id: membership.id,
      role: membership.role,
    },
  }
}

export async function requireAuthenticatedOrganization(): Promise<AuthenticatedOrganization> {
  const ctx = await getAuthenticatedOrganization()

  if (!ctx) {
    throw new Error('Organization not found for authenticated user')
  }

  return ctx
}

export async function getOrganizationOrRedirectOnboarding(): Promise<AuthenticatedOrganization> {
  const ctx = await getAuthenticatedOrganization()

  if (!ctx) {
    redirect({ href: '/onboarding', locale: await getLocale() })
    throw new Error('No organization')
  }

  return ctx
}
