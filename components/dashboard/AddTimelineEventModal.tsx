'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Milestone, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  projectId: z.string().min(1, 'Selecione um projeto'),
  title: z.string().min(3, 'Título deve ter ao menos 3 caracteres'),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Project {
  id: string;
  name: string;
  client: string;
}

interface AddTimelineEventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormValues) => void;
  projects: Project[];
  preSelectedProjectId?: string;
}

export const AddTimelineEventModal: React.FC<AddTimelineEventModalProps> = ({
  open,
  onClose,
  onSave,
  projects,
  preSelectedProjectId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectId: preSelectedProjectId ?? '' },
  });

  useEffect(() => {
    if (open) reset({ projectId: preSelectedProjectId ?? '' });
  }, [open, reset, preSelectedProjectId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    onSave(data);
    onClose();
  };

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
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Milestone size={16} />
                </div>
                <h2 className="text-base font-bold">Adicionar Evento na Timeline</h2>
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
              {/* Project Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  Projeto <span className="text-[#C6FF4A]">*</span>
                </label>
                <select
                  {...register('projectId')}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all text-white appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#111111]">Selecione um projeto...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#111111]">
                      {p.name} — {p.client}
                    </option>
                  ))}
                </select>
                {errors.projectId && (
                  <p className="text-xs text-red-400">{errors.projectId.message}</p>
                )}
              </div>

              {/* Event Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  Título do Evento <span className="text-[#C6FF4A]">*</span>
                </label>
                <input
                  {...register('title')}
                  placeholder="Ex: Sistema de Login Finalizado"
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444]"
                />
                {errors.title && (
                  <p className="text-xs text-red-400">{errors.title.message}</p>
                )}
              </div>

              {/* Description (optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  Descrição{' '}
                  <span className="text-[#444444] normal-case font-normal">(opcional)</span>
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Detalhes adicionais sobre o evento..."
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 focus:ring-1 focus:ring-[#C6FF4A]/10 transition-all placeholder:text-[#444444] resize-none"
                />
              </div>

              {/* Type info */}
              <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <p className="text-xs text-[#888888]">
                  Tipo padrão neste MVP:{' '}
                  <span className="text-purple-400 font-bold">MILESTONE</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-[#222222] rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:border-[#333333] transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-[#C6FF4A] text-black rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 active:scale-95 transition-all"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Adicionar Evento'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
