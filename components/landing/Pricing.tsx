"use client";

import { Check } from "lucide-react";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

function PricingTier({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText = "Escolher Plano",
}: PricingTierProps) {
  return (
    <div
      className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
        isPopular
          ? "bg-[#111111] border-[#C6FF4A]/40 shadow-[0_0_50px_rgba(198,255,74,0.06)]"
          : "bg-[#111111] border-zinc-800 hover:border-zinc-700"
      }`}
    >
      {isPopular && (
        <span className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#C6FF4A] text-black rounded-full">
          Mais Popular
        </span>
      )}

      <div className="mb-8">
        <h3 className="mb-1 text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "Grátis" && (
            <span className="text-zinc-500 mb-1">/mês</span>
          )}
        </div>
      </div>

      <ul className="mb-8 space-y-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
            <div className="w-4 h-4 rounded-full bg-[#C6FF4A]/15 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-[#C6FF4A]" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <PrimaryButtonBase
        variant={isPopular ? "primary" : "outline"}
        className="w-full"
      >
        {buttonText}
      </PrimaryButtonBase>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#050505]">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase border rounded-full border-zinc-800 text-zinc-500 bg-zinc-900/50">
            Preços
          </span>
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white md:text-5xl leading-tight">
            Simples e transparente
          </h2>
          <p className="text-zinc-400 text-lg">
            Comece gratuitamente e evolua conforme sua agência cresce.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <PricingTier
            name="Starter"
            price="R$ 34,90"
            description="Perfeito para freelancers começando."
            features={[
              "5 projetos ativos",
              "10 clientes",
              "Timeline manual de eventos",
              "Portal exclusivo do cliente",
              "Suporte por e-mail",
            ]}
          />
          <PricingTier
            name="Pro"
            price="R$ 75,00"
            description="Para freelancers que querem escalar."
            isPopular
            features={[
              "Projetos ilimitados",
              "Clientes ilimitados",
              "Integração com GitHub",
              "IA para tradução de eventos",
              "Suporte prioritário",
            ]}
          />
          <PricingTier
            name="Agency"
            price="R$ 130,00"
            description="Para agências com times maiores."
            features={[
              "Tudo no plano Pro",
              "Múltiplos membros de equipe",
              "White-label (em breve)",
              "Domínio personalizado",
              "Gestor de conta dedicado",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
