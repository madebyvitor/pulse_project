'use client'

import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import { Milestone as MilestoneIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/src/i18n/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ProjectSelect } from '@/components/dashboard/ProjectSelect'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { FormSubmitButton } from '@/components/dashboard/FormSubmitButton'
import { addMilestoneAction, toggleMilestoneAction } from '@/app/actions/dashboard'
import type { Milestone } from '@/lib/milestones'
import { calculateProgress } from '@/lib/milestones'
import type { DashboardProject } from '@/lib/dashboard/types'

interface ManageMilestonesModalProps {
  open: boolean
  onClose: () => void
  projects: DashboardProject[]
  milestones: Milestone[]
  preSelectedProjectId?: string
}

export function ManageMilestonesModal({
  open,
  onClose,
  projects,
  milestones,
  preSelectedProjectId,
}: ManageMilestonesModalProps) {
  const t = useTranslations('Dashboard.modals.milestones')
  const router = useRouter()
  const [selectedProjectId, setSelectedProjectId] = useState(
    preSelectedProjectId ?? projects[0]?.id ?? ''
  )
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [optimisticMilestones, setOptimisticMilestones] = useOptimistic(
    milestones,
    (state, update: { id: string; completed: boolean }) =>
      state.map((m) => (m.id === update.id ? { ...m, completed: update.completed } : m))
  )

  useEffect(() => {
    if (open) {
      const id = preSelectedProjectId ?? projects[0]?.id ?? ''
      setSelectedProjectId(id)
      setShowAddForm(false)
      setError(null)
    }
  }, [open, preSelectedProjectId, projects])

  const projectMilestones = optimisticMilestones.filter((m) => m.projectId === selectedProjectId)
  const progress = calculateProgress(optimisticMilestones, selectedProjectId)

  const handleAddMilestone = (formData: FormData) => {
    formData.set('projectId', selectedProjectId)
    startTransition(async () => {
      await addMilestoneAction(formData)
      setShowAddForm(false)
    })
  }

  const handleToggle = (milestoneId: string, completed: boolean) => {
    setError(null)
    startTransition(async () => {
      setOptimisticMilestones({ id: milestoneId, completed })
      try {
        await toggleMilestoneAction(milestoneId)
        router.refresh()
      } catch {
        setError(t('toggleError'))
        router.refresh()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-lg border-border bg-card">
        <DialogHeader className="shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <MilestoneIcon size={16} />
            </div>
            <DialogTitle className="text-base font-bold">{t('title')}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('project')}
            </Label>
            <ProjectSelect
              projects={projects}
              value={selectedProjectId}
              onValueChange={setSelectedProjectId}
              placeholder={t('selectProject')}
            />
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
              <form action={handleAddMilestone} className="space-y-3 rounded-xl border border-border p-4">
                <input type="hidden" name="projectId" value={selectedProjectId} />
                <div className="space-y-1.5">
                  <Label htmlFor="milestone-title">{t('milestoneTitle')}</Label>
                  <Input
                    id="milestone-title"
                    name="title"
                    required
                    minLength={2}
                    placeholder={t('milestoneTitlePlaceholder')}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="milestone-desc">{t('description')}</Label>
                  <Textarea
                    id="milestone-desc"
                    name="description"
                    placeholder={t('descriptionPlaceholder')}
                    rows={2}
                    className="resize-none bg-input border-border"
                  />
                </div>
                <FormSubmitButton label={t('add')} className="w-full font-bold" />
              </form>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

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
                      onCheckedChange={(checked) =>
                        handleToggle(milestone.id, checked === true)
                      }
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
  )
}
