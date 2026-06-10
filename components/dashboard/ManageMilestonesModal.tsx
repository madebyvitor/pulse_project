'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Milestone as MilestoneIcon, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import type { Milestone } from '@/lib/milestones';
import { calculateProgress } from '@/lib/milestones';

const schema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(2),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface ProjectOption {
  id: string;
  name: string;
  client: string;
}

interface ManageMilestonesModalProps {
  open: boolean;
  onClose: () => void;
  projects: ProjectOption[];
  milestones: Milestone[];
  onAddMilestone: (data: FormValues) => void;
  onToggleMilestone: (milestoneId: string) => void;
  preSelectedProjectId?: string;
}

export function ManageMilestonesModal({
  open,
  onClose,
  projects,
  milestones,
  onAddMilestone,
  onToggleMilestone,
  preSelectedProjectId,
}: ManageMilestonesModalProps) {
  const t = useTranslations('Dashboard.modals.milestones');
  const [selectedProjectId, setSelectedProjectId] = useState(
    preSelectedProjectId ?? projects[0]?.id ?? ''
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectId: preSelectedProjectId ?? '' },
  });

  useEffect(() => {
    if (open) {
      const id = preSelectedProjectId ?? projects[0]?.id ?? '';
      setSelectedProjectId(id);
      setValue('projectId', id);
      reset({ projectId: id, title: '', description: '' });
      setShowAddForm(false);
    }
  }, [open, preSelectedProjectId, projects, reset, setValue]);

  const projectMilestones = milestones.filter((m) => m.projectId === selectedProjectId);
  const progress = calculateProgress(milestones, selectedProjectId);

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 300));
    onAddMilestone({ ...data, projectId: selectedProjectId });
    reset({ projectId: selectedProjectId, title: '', description: '' });
    setShowAddForm(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg border-border bg-card">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <MilestoneIcon size={16} />
            </div>
            <DialogTitle className="text-base font-bold">{t('title')}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('project')}
            </Label>
            <Select
              value={selectedProjectId}
              onValueChange={(value) => {
                if (!value) return;
                setSelectedProjectId(value);
                setValue('projectId', value);
              }}
            >
              <SelectTrigger className="w-full bg-input border-border">
                <SelectValue placeholder={t('selectProject')} />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} — {p.client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('progress')}
              </span>
              <span className="text-lg font-black text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {t('progressHint', {
                completed: projectMilestones.filter((m) => m.completed).length,
                total: projectMilestones.length,
              })}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('listTitle')}
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm((v) => !v)}
              >
                {showAddForm ? t('cancelAdd') : t('addNew')}
              </Button>
            </div>

            {showAddForm && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl border border-border p-4">
                <div className="space-y-1.5">
                  <Label htmlFor="milestone-title">{t('milestoneTitle')}</Label>
                  <Input
                    id="milestone-title"
                    {...register('title')}
                    placeholder={t('milestoneTitlePlaceholder')}
                    className="bg-input border-border"
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="milestone-desc">{t('description')}</Label>
                  <Textarea
                    id="milestone-desc"
                    {...register('description')}
                    placeholder={t('descriptionPlaceholder')}
                    rows={2}
                    className="resize-none bg-input border-border"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full font-bold">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : t('add')}
                </Button>
              </form>
            )}

            <div className="max-h-48 space-y-2 overflow-y-auto">
              {projectMilestones.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">{t('empty')}</p>
              ) : (
                projectMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/30"
                  >
                    <Checkbox
                      checked={milestone.completed}
                      onCheckedChange={() => onToggleMilestone(milestone.id)}
                      className="mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          milestone.completed ? 'text-muted-foreground line-through' : ''
                        }`}
                      >
                        {milestone.title}
                      </p>
                      {milestone.description && (
                        <p className="text-xs text-muted-foreground">{milestone.description}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Button variant="outline" onClick={onClose} className="w-full">
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
