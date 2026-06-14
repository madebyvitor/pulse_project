'use client'

import { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { DashboardProject } from '@/lib/dashboard/types'

interface ProjectSelectProps {
  projects: DashboardProject[]
  value: string
  onValueChange: (value: string) => void
  placeholder: string
}

export function ProjectSelect({
  projects,
  value,
  onValueChange,
  placeholder,
}: ProjectSelectProps) {
  const items = useMemo(
    () =>
      projects.map((p) => ({
        value: p.id,
        label: `${p.name} — ${p.client}`,
      })),
    [projects]
  )

  return (
    <Select
      modal={false}
      items={items}
      value={value}
      onValueChange={(next) => next && onValueChange(next)}
    >
      <SelectTrigger className="w-full max-w-full overflow-hidden bg-input border-border">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className="z-[100]">
        {projects.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            {p.name} — {p.client}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
