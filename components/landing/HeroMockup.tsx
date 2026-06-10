"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Rocket } from "lucide-react";

export function HeroMockup() {
  const t = useTranslations("Hero");

  const milestones = [
    { label: t("mockMilestone1"), date: t("mockMilestone1Date"), status: "completed" as const },
    { label: t("mockMilestone2"), date: t("mockMilestone2Date"), status: "completed" as const },
    { label: t("mockMilestone3"), date: t("mockMilestone3Date"), status: "current" as const },
  ];

  return (
    <div className="relative animate-fade-in-up stagger-5 flex justify-center lg:justify-end">
      <div
        className="absolute inset-0 rounded-full -z-10 scale-90 blur-[80px]"
        style={{ backgroundColor: "rgba(198,255,74,0.15)" }}
      />

      <motion.div
        className="absolute -top-10 -right-4 z-20 flex items-center gap-3 rounded-xl shadow-xl animate-float bg-[#111111] border border-white/[0.08] px-4 py-3"
      >
        <div
          className="w-8 h-8 rounded-full shrink-0"
          style={{ background: "linear-gradient(135deg, #C6FF4A, #10b981)" }}
        />
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {t("mockActivityLabel")}
          </p>
          <p className="text-sm text-white font-medium whitespace-nowrap">
            {t("mockActivityText")}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 -left-4 z-20 flex items-center gap-3 rounded-xl shadow-xl bg-[#111111] border border-white/[0.08] px-4 py-3"
        style={{ animation: "float 4s ease-in-out 1s infinite" }}
      >
        <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-[#C6FF4A]/15">
          <Check className="w-4 h-4 text-[#C6FF4A]" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {t("mockMilestoneLabel")}
          </p>
          <p className="text-sm text-white font-medium whitespace-nowrap">
            {t("mockMilestoneText")}
          </p>
        </div>
      </motion.div>

      <div
        className="relative z-10 w-full shadow-2xl min-w-[min(480px,100%)] bg-[#0f0f0f] border border-white/[0.08] rounded-[20px] p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C6FF4A, #10b981)" }}
            >
              <Rocket className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">
                {t("mockProjectTitle")}
              </h3>
              <p className="text-gray-500 text-xs">{t("mockProjectUpdated")}</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide shrink-0 bg-[#C6FF4A]/10 text-[#C6FF4A]">
            {t("mockStatus")}
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-white/60 font-medium">{t("mockProgressLabel")}</span>
            <span className="font-bold text-[#C6FF4A]">{t("mockProgressValue")}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden bg-white/5">
            <div
              className="h-full rounded-full animate-progress"
              style={{ background: "linear-gradient(90deg, #C6FF4A, #10b981)" }}
            />
          </div>
        </div>

        <div className="space-y-5 pt-1">
          {milestones.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={
                    item.status === "completed"
                      ? {
                          backgroundColor: "#C6FF4A",
                          boxShadow: "0 0 8px rgba(198,255,74,0.5)",
                        }
                      : {
                          backgroundColor: "#C6FF4A",
                          border: "2px solid rgba(198,255,74,0.4)",
                        }
                  }
                />
                <span className="text-sm font-medium text-white">{item.label}</span>
              </div>
              <span className="text-[11px] font-mono text-[#555]">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
