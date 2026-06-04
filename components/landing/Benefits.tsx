"use client";

import { Eye, MessageSquareOff, Zap } from "lucide-react";

const benefits = [
  {
    title: "Projeto visível em tempo real",
    description:
      "O cliente abre um link e vê o progresso atualizado, a timeline de eventos e o percentual concluído — sem te perguntar nada.",
    icon: <Eye className="w-6 h-6 text-[#C6FF4A]" />,
  },
  {
    title: "Zero interrupções no seu fluxo",
    description:
      "Cada commit, merge ou milestone vira automaticamente uma atualização compreensível para o cliente. Você continua codando.",
    icon: <Zap className="w-6 h-6 text-[#C6FF4A]" />,
  },
  {
    title: "Fim dos \"Como está o projeto?\"",
    description:
      "Elimine reuniões de status e mensagens de WhatsApp sobre o andamento. O cliente tem tudo que precisa, sempre disponível.",
    icon: <MessageSquareOff className="w-6 h-6 text-[#C6FF4A]" />,
  },
];

export function Benefits() {
  return (
    <section id="features" className="py-24 bg-[#050505]">
      <div className="container px-6 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase border rounded-full border-zinc-800 text-zinc-500 bg-zinc-900/50">
            Benefícios
          </span>
          <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
            O trabalho invisível,{" "}
            <span className="text-[#C6FF4A]">finalmente visível.</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            O desenvolvedor codava o dia todo, mas o cliente achava que nada
            havia sido feito. O Pulse muda isso.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-8 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-zinc-700 hover:bg-[#161616] transition-all duration-300 group"
            >
              <div className="w-12 h-12 mb-6 rounded-xl bg-[#C6FF4A]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C6FF4A]/15 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">
                {benefit.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
