'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

interface FormSubmitButtonProps {
  label: string
  loadingLabel?: string
  className?: string
  variant?: 'primary' | 'secondary'
}

export function FormSubmitButton({
  label,
  loadingLabel,
  className = '',
  variant = 'primary',
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus()

  const baseClass =
    variant === 'primary'
      ? 'flex-1 py-2.5 bg-[#C6FF4A] text-black rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 active:scale-95 transition-all'
      : 'flex-1 py-2.5 border border-[#222222] rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:border-[#333333] transition-all disabled:opacity-50'

  return (
    <button type="submit" disabled={pending} className={`${baseClass} ${className}`}>
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {loadingLabel ?? label}
        </>
      ) : (
        label
      )}
    </button>
  )
}
