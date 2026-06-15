export type ProjectStatus = 'Design' | 'Dev' | 'Done'

export interface DashboardClient {
  id: string
  name: string
  email: string
  projectCount: number
}

export interface DashboardProject {
  id: string
  slug: string
  name: string
  description?: string
  clientId: string
  client: string
  clientEmail: string
  status: ProjectStatus
  lastUpdate: string
  agencyName: string
  nextDelivery?: {
    title: string
    deadline: string
    description: string
  }
}

export type TimelineEventType = 'milestone' | 'design' | 'deploy' | 'rocket' | 'manual'
export type TimelineEventStatus = 'completed' | 'current' | 'pending'

export interface DashboardTimelineEvent {
  id: string
  projectId: string
  title: string
  description: string
  timestamp: string
  status: TimelineEventStatus
  type: TimelineEventType
}

export interface Activity {
  id: string
  type: 'file' | 'deploy' | 'client' | 'message' | 'milestone'
  content: string
  time: string
}
