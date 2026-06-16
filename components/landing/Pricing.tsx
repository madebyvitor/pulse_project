"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

type TierKey = "starter" | "pro" | "agency";

interface PricingTierProps {
  tierKey: TierKey;
  highlighted?: boolean;
  showTrial?: boolean;
}

function PricingTier({ tierKey, highlighted = false, showTrial = false }: PricingTierProps) {
  const t = useTranslations("Pricing");
  const prefix = tierKey;

  const name = t(`${prefix}.name`);
  const description = t(`${prefix}.description`);
  const cta = t(`${prefix}.cta`);
  const features = [
    t(`${prefix}.f1`),
    t(`${prefix}.f2`),
    t(`${prefix}.f3`),
    t(`${prefix}.f4`),
    t(`${prefix}.f5`),
  ];

  return (
    <div
      className={`relative flex flex-col p-8 rounded-[32px] border transition-all duration-500 hover:-translate-y-2 ${
        highlighted
          ? "bg-[#0d0d0d] border-[#C6FF4A]/30 shadow-[0_0_40px_rgba(198,255,74,0.08)]"
          : "bg-transparent border-white/10"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-[#C6FF4A]/10 text-[#C6FF4A]">
          {t("popular")}
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl text-white font-bold mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl text-white font-bold">{t("comingSoon")}</span>
        </div>
        {showTrial && (
          <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-[#C6FF4A]/10 text-[#C6FF4A]">
            {t("trialBadge")}
          </span>
        )}
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>

      <div className="grow space-y-4 mb-10">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <Check
              className={`w-4 h-4 shrink-0 ${
                highlighted ? "text-[#C6FF4A]" : "text-white/40"
              }`}
            />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <Link href="/login">
        <PrimaryButtonBase
          variant={highlighted ? "primary" : "outline"}
          className="w-full rounded-full py-4"
        >
          {cta}
        </PrimaryButtonBase>
      </Link>
    </div>
  );
}

export function Pricing() {
  const t = useTranslations("Pricing");

  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight mb-4">
            {t("headline")}
          </h2>
          <p className="text-gray-500">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <PricingTier tierKey="starter" showTrial />
          <PricingTier tierKey="pro" highlighted showTrial />
          <PricingTier tierKey="agency" />
        </div>
      </div>
    </section>
  );
}
