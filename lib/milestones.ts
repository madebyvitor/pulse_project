export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  completed: boolean;
}

export function calculateProgress(milestones: Milestone[], projectId?: string): number {
  const filtered = projectId
    ? milestones.filter((m) => m.projectId === projectId)
    : milestones;

  if (filtered.length === 0) return 0;

  const completed = filtered.filter((m) => m.completed).length;
  return Math.round((completed / filtered.length) * 100);
}

export function getProjectMilestones(milestones: Milestone[], projectId: string): Milestone[] {
  return milestones.filter((m) => m.projectId === projectId);
}
