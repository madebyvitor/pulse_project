'use client'

import { cn } from '@/lib/utils'
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
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={cn(
        'h-10 w-full max-w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground outline-none transition-colors',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )}
    >
      {!value && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {projects.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name} — {p.client}
        </option>
      ))}
    </select>
  )
}
