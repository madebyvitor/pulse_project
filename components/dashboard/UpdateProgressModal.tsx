'use client';

import React, { useState, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
}

interface UpdateProgressModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (projectId: string, progress: number) => void;
  projects: Project[];
}

export const UpdateProgressModal: React.FC<UpdateProgressModalProps> = ({
  open,
  onClose,
  onSave,
  projects,
}) => {
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? '');
  const [progress, setProgress] = useState(0);

  const selectedProject = projects.find((p) => p.id === selectedId);

  useEffect(() => {
    if (open && selectedProject) {
      setProgress(selectedProject.progress);
    }
  }, [open, selectedId, selectedProject]);

  useEffect(() => {
    if (open && projects.length > 0) setSelectedId(projects[0].id);
  }, [open, projects]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Color based on progress
  const progressColor =
    progress === 100
      ? '#C6FF4A'
      : progress >= 70
      ? '#C6FF4A'
      : progress >= 40
      ? '#facc15'
      : '#f87171';

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
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <SlidersHorizontal size={16} />
                </div>
                <h2 className="text-base font-bold">Atualizar Progresso</h2>
              </div>
              <button
                onClick={onClose}
                className="text-[#444444] hover:text-white transition-colors p-1 rounded-md hover:bg-[#1a1a1a]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  Projeto
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => {
                    setSelectedId(e.target.value);
                    const proj = projects.find((p) => p.id === e.target.value);
                    if (proj) setProgress(proj.progress);
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 transition-all text-white appearance-none cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#111111]">
                      {p.name} — {p.client}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    Percentual de Conclusão
                  </label>
                  <span
                    className="text-2xl font-black tabular-nums transition-all"
                    style={{ color: progressColor }}
                  >
                    {progress}%
                  </span>
                </div>

                {/* Track */}
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#1a1a1a] border border-[#222222]"
                    style={{
                      background: `linear-gradient(to right, ${progressColor} ${progress}%, #1a1a1a ${progress}%)`,
                    }}
                  />
                </div>

                {/* Labels */}
                <div className="flex justify-between text-[10px] text-[#444444] font-bold uppercase tracking-widest">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-[#444444] uppercase tracking-widest">
                  Atalhos Rápidos
                </p>
                <div className="flex gap-2 flex-wrap">
                  {[0, 25, 50, 75, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setProgress(val)}
                      className={`px-3 py-1 rounded-md text-xs font-bold border transition-all ${
                        progress === val
                          ? 'bg-[#C6FF4A] text-black border-[#C6FF4A]'
                          : 'bg-[#1a1a1a] text-[#888888] border-[#222222] hover:border-[#333333] hover:text-white'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
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
                  onClick={() => {
                    if (selectedId) {
                      onSave(selectedId, progress);
                      onClose();
                    }
                  }}
                  className="flex-1 py-2.5 bg-[#C6FF4A] text-black rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
                >
                  Salvar Progresso
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
