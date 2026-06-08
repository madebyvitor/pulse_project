"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import { Globe } from "lucide-react";
import type { Locale } from "@/src/i18n/routing";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale: Locale = locale === "pt" ? "en" : "pt";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      aria-label="Toggle language"
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200 text-xs font-semibold tracking-wide ${className}`}
    >
      <Globe className="w-3.5 h-3.5" />
      <span className="uppercase">{locale}</span>
    </button>
  );
}
