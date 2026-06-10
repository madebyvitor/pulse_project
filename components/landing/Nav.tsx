"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useTranslations("Nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("features"), href: "#features" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("pricing"), href: "#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl px-4 sm:px-6 py-3 rounded-full transition-all duration-300",
        "border border-white/10 backdrop-blur-md",
        isScrolled ? "bg-black/60 translate-y-0" : "bg-transparent translate-y-2"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logotipo.svg"
              alt="Progressly Logo"
              width={28}
              height={28}
              className="w-7 h-7"
            />
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Progressly
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
          >
            {t("login")}
          </Link>
          <Link href="/login" className="hidden sm:block">
            <PrimaryButtonBase size="sm" className="rounded-full px-5">
              {t("getStarted")}
            </PrimaryButtonBase>
          </Link>
          <button
            type="button"
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 p-6 bg-black/90 backdrop-blur-xl rounded-3xl border border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg text-white font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-white/10" />
              <Link
                href="/login"
                className="text-lg text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("login")}
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <PrimaryButtonBase className="w-full rounded-full">
                  {t("getStartedNow")}
                </PrimaryButtonBase>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
