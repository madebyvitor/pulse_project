'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  feature?: string;
}

export function ComingSoonModal({ open, onClose, feature }: ComingSoonModalProps) {
  const t = useTranslations('ClientPortal.comingSoon');

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader className="items-center text-center sm:text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Clock size={24} />
          </div>
          <DialogTitle className="text-lg font-bold">{t('title')}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {feature ? t('descriptionWithFeature', { feature }) : t('description')}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} className="w-full font-bold">
          {t('close')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
