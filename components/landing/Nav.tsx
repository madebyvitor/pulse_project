"use client";

import { useTranslations } from "next-intl";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";

export function Nav() {
  const t = useTranslations("Nav");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 mx-auto max-w-7xl backdrop-blur-md bg-black/20 border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-0">
        <Image src="/logotipo.svg" alt="Progressly Logo" width={32} height={32} className="w-8 h-8 shrink-0" />
        <span className="text-xl font-bold tracking-tight text-white truncate">Progressly</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {t("features")}
        </a>
        <a
          href="#how-it-works"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {t("howItWorks")}
        </a>
        <a
          href="#pricing"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {t("pricing")}
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <LanguageSwitcher />
        <Link
          href="/login"
          className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {t("login")}
        </Link>
        <PrimaryButtonBase size="sm" className="whitespace-nowrap">
          <span className="sm:hidden">{t("getStarted")}</span>
          <span className="hidden sm:inline">{t("getStartedNow")}</span>
        </PrimaryButtonBase>
      </div>
    </nav>
  );
}
