"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, MessageSquare, Send, Paperclip, ExternalLink, ArrowUpRight, MoreVertical, Circle } from 'lucide-react';
import { WhiteLabelHeader } from '@/components/client-portal/WhiteLabelHeader';
import { TimelineItem } from '@/components/client-portal/TimelineItem';
import { ProgressBar } from '@/components/client-portal/ProgressBar';
import { PrimaryButtonBase } from '@/components/client-portal/PrimaryButtonBase';

// Mock Data for the Portal
const PROJECT_DATA = {
  clientName: 'Carlos Oliveira',
  projectName: 'Redesign E-commerce Verão 2024',
  agencyName: 'Flow Design Studio',
  progress: 75,
  nextDelivery: {
    title: 'Aprovação do Checkout & Pagamentos',
    deadline: '24 Out, 2023',
    description: 'Revisão final das telas de finalização de compra e integração com gateway de pagamento.'
  }
};
const TIMELINE_EVENTS = [{
  title: 'Projeto Iniciado',
  description: 'Kick-off meeting e definição de objetivos estratégicos.',
  timestamp: '15 Set',
  status: 'completed' as const,
  type: 'milestone' as const
}, {
  title: 'Draft Inicial',
  description: 'Entrega dos primeiros wireframes e fluxo do usuário.',
  timestamp: '22 Set',
  status: 'completed' as const,
  type: 'design' as const
}, {
  title: 'Revisão de Design',
  description: 'Apresentação do conceito visual e guia de estilos.',
  timestamp: '05 Out',
  status: 'completed' as const,
  type: 'design' as const
}, {
  title: 'Desenvolvimento Frontend',
  description: 'Implementação das telas principais em ambiente de testes.',
  timestamp: 'Em curso',
  status: 'current' as const,
  type: 'deploy' as const
}, {
  title: 'Deploy Homologação',
  description: 'Ambiente final para testes de aceitação do cliente.',
  timestamp: '02 Nov',
  status: 'pending' as const,
  type: 'rocket' as const
}];
const DOCUMENTS = [{
  name: 'Manual da Marca.pdf',
  size: '2.4 MB',
  date: '15 Set'
}, {
  name: 'Guia de Estilos.fig',
  size: 'Link Externo',
  date: '05 Out',
  isLink: true
}, {
  name: 'Cronograma_V1.xlsx',
  size: '1.2 MB',
  date: '16 Set'
}, {
  name: 'Contrato_Assinado.pdf',
  size: '480 KB',
  date: '14 Set'
}];
const MESSAGES = [{
  id: 1,
  sender: 'Ana (Agency)',
  text: 'Olá Carlos, finalizamos as telas do checkout. Poderia revisar?',
  time: '09:30',
  isAgency: true
}, {
  id: 2,
  sender: 'Carlos (Você)',
  text: 'Claro, vou dar uma olhada agora. Onde encontro o link?',
  time: '09:45',
  isAgency: false
}, {
  id: 3,
  sender: 'Ana (Agency)',
  text: 'Acabei de anexar na seção de documentos como "Guia de Estilos".',
  time: '09:47',
  isAgency: true
}];

