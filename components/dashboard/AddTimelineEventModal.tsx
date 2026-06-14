'use client'

import React, { useEffect, useTransition } from 'react'
import { X, Milestone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FormSubmitButton } from '@/components/dashboard/FormSubmitButton'
import { addTimelineEventAction } from '@/app/actions/dashboard'
import type { DashboardProject } from '@/lib/dashboard/types'

interface AddTimelineEventModalProps {
  open: boolean
  onClose: () => void
  projects: DashboardProject[]
  preSelectedProjectId?: string
}

export const AddTimelineEventModal: React.FC<AddTimelineEventModalProps> = ({
  open,
  onClose,
  projects,
  preSelectedProjectId,
}) => {
  const t = useTranslations('Dashboard.modals.timeline')
  const [isPending, startTransition] = useTransition()
  const defaultProjectId = preSelectedProjectId ?? projects[0]?.id ?? ''

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await addTimelineEventAction(formData)
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
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Milestone size={16} />
                </div>
                <h2 className="text-base font-bold">{t('title')}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-[#444444] hover:text-white transition-colors p-1 rounded-md hover:bg-[#1a1a1a]"
              >
                <X size={18} />
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="p-6">
                <p className="text-sm text-[#888888]">{t('noProjects')}</p>
              </div>
            ) : (
              <form action={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    {t('project')}
                  </label>
                  <select
                    name="projectId"
                    required
                    defaultValue={defaultProjectId}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all text-white"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.client}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    {t('eventTitle')} <span className="text-[#C6FF4A]">*</span>
                  </label>
                  <input
                    name="title"
                    required
                    minLength={3}
                    placeholder={t('eventTitlePlaceholder')}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    {t('description')}
                  </label>
                  <textarea
                    name="description"
                    placeholder={t('descriptionPlaceholder')}
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1 py-2.5 border border-[#222222] rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:border-[#333333] transition-all disabled:opacity-50"
                  >
                    {t('cancel')}
                  </button>
                  <FormSubmitButton label={t('add')} loadingLabel={t('adding')} />
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
