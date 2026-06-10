"use client";

import { useTranslations } from "next-intl";
import {
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function ProjectFeedFeature() {
  const t = useTranslations("ProjectFeed");

  const feedItems = [
    { icon: GitHubIcon, text: t("feed1Text"), time: t("feed1Time"), highlight: false },
    { icon: Layers, text: t("feed2Text"), time: t("feed2Time"), highlight: false },
    { icon: Rocket, text: t("feed3Text"), time: t("feed3Time"), highlight: true },
    { icon: FileText, text: t("feed4Text"), time: t("feed4Time"), highlight: false },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight leading-tight">
            {t("headline1")}{" "}
            <span className="italic font-[family-name:var(--font-serif-display)] text-[#C6FF4A]">
              {t("headlineHighlight")}
            </span>
          </h2>
          <div className="space-y-6 text-xl text-gray-400">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>
          <a
            href="#how-it-works"
            className="flex items-center gap-3 text-white font-bold hover:text-[#C6FF4A] transition-colors group w-fit"
          >
            <span>{t("cta")}</span>
            <ExternalLink className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="relative">
          <div className="w-full rounded-3xl p-6 flex flex-col gap-6 shadow-2xl bg-[#0d0d0d] border border-white/[0.06]">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <h4 className="text-white font-bold">{t("mockTitle")}</h4>
            </div>

            <div className="space-y-4">
              {feedItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all hover:bg-white/[0.03]",
                      item.highlight
                        ? "bg-[#C6FF4A]/10 border-[#C6FF4A]/20"
                        : "bg-transparent border-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 bg-white/5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-sm",
                            item.highlight ? "text-[#C6FF4A] font-bold" : "text-white"
                          )}
                        >
                          {item.text}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">
                          {item.time}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full -z-10 blur-[60px]"
            style={{ backgroundColor: "rgba(198,255,74,0.15)" }}
          />
        </div>
      </div>
    </section>
  );
}
