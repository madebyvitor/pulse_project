import type { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'

function isInvalidRefreshTokenError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message.toLowerCase()
      : ''

  return message.includes('refresh token') || message.includes('invalid refresh')
}

export async function getAuthUser(): Promise<User | null> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      if (isInvalidRefreshTokenError(error)) {
        await supabase.auth.signOut({ scope: 'local' })
      }
      return null
    }

    return user
  } catch (error) {
    if (isInvalidRefreshTokenError(error)) {
      try {
        await supabase.auth.signOut({ scope: 'local' })
      } catch {
        // Cookie writes may fail in Server Components; proxy clears stale cookies.
      }
    }
    return null
  }
}
