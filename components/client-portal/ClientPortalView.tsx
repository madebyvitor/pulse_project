'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, ArrowUpRight, Circle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { WhiteLabelHeader } from '@/components/client-portal/WhiteLabelHeader';
import { TimelineItem } from '@/components/client-portal/TimelineItem';
import { ProgressBar } from '@/components/client-portal/ProgressBar';
import { PrimaryButtonBase } from '@/components/client-portal/PrimaryButtonBase';
import { ComingSoonModal } from '@/components/shared/ComingSoonModal';
import type { Project, TimelineEvent } from '@/lib/mock/data';

interface ClientPortalViewProps {
  project: Project;
  progress: number;
  timelineEvents: TimelineEvent[];
}

export function ClientPortalView({ project, progress, timelineEvents }: ClientPortalViewProps) {
  const t = useTranslations('ClientPortal');
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#C6FF4A] selection:text-black">
      <WhiteLabelHeader
        agencyName={project.agencyName}
        clientName={project.client}
        onBackToWebsite={() => console.log('Voltando ao site...')}
      />

      <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-8 space-y-12">
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#C6FF4A] text-sm font-bold uppercase tracking-[0.2em]">
                  {t('badge')}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {t('greeting', { name: project.client.split(' ')[0] })}
                </h1>
                <p className="text-[#888888] text-lg max-w-2xl">
                  {t('subtitle')}{' '}
                  <span className="text-white font-medium">{project.name}</span>.
                </p>
              </div>

              <div className="p-8 bg-[#111111] border border-[#222222] rounded-2xl space-y-4">
                <ProgressBar progress={progress} label={t('progressLabel')} size="lg" animated />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#888888]">
                    <Circle size={8} className="fill-[#C6FF4A] text-[#C6FF4A]" />
                    <span>{t('activeStatus')}</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {project.nextDelivery && (
              <motion.section
                variants={itemVariants}
                className="relative overflow-hidden p-8 bg-[#111111] border border-[#222222] rounded-2xl"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <ArrowUpRight size={120} className="text-[#C6FF4A]" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 bg-[#C6FF4A]/10 text-[#C6FF4A] text-[10px] font-bold uppercase tracking-widest rounded border border-[#C6FF4A]/20">
                        {t('nextDelivery.badge')}
                      </span>
                      <h3 className="text-2xl font-bold pt-2">{project.nextDelivery.title}</h3>
                    </div>
                    <div className="text-left sm:text-right flex flex-row sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0">
                      <span className="text-[#888888] text-xs uppercase tracking-wider block">
                        {t('nextDelivery.deadline')}
                      </span>
                      <span className="font-mono text-sm font-bold">{project.nextDelivery.deadline}</span>
                    </div>
                  </div>

                  <p className="text-[#888888] max-w-xl leading-relaxed">
                    {project.nextDelivery.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full justify-center sm:justify-start">
                    <PrimaryButtonBase variant="primary" size="md" className="w-full sm:w-auto justify-center">
                      {t('nextDelivery.approve')}
                    </PrimaryButtonBase>
                    <PrimaryButtonBase variant="outline" size="md" className="w-full sm:w-auto justify-center">
                      {t('nextDelivery.details')}
                    </PrimaryButtonBase>
                  </div>
                </div>
              </motion.section>
            )}

            <motion.section variants={itemVariants} className="space-y-8">
              <div className="flex justify-between items-end border-b border-[#222222] pb-4">
                <h3 className="text-xl font-bold">{t('timeline.title')}</h3>
              </div>
              <div className="pl-2">
                {timelineEvents.length > 0 ? (
                  timelineEvents.map((event, index) => (
                    <TimelineItem
                      key={event.id}
                      title={event.title}
                      description={event.description}
                      timestamp={event.timestamp}
                      status={event.status}
                      type={event.type as import('@/components/client-portal/TimelineItem').TimelineEventIcon}
                      isLast={index === timelineEvents.length - 1}
                    />
                  ))
                ) : (
                  <p className="text-sm text-[#888888]">{t('timeline.empty')}</p>
                )}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <motion.section variants={itemVariants} className="space-y-3">
              <h3 className="text-sm font-bold text-[#888888] uppercase tracking-wider">
                {t('sidebar.title')}
              </h3>

              <button
                type="button"
                onClick={() => setComingSoonFeature(t('sidebar.documents'))}
                className="w-full flex items-center gap-4 p-5 bg-[#111111] border border-[#222222] rounded-2xl hover:border-[#333333] transition-all text-left group"
              >
                <div className="w-10 h-10 bg-[#050505] rounded-lg flex items-center justify-center text-[#888888] group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm group-hover:text-[#C6FF4A] transition-colors">
                    {t('sidebar.documents')}
                  </p>
                  <p className="text-xs text-[#888888]">{t('sidebar.documentsDesc')}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setComingSoonFeature(t('sidebar.messages'))}
                className="w-full flex items-center gap-4 p-5 bg-[#111111] border border-[#222222] rounded-2xl hover:border-[#333333] transition-all text-left group"
              >
                <div className="w-10 h-10 bg-[#050505] rounded-lg flex items-center justify-center text-[#888888] group-hover:text-white transition-colors">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm group-hover:text-[#C6FF4A] transition-colors">
                    {t('sidebar.messages')}
                  </p>
                  <p className="text-xs text-[#888888]">{t('sidebar.messagesDesc')}</p>
                </div>
              </button>
            </motion.section>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-[#222222] mt-12 opacity-50">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#444444] text-center md:text-left">
          <span>© {new Date().getFullYear()} {project.agencyName.toUpperCase()}</span>
        </div>
      </footer>

      <ComingSoonModal
        open={comingSoonFeature !== null}
        onClose={() => setComingSoonFeature(null)}
        feature={comingSoonFeature ?? undefined}
      />
    </div>
  );
}
