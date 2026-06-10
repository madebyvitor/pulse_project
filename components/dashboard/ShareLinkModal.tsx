'use client';

import React, { useState } from 'react';
import { Link2, Copy, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generatePortalToken } from '@/lib/mock/data';

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

function ShareLinkModalContent({
  onClose,
  projects,
  preSelectedProjectId,
}: Omit<ShareLinkModalProps, 'open'>) {
  const t = useTranslations('Dashboard.modals.share');
  const locale = useLocale();
  const [selectedId, setSelectedId] = useState(
    preSelectedProjectId ?? projects[0]?.id ?? ''
  );
  const [copied, setCopied] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedId);
  const token = selectedId ? generatePortalToken(selectedId) : '';
  const clientLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${locale}/p/${token}`
      : `/${locale}/p/${token}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(clientLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <>
      <DialogHeader className="pr-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <Link2 size={16} />
          </div>
          <DialogTitle className="min-w-0 flex-1 text-base font-bold leading-snug">
            {t('title')}
          </DialogTitle>
        </div>
      </DialogHeader>

      <div className="min-w-0 space-y-5">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('project')}
          </Label>
          <Select
            modal={false}
            value={selectedId}
            onValueChange={(value) => value && setSelectedId(value)}
          >
            <SelectTrigger className="w-full max-w-full overflow-hidden bg-input border-border">
              <SelectValue placeholder={t('selectProject')} />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} — {p.client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProject && (
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('link')}
            </Label>
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {selectedProject.client}
                </p>
                <p className="break-all font-mono text-sm text-primary">{clientLink}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className={`shrink-0 self-end sm:self-center ${copied ? 'border-primary/30 text-primary' : ''}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
            {copied && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
                <Check size={12} />
                {t('copied')}
              </p>
            )}
          </div>
        )}

        <div className="space-y-1 rounded-xl bg-muted/30 p-4">
          <p className="text-xs font-bold text-muted-foreground">{t('howItWorks')}</p>
          <p className="break-words text-xs leading-relaxed text-muted-foreground">
            {t('howItWorksDesc')}
          </p>
        </div>

        <Button variant="outline" onClick={onClose} className="w-full">
          {t('close')}
        </Button>
      </div>
    </>
  );
}

export function ShareLinkModal({
  open,
  onClose,
  projects,
  preSelectedProjectId,
}: ShareLinkModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="overflow-hidden sm:max-w-md border-border bg-card">
        {open ? (
          <ShareLinkModalContent
            onClose={onClose}
            projects={projects}
            preSelectedProjectId={preSelectedProjectId}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
