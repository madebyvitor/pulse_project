import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { redirect } from '@/src/i18n/navigation'
import { getAuthenticatedOrganization } from '@/lib/auth/get-organization'
import { OnboardingForm } from '@/components/auth/OnboardingForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return locale === 'en'
    ? {
        title: 'Set up your agency — Progressly',
        description:
          'Complete your registration by entering your agency or studio name to access Progressly.',
      }
    : {
        title: 'Configurar agência — Progressly',
        description:
          'Complete seu cadastro informando o nome da sua agência ou estúdio para acessar o Progressly.',
      }
}

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const ctx = await getAuthenticatedOrganization()
  if (ctx) {
    redirect({ href: '/dashboard', locale: await getLocale() })
  }

  return <OnboardingForm />
}
