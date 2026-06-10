"use client";

import { useTranslations } from "next-intl";
import { Layers, Users, Zap } from "lucide-react";

const stepIcons = [Layers, Zap, Users];

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { number: "01", title: t("step1Title"), description: t("step1Desc") },
    { number: "02", title: t("step2Title"), description: t("step2Desc") },
    { number: "03", title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight mb-4">
            {t("headline")}
          </h2>
          <p className="text-xl text-gray-500">{t("subheadline")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div key={step.number} className="group relative">
                <span className="text-7xl font-bold absolute -top-10 -left-4 text-white/5 group-hover:opacity-20 transition-opacity">
                  {step.number}
                </span>
                <div className="relative z-10 flex flex-col gap-6 p-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-[#C6FF4A]" />
                  </div>
                  <h3 className="text-2xl text-white font-bold">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
