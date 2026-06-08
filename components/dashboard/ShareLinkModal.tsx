'use client';

import React, { useState, useEffect } from 'react';
import { X, Link2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Project {
  id: string;
  name: string;
  client: string;
}

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
  projects: Project[];
  preSelectedProjectId?: string;
}

function generateHash(id: string) {
  // Simulated hash for MVP. Backend will generate real links.
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < 8; i++) {
    hash += chars[(id.charCodeAt(i % id.length) + i * 7) % chars.length];
  }
  return hash;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  open,
  onClose,
  projects,
  preSelectedProjectId,
}) => {
  const t = useTranslations('Dashboard.modals.share');
  const [selectedId, setSelectedId] = useState(preSelectedProjectId ?? projects[0]?.id ?? '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedId(preSelectedProjectId ?? projects[0]?.id ?? '');
      setCopied(false);
    }
  }, [open, preSelectedProjectId, projects]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const selectedProject = projects.find((p) => p.id === selectedId);
  const clientLink = selectedId
    ? `progressly.app/p/${generateHash(selectedId)}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${clientLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
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
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <Link2 size={16} />
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

            <div className="p-6 space-y-5">
              {/* Project Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                  {t('project')}
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C6FF4A]/40 transition-all text-white appearance-none cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#111111]">
                      {p.name} — {p.client}
                    </option>
                  ))}
                </select>
              </div>

              {/* Link Preview */}
              {selectedProject && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    {t('link')}
                  </p>
                  <div className="bg-[#0d0d0d] border border-[#222222] rounded-xl p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#444444] font-bold uppercase tracking-widest mb-1">
                        {selectedProject.client}
                      </p>
                      <p className="text-sm font-mono text-[#C6FF4A] truncate">
                        {clientLink}
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`shrink-0 p-2.5 rounded-lg border transition-all ${
                        copied
                          ? 'bg-[#C6FF4A]/10 border-[#C6FF4A]/30 text-[#C6FF4A]'
                          : 'bg-[#1a1a1a] border-[#222222] text-[#888888] hover:text-white hover:border-[#333333]'
                      }`}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-[#C6FF4A] font-medium flex items-center gap-1.5"
                    >
                      <Check size={12} />
                      {t('copied')}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Info */}
              <div className="bg-[#1a1a1a] rounded-xl p-4 space-y-1">
                <p className="text-xs font-bold text-[#888888]">💡 Como funciona?</p>
                <p className="text-xs text-[#444444] leading-relaxed">
                  Cole este link no WhatsApp ou e-mail do cliente. Ele terá acesso ao portal
                  exclusivo com a timeline de progresso do projeto.
                </p>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-full py-2.5 border border-[#222222] rounded-lg text-sm font-medium text-[#888888] hover:text-white hover:border-[#333333] transition-all"
              >
                {t('close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
