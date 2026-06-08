"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Check, CheckCircle2, Clock, GitCommit, GitMerge } from "lucide-react";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

export function FeaturesSplit() {
  const t = useTranslations("FeaturesSplit");

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-b border-zinc-900">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="grid gap-12 md:gap-16 items-center md:grid-cols-2">
          {/* Text content */}
          <div>
            <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase border rounded-full border-zinc-800 text-zinc-500 bg-zinc-900/50">
              {t("badge")}
            </span>
            <h2 className="mb-6 text-3xl sm:text-4xl font-bold md:text-5xl leading-tight">
              {t("headline1")}{" "}
              <span className="text-[#C6FF4A]">{t("headlineHighlight")}</span>
            </h2>
            <p className="mb-8 text-lg text-zinc-400 leading-relaxed">
              {t("description")}
            </p>
            <ul className="space-y-4 mb-10">
              {([t("item1"), t("item2"), t("item3")] as string[]).map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-[#C6FF4A]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#C6FF4A]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <PrimaryButtonBase rightIcon={<ArrowRight className="w-4 h-4" />}>
              {t("cta")}
            </PrimaryButtonBase>
          </div>

          {/* Mock timeline */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#C6FF4A]/5 blur-3xl rounded-full pointer-events-none" />
            <div className="relative p-4 sm:p-6 bg-[#111111] border border-zinc-800 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t("mockTitle")}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{t("mockSubtitle")}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#C6FF4A]/10 border border-[#C6FF4A]/20 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF4A] animate-pulse" />
                  <span className="text-[10px] font-semibold text-[#C6FF4A]">
                    {t("mockStatus")}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                  <span>{t("mockProgress")}</span>
                  <span className="text-[#C6FF4A] font-semibold">50%</span>
                </div>
                <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[#C6FF4A] to-[#a8e030] rounded-full" />
                </div>
              </div>

              {/* Timeline events */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                  {t("mockUpdates")}
                </p>
                {[
                  {
                    icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF4A]" />,
                    title: t("mockEvent1Title"),
                    sub: t("mockEvent1Sub"),
                    time: t("mockEvent1Time"),
                    color: "bg-[#C6FF4A]/10 border-[#C6FF4A]/20",
                  },
                  {
                    icon: <GitMerge className="w-3.5 h-3.5 text-blue-400" />,
                    title: t("mockEvent2Title"),
                    sub: t("mockEvent2Sub"),
                    time: t("mockEvent2Time"),
                    color: "bg-blue-500/5 border-blue-500/20",
                  },
                  {
                    icon: <GitCommit className="w-3.5 h-3.5 text-zinc-500" />,
                    title: t("mockEvent3Title"),
                    sub: t("mockEvent3Sub"),
                    time: t("mockEvent3Time"),
                    color: "bg-zinc-900/50 border-zinc-800",
                  },
                  {
                    icon: <Clock className="w-3.5 h-3.5 text-zinc-600" />,
                    title: t("mockEvent4Title"),
                    sub: t("mockEvent4Sub"),
                    time: t("mockEvent4Time"),
                    color: "bg-zinc-900/30 border-zinc-900 opacity-50",
                  },
                ].map((event, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex items-start gap-3 ${event.color} transition-all`}
                  >
                    <div className="w-6 h-6 rounded-full bg-zinc-900/80 flex items-center justify-center shrink-0 mt-0.5">
                      {event.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white leading-tight mb-0.5">
                        {event.title}
                      </p>
                      <p className="text-[10px] text-zinc-500 leading-tight">
                        {event.sub}
                      </p>
                    </div>
                    <span className="text-[9px] text-zinc-600 shrink-0 mt-0.5">
                      {event.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
