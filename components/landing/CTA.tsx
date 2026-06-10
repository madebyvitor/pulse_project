"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(198,255,74,0.08), transparent)" }}
      />
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6FF4A]/10 border border-[#C6FF4A]/20">
          <span className="w-2 h-2 rounded-full animate-ping bg-[#C6FF4A]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6FF4A]">
            {t("badge")}
          </span>
        </div>

        <h2 className="text-5xl md:text-8xl text-white font-medium tracking-tighter mb-8 leading-[0.9]">
          {t("headline1")}{" "}
          <span className="italic font-[family-name:var(--font-serif-display)] text-[#C6FF4A]">
            {t("headlineHighlight")}
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">{t("description")}</p>

        <Link href="/login">
          <PrimaryButtonBase
            size="lg"
            className="rounded-full px-10 py-5 text-xl shadow-[0_0_40px_rgba(198,255,74,0.3)]"
          >
            {t("ctaPrimary")}
          </PrimaryButtonBase>
        </Link>
      </div>

      <div
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-[100%] -z-10 blur-[120px]"
        style={{ backgroundColor: "rgba(198,255,74,0.15)" }}
      />
    </section>
  );
}
