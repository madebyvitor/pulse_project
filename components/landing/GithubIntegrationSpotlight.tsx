"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, GitBranch, Rocket } from "lucide-react";

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

export function GithubIntegrationSpotlight() {
  const t = useTranslations("GithubSpotlight");

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#C6FF4A]/[0.03]" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl bg-black border border-white/10">
            <GitHubIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight mb-8">
          {t("headline1")}{" "}
          <span className="italic font-[family-name:var(--font-serif-display)] text-[#C6FF4A]">
            {t("headlineHighlight")}
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16">
          <div className="w-full max-w-sm p-5 rounded-2xl font-mono text-[11px] text-left shadow-2xl bg-[#0a0a0a] border border-white/10">
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
            <p className="text-white/40 mb-2">{t("commitHash")}</p>
            <p className="mb-4 text-[#C6FF4A]">
              {t("commitAuthorName")} &lt;{t("commitAuthorEmail")}&gt;
            </p>
            <div className="p-3 rounded-lg mb-4 bg-white/5 border border-white/10">
              <p className="text-white">{t("commitMessage")}</p>
              <p className="text-white/40 mt-1">{t("commitStats")}</p>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <GitBranch className="w-3 h-3" />
              <span>{t("commitBranch")}</span>
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-white/20 hidden md:block" />

          <div className="w-full max-w-sm p-6 rounded-3xl text-left shadow-2xl text-black bg-[#C6FF4A]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold">{t("cardPhase")}</h4>
            </div>
            <p className="text-xl font-bold leading-tight">{t("cardTitle")}</p>
            <p className="mt-3 text-black/60 text-sm">{t("cardDesc")}</p>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/10">
              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-black/20 border-2 border-[#C6FF4A]"
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {t("cardStatus")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