export default function ClientPortalPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#C6FF4A] selection:text-black">
      <WhiteLabelHeader 
        agencyName={PROJECT_DATA.agencyName} 
        clientName={PROJECT_DATA.clientName} 
        onBackToWebsite={() => console.log('Voltando ao site...')} 
      />

      <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12" variants={containerVariants} initial="hidden" animate="visible">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Hero Section */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#C6FF4A] text-sm font-bold uppercase tracking-[0.2em]">Área do Cliente</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Olá, {PROJECT_DATA.clientName.split(' ')[0]}
                </h1>
                <p className="text-[#888888] text-lg max-w-2xl">
                  Acompanhe em tempo real o progresso do projeto <span className="text-white font-medium">{PROJECT_DATA.projectName}</span>.
                </p>
              </div>

              <div className="p-8 bg-[#111111] border border-[#222222] rounded-2xl space-y-4">
                <ProgressBar progress={PROJECT_DATA.progress} label="Status Geral do Projeto" size="lg" animated={true} />
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#888888]">
                    <Circle size={8} className="fill-[#C6FF4A] text-[#C6FF4A]" />
                    <span>Em desenvolvimento ativo</span>
                  </div>
                  <span className="text-xs text-[#888888]">Previsão de entrega final: 15 Nov</span>
                </div>
              </div>
            </motion.section>

            {/* Next Delivery Card */}
            <motion.section variants={itemVariants} className="relative overflow-hidden p-8 bg-[#111111] border border-[#222222] rounded-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <ArrowUpRight size={120} className="text-[#C6FF4A]" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-[#C6FF4A]/10 text-[#C6FF4A] text-[10px] font-bold uppercase tracking-widest rounded border border-[#C6FF4A]/20">Próxima Entrega</span>
                    <h3 className="text-2xl font-bold pt-2">{PROJECT_DATA.nextDelivery.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[#888888] text-xs uppercase tracking-wider block">Prazo</span>
                    <span className="font-mono text-sm font-bold">{PROJECT_DATA.nextDelivery.deadline}</span>
                  </div>
                </div>
                
                <p className="text-[#888888] max-w-xl leading-relaxed">
                  {PROJECT_DATA.nextDelivery.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <PrimaryButtonBase variant="primary" size="md" onClick={() => console.log('Aprovar Entrega')}>
                    Aprovar Entrega
                  </PrimaryButtonBase>
                  <PrimaryButtonBase variant="outline" size="md" onClick={() => console.log('Ver Detalhes')}>
                    Ver Detalhes
                  </PrimaryButtonBase>
                </div>
              </div>
            </motion.section>

            {/* Timeline */}
            <motion.section variants={itemVariants} className="space-y-8">
              <div className="flex justify-between items-end border-b border-[#222222] pb-4">
                <h3 className="text-xl font-bold">Linha do Tempo</h3>
                <button className="text-xs text-[#888888] hover:text-white transition-colors">Ver histórico completo</button>
              </div>
              <div className="pl-2">
                {TIMELINE_EVENTS.map((event, index) => (
                  <TimelineItem 
                    key={index} 
                    title={event.title} 
                    description={event.description} 
                    timestamp={event.timestamp} 
                    status={event.status} 
                    type={event.type as import('@/components/client-portal/TimelineItem').TimelineEventIcon} 
                    isLast={index === TIMELINE_EVENTS.length - 1} 
                  />
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar / Right Panel */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Shared Documents */}
            <motion.section variants={itemVariants} className="bg-[#111111] border border-[#222222] rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Documentos</h3>
                <button className="p-1 hover:bg-[#222222] rounded transition-colors">
                  <MoreVertical size={16} className="text-[#888888]" />
                </button>
              </div>
              
              <div className="space-y-3">
                {DOCUMENTS.map((doc, idx) => (
                  <div key={idx} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-[#222222] transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#050505] rounded flex items-center justify-center text-[#888888] group-hover:text-white transition-colors">
                        {doc.isLink ? <ExternalLink size={18} /> : <FileText size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-white transition-colors">{doc.name}</p>
                        <p className="text-[10px] text-[#444444] uppercase tracking-wider">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#888888] hover:text-[#C6FF4A]">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <PrimaryButtonBase variant="outline" size="sm" className="w-full">
                Ver todos os arquivos
              </PrimaryButtonBase>
            </motion.section>

            {/* Message Feed / Chat */}
            <motion.section variants={itemVariants} className="bg-[#111111] border border-[#222222] rounded-2xl flex flex-col h-[500px]">
              <div className="p-6 border-b border-[#222222] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#C6FF4A] animate-pulse" />
                  <h3 className="font-bold">Mensagens</h3>
                </div>
                <MessageSquare size={16} className="text-[#888888]" />
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {MESSAGES.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.isAgency ? 'items-start' : 'items-end'}`}>
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <span className="text-[10px] font-bold text-[#444444] uppercase tracking-widest">{msg.sender}</span>
                      <span className="text-[10px] text-[#444444]">{msg.time}</span>
                    </div>
                    <div className={`max-w-[85%] p-3 text-sm rounded-xl ${msg.isAgency ? 'bg-[#1a1a1a] text-[#cccccc] rounded-tl-none' : 'bg-[#C6FF4A]/10 text-white border border-[#C6FF4A]/20 rounded-tr-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[#222222]">
                <div className="relative">
                  <input type="text" placeholder="Escreva uma mensagem..." className="w-full bg-[#050505] border border-[#222222] rounded-xl py-3 pl-4 pr-24 text-sm focus:outline-none focus:border-[#C6FF4A]/50 transition-colors placeholder:text-[#444444]" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 text-[#444444] hover:text-[#888888] transition-colors">
                      <Paperclip size={16} />
                    </button>
                    <button className="p-2 bg-[#C6FF4A] text-black rounded-lg hover:bg-[#b5eb42] transition-colors">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>

          </div>
        </motion.div>
      </main>

      {/* Footer Branding (Subtle) */}
      <footer className="py-12 border-t border-[#222222] mt-12 opacity-50">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#444444]">
          <span>© 2023 FLOW DESIGN STUDIO</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
