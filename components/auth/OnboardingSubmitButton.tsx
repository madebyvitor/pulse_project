'use client'

import { useFormStatus } from 'react-dom'
import { ArrowRight, Loader2 } from 'lucide-react'

interface OnboardingSubmitButtonProps {
  label: string
}

export function OnboardingSubmitButton({ label }: OnboardingSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        'w-full flex items-center justify-center gap-2',
        'bg-[#C6FF4A] text-black font-bold py-3.5 rounded-lg',
        'hover:bg-[#d4ff6e] hover:shadow-[0_0_20px_rgba(198,255,74,0.2)]',
        'transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
      ].join(' ')}
    >
      {pending ? (
        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {label}
          <ArrowRight size={16} />
        </>
      )}
    </button>
  )
}
