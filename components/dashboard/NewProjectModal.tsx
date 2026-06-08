'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, FolderPlus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const schema = z.object({
  projectName: z.string().min(2),
  description: z.string().optional(),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormValues) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ open, onClose, onSave }) => {
  const t = useTranslations('Dashboard.modals.newProject');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Reset form on open
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 400)); // Simulate async
    onSave(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#111111] border border-[#222222] rounded-2xl shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C6FF4A]/10 flex items-center justify-center text-[#C6FF4A]">
                  <FolderPlus size={16} />
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

            {/* Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {t('projectName')} <span className="text-[#C6FF4A]">*</span>
                </label>
                <input
                  {...register('projectName')}
                  placeholder={t('projectNamePlaceholder')}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                />
                {errors.projectName && (
                  <p className="text-xs text-red-400">{errors.projectName.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {t('description')}
                </label>
                <textarea
                  {...register('description')}
                  placeholder={t('descriptionPlaceholder')}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444] resize-none"
                />
              </div>

              <div className="border-t border-[#222222] pt-4">
                {/* Client Name */}
                <div className="space-y-1.5 mb-4">
                  <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    {t('clientName')} <span className="text-[#C6FF4A]">*</span>
                  </label>
                  <input
                    {...register('clientName')}
                    placeholder={t('clientNamePlaceholder')}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                  />
                  {errors.clientName && (
                    <p className="text-xs text-red-400">{errors.clientName.message}</p>
                  )}
                </div>

                {/* Client Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    {t('clientEmail')} <span className="text-[#C6FF4A]">*</span>
                  </label>
                  <input
                    {...register('clientEmail')}
                    type="email"
                    placeholder={t('clientEmailPlaceholder')}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-red-400">{errors.clientEmail.message}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-[#222222] rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:border-[#333333] transition-all"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-[#C6FF4A] text-black rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    t('create')
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
