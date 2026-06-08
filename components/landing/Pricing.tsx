"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  popularLabel: string;
  perMonth: string;
}

function PricingTier({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  popularLabel,
  perMonth,
}: PricingTierProps) {
  const isFreeLabel = price === "Grátis" || price === "Free";

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
          {popularLabel}
        </span>
      )}

      <div className="mb-8">
        <h3 className="mb-1 text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          {!isFreeLabel && (
            <span className="text-zinc-500 mb-1">{perMonth}</span>
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
  const t = useTranslations("Pricing");

  const tiers = [
    {
      name: t("starter.name"),
      price: t("starter.price"),
      description: t("starter.description"),
      features: [
        t("starter.f1"),
        t("starter.f2"),
        t("starter.f3"),
        t("starter.f4"),
        t("starter.f5"),
      ],
    },
    {
      name: t("pro.name"),
      price: t("pro.price"),
      description: t("pro.description"),
      isPopular: true,
      features: [
        t("pro.f1"),
        t("pro.f2"),
        t("pro.f3"),
        t("pro.f4"),
        t("pro.f5"),
      ],
    },
    {
      name: t("agency.name"),
      price: t("agency.price"),
      description: t("agency.description"),
      features: [
        t("agency.f1"),
        t("agency.f2"),
        t("agency.f3"),
        t("agency.f4"),
        t("agency.f5"),
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#050505]">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase border rounded-full border-zinc-800 text-zinc-500 bg-zinc-900/50">
            {t("badge")}
          </span>
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white md:text-5xl leading-tight">
            {t("headline")}
          </h2>
          <p className="text-zinc-400 text-lg">{t("description")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <PricingTier
              key={tier.name}
              {...tier}
              buttonText={t("choosePlan")}
              popularLabel={t("popular")}
              perMonth={t("perMonth")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
