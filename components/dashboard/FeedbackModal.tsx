'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { CheckCircle2, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormSubmitButton } from '@/components/dashboard/FormSubmitButton'
import { submitFeedbackAction } from '@/app/actions/feedback'

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const t = useTranslations('Dashboard.modals.feedback')
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (open) {
      setError(null)
      setSubmitted(false)
    }
  }, [open])

  useEffect(() => {
    if (!submitted) return

    const timer = setTimeout(() => {
      onClose()
    }, 2000)

    return () => clearTimeout(timer)
  }, [submitted, onClose])

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const result = await submitFeedbackAction(formData)
      if (result?.error === 'invalid_data' || result?.error === 'unauthenticated') {
        setError(t('invalidData'))
        return
      }
      setSubmitted(true)
    })
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md border-border bg-card">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 size={40} className="text-[#C6FF4A]" />
            <p className="text-sm text-[#888888]">{t('success')}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#C6FF4A]/10 text-[#C6FF4A]">
                  <MessageSquare size={16} />
                </div>
                <div className="space-y-1 text-left">
                  <DialogTitle className="text-base font-bold">{t('title')}</DialogTitle>
                  <DialogDescription className="text-sm text-[#888888]">
                    {t('subtitle')}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form action={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {t('categoryLabel')} <span className="text-[#C6FF4A]">*</span>
                </label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all text-white"
                >
                  <option value="" disabled>
                    {t('categoryPlaceholder')}
                  </option>
                  <option value="BUG">{t('categoryBug')}</option>
                  <option value="SUGGESTION">{t('categorySuggestion')}</option>
                  <option value="PRAISE">{t('categoryPraise')}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {t('messageLabel')} <span className="text-[#C6FF4A]">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444] resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <FormSubmitButton label={t('submit')} className="w-full flex-none" />
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
