"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";
import { HeroMockup } from "@/components/landing/HeroMockup";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen pt-40 pb-20 px-6 overflow-hidden flex items-center">
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(16,185,129,0.08)" }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(198,255,74,0.05)" }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start gap-8 z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight leading-[0.95] animate-fade-in-up">
            {t("headline1")}{" "}
            <span
              className="italic font-[family-name:var(--font-serif-display)] text-[#C6FF4A]"
              style={{ filter: "drop-shadow(0 0 15px rgba(198,255,74,0.3))" }}
            >
              {t("headlineHighlight")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl animate-fade-in-up stagger-1">
            {t("subheadline")}
          </p>

          <div className="flex flex-wrap items-center gap-6 animate-fade-in-up stagger-2">
            <Link href="/login">
              <PrimaryButtonBase size="lg" className="rounded-full px-8">
                {t("ctaPrimary")}
              </PrimaryButtonBase>
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-white font-medium hover:text-[#C6FF4A] transition-colors group"
            >
              {t("ctaSecondary")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4 animate-fade-in-up stagger-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#050505]"
                  style={{ background: "linear-gradient(135deg, #C6FF4A, #10b981)" }}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              <span className="text-white">{t("socialProofCount")}</span>{" "}
              <span>{t("socialProofText")}</span>
            </p>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
