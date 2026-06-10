import type { Milestone } from '@/lib/milestones';

export type { Milestone };

export type ProjectStatus = 'Design' | 'Dev' | 'Done';

export interface Project {
  id: string;
  name: string;
  description?: string;
  client: string;
  clientEmail: string;
  status: ProjectStatus;
  lastUpdate: string;
  agencyName: string;
  nextDelivery?: {
    title: string;
    deadline: string;
    description: string;
  };
}

export type TimelineEventType = 'milestone' | 'design' | 'deploy' | 'rocket' | 'manual';
export type TimelineEventStatus = 'completed' | 'current' | 'pending';

export interface TimelineEvent {
  id: string;
  projectId: string;
  title: string;
  description: string;
  timestamp: string;
  status: TimelineEventStatus;
  type: TimelineEventType;
}

export interface Activity {
  id: string;
  type: 'file' | 'deploy' | 'client' | 'message' | 'milestone';
  content: string;
  time: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Rebranding 2024',
    client: 'Acme Corp',
    clientEmail: 'contact@acme.com',
    status: 'Design',
    lastUpdate: '2h atrás',
    agencyName: 'Progressly Agency',
    nextDelivery: {
      title: 'Aprovação da identidade visual',
      deadline: '24 Out, 2024',
      description: 'Revisão final do manual da marca e aplicações.',
    },
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    client: 'Globex Inc',
    clientEmail: 'dev@globex.com',
    status: 'Dev',
    lastUpdate: '5h atrás',
    agencyName: 'Progressly Agency',
    nextDelivery: {
      title: 'Checkout & Pagamentos',
      deadline: '02 Nov, 2024',
      description: 'Integração com gateway de pagamento em homologação.',
    },
  },
  {
    id: '3',
    name: 'Mobile App Revamp',
    client: 'Stark Ind',
    clientEmail: 'pm@stark.com',
    status: 'Done',
    lastUpdate: 'Ontem',
    agencyName: 'Progressly Agency',
  },
  {
    id: '4',
    name: 'SEO Campaign',
    client: 'Wayne Ent',
    clientEmail: 'marketing@wayne.com',
    status: 'Dev',
    lastUpdate: '2 dias atrás',
    agencyName: 'Progressly Agency',
  },
  {
    id: '5',
    name: 'User Research',
    client: 'Umbrella Corp',
    clientEmail: 'research@umbrella.com',
    status: 'Design',
    lastUpdate: '3 dias atrás',
    agencyName: 'Progressly Agency',
  },
];

export const INITIAL_MILESTONES: Milestone[] = [
  { id: 'm1', projectId: '1', title: 'Briefing e kick-off', description: 'Alinhamento inicial com o cliente', completed: true },
  { id: 'm2', projectId: '1', title: 'Conceito visual', description: 'Moodboard e direção criativa', completed: true },
  { id: 'm3', projectId: '1', title: 'Manual da marca', description: 'Tipografia, cores e aplicações', completed: false },
  { id: 'm4', projectId: '1', title: 'Entrega final', description: 'Arquivos finais e handoff', completed: false },
  { id: 'm5', projectId: '2', title: 'Arquitetura', completed: true },
  { id: 'm6', projectId: '2', title: 'Catálogo de produtos', completed: true },
  { id: 'm7', projectId: '2', title: 'Carrinho e checkout', completed: false },
  { id: 'm8', projectId: '2', title: 'Deploy produção', completed: false },
  { id: 'm9', projectId: '3', title: 'Discovery', completed: true },
  { id: 'm10', projectId: '3', title: 'UI/UX', completed: true },
  { id: 'm11', projectId: '3', title: 'Desenvolvimento', completed: true },
  { id: 'm12', projectId: '3', title: 'Publicação', completed: true },
  { id: 'm13', projectId: '4', title: 'Auditoria SEO', completed: true },
  { id: 'm14', projectId: '4', title: 'Otimização on-page', completed: true },
  { id: 'm15', projectId: '4', title: 'Link building', completed: true },
  { id: 'm16', projectId: '4', title: 'Relatório mensal', completed: false },
  { id: 'm17', projectId: '5', title: 'Planejamento', completed: true },
  { id: 'm18', projectId: '5', title: 'Entrevistas', completed: false },
  { id: 'm19', projectId: '5', title: 'Síntese', completed: false },
  { id: 'm20', projectId: '5', title: 'Apresentação', completed: false },
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    projectId: '2',
    title: 'Projeto Iniciado',
    description: 'Kick-off meeting e definição de objetivos estratégicos.',
    timestamp: '15 Set',
    status: 'completed',
    type: 'milestone',
  },
  {
    id: 't2',
    projectId: '2',
    title: 'Draft Inicial',
    description: 'Entrega dos primeiros wireframes e fluxo do usuário.',
    timestamp: '22 Set',
    status: 'completed',
    type: 'design',
  },
  {
    id: 't3',
    projectId: '2',
    title: 'Revisão de Design',
    description: 'Apresentação do conceito visual e guia de estilos.',
    timestamp: '05 Out',
    status: 'completed',
    type: 'design',
  },
  {
    id: 't4',
    projectId: '2',
    title: 'Desenvolvimento Frontend',
    description: 'Implementação das telas principais em ambiente de testes.',
    timestamp: 'Em curso',
    status: 'current',
    type: 'deploy',
  },
  {
    id: 't5',
    projectId: '2',
    title: 'Deploy Homologação',
    description: 'Ambiente final para testes de aceitação do cliente.',
    timestamp: '02 Nov',
    status: 'pending',
    type: 'rocket',
  },
];

export const INITIAL_ACTIVITIES: Activity[] = [
  { id: 'a1', type: 'file', content: 'Cliente Acme Corp enviou documento de identidade visual', time: 'Há 10 minutos' },
  { id: 'a2', type: 'deploy', content: 'Deploy realizado em E-commerce Platform (Staging)', time: 'Há 2 horas' },
  { id: 'a3', type: 'client', content: 'Novo cliente Globex Inc onboarded com sucesso', time: 'Há 5 horas' },
  { id: 'a4', type: 'message', content: 'Stark Ind aprovou a fase de design do Mobile App', time: 'Ontem' },
  { id: 'a5', type: 'file', content: 'Wayne Ent enviou o briefing para a campanha de SEO', time: '2 dias atrás' },
];

/** Maps portal magic-link tokens to project IDs */
export const PORTAL_TOKENS: Record<string, string> = {
  k7m2x9pq: '2',
  a3b8c1de: '1',
  f4g5h6ij: '3',
};

export function generatePortalToken(projectId: string): string {
  const existing = Object.entries(PORTAL_TOKENS).find(([, id]) => id === projectId);
  if (existing) return existing[0];

  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < 8; i++) {
    hash += chars[(projectId.charCodeAt(i % projectId.length) + i * 7) % chars.length];
  }
  PORTAL_TOKENS[hash] = projectId;
  return hash;
}

export function getProjectByToken(token: string): Project | undefined {
  const projectId = PORTAL_TOKENS[token];
  if (!projectId) return undefined;
  return INITIAL_PROJECTS.find((p) => p.id === projectId);
}

export function getTimelineForProject(projectId: string): TimelineEvent[] {
  return INITIAL_TIMELINE_EVENTS.filter((e) => e.projectId === projectId);
}
