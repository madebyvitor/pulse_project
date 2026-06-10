import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ClientPortalView } from '@/components/client-portal/ClientPortalView';
import {
  getProjectByToken,
  getTimelineForProject,
  INITIAL_MILESTONES,
} from '@/lib/mock/data';
import { calculateProgress } from '@/lib/milestones';

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);

  const project = getProjectByToken(token);

  if (!project) {
    notFound();
  }

  const progress = calculateProgress(INITIAL_MILESTONES, project.id);
  const timelineEvents = getTimelineForProject(project.id);

  return (
    <ClientPortalView
      project={project}
      progress={progress}
      timelineEvents={timelineEvents}
    />
  );
}
