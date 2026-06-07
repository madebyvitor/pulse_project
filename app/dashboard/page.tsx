import { AgencyDashboard } from '@/components/dashboard/AgencyDashboard';

export const metadata = {
  title: 'Dashboard — Progressly',
  description: 'Painel de controle da agência: gerencie projetos, clientes e timelines em tempo real.',
};

export default function DashboardPage() {
  return <AgencyDashboard />;
}
