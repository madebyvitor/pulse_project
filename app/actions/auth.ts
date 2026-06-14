'use server'

import type { AuthError } from '@supabase/supabase-js'
import { getLocale } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import { ensureUserSync } from '@/lib/auth/ensure-user'
import { redirect } from '@/src/i18n/navigation'

export type SignupErrorCode =
  | 'email_taken'
  | 'weak_password'
  | 'invalid_email'
  | 'signup_failed'

export type AuthActionResult = {
  error: 'auth_failed' | SignupErrorCode
} | null

function mapSignupError(error: AuthError): SignupErrorCode {
  const message = error.message.toLowerCase()

  if (
    error.code === 'user_already_exists' ||
    message.includes('already registered') ||
    message.includes('already been registered')
  ) {
    return 'email_taken'
  }

  if (
    error.code === 'weak_password' ||
    message.includes('password') ||
    message.includes('weak')
  ) {
    return 'weak_password'
  }

  if (
    error.code === 'validation_failed' ||
    message.includes('invalid email') ||
    message.includes('valid email')
  ) {
    return 'invalid_email'
  }

  return 'signup_failed'
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'auth_failed' }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'auth_failed' }
  }

  await ensureUserSync(user)

  redirect({ href: '/dashboard', locale: await getLocale() })
}

export async function signup(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  })

  if (error) {
    console.error('[signup]', error.message, error.code)
    return { error: mapSignupError(error) }
  }

  if (!data.user) {
    console.error('[signup]', 'no user returned')
    return { error: 'signup_failed' }
  }

  if (data.user.identities?.length === 0) {
    console.error('[signup]', 'email already registered (empty identities)')
    return { error: 'email_taken' }
  }

  if (!data.session) {
    console.error('[signup]', 'no session — email confirmation may be enabled in Supabase')
    return { error: 'signup_failed' }
  }

  try {
    await ensureUserSync(data.user)
  } catch (syncError) {
    console.error('[signup]', 'ensureUserSync failed', syncError)
    return { error: 'signup_failed' }
  }

  redirect({ href: '/onboarding', locale: await getLocale() })
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect({ href: '/login', locale: await getLocale() })
}
