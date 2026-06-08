"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="relative p-8 md:p-16 lg:p-24 overflow-hidden rounded-3xl bg-[#111111] border border-zinc-800 text-center">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#C6FF4A]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#C6FF4A]/3 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-wide uppercase border rounded-full border-zinc-800 text-zinc-500 bg-zinc-900/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF4A] animate-pulse" />
              {t("badge")}
            </span>
            <h2 className="mb-6 text-3xl sm:text-4xl font-bold md:text-6xl text-white leading-tight">
              {t("headline1")}
              <br />
              <span className="text-[#C6FF4A]">{t("headlineHighlight")}</span>
            </h2>
            <p className="max-w-xl mx-auto mb-10 text-lg text-zinc-400">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButtonBase size="lg" className="px-12">
                {t("ctaPrimary")}
              </PrimaryButtonBase>
              <PrimaryButtonBase
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t("ctaSecondary")}
              </PrimaryButtonBase>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
