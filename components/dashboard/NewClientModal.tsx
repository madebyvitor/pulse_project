'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { X, UserPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FormSubmitButton } from '@/components/dashboard/FormSubmitButton'
import { createClientAction } from '@/app/actions/dashboard'

interface NewClientModalProps {
  open: boolean
  onClose: () => void
}

export const NewClientModal: React.FC<NewClientModalProps> = ({ open, onClose }) => {
  const tModal = useTranslations('Dashboard.modals.newClient')
  const tForm = useTranslations('Dashboard.clients')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    if (open) setError(null)
  }, [open])

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const result = await createClientAction(formData)
      if (result?.error === 'duplicate_email') {
        setError(tModal('duplicateEmail'))
        return
      }
      if (result?.error === 'invalid_data') {
        setError(tModal('invalidData'))
        return
      }
      onClose()
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#111111] border border-[#222222] rounded-2xl shadow-2xl z-10"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C6FF4A]/10 flex items-center justify-center text-[#C6FF4A]">
                  <UserPlus size={16} />
                </div>
                <h2 className="text-base font-bold">{tModal('title')}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-[#444444] hover:text-white transition-colors p-1 rounded-md hover:bg-[#1a1a1a]"
              >
                <X size={18} />
              </button>
            </div>

            <form action={handleSubmit} className="p-6 space-y-4">
              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {tForm('nameLabel')} <span className="text-[#C6FF4A]">*</span>
                </label>
                <input
                  name="name"
                  required
                  minLength={2}
                  placeholder={tForm('namePlaceholder')}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {tForm('emailLabel')} <span className="text-[#C6FF4A]">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={tForm('emailPlaceholder')}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="flex-1 py-2.5 border border-[#222222] rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:border-[#333333] transition-all disabled:opacity-50"
                >
                  {tModal('cancel')}
                </button>
                <FormSubmitButton label={tModal('create')} loadingLabel={tModal('creating')} />
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
