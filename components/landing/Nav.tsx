"use client";

import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";
import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 mx-auto max-w-7xl backdrop-blur-md bg-black/20 border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logotipo.svg" alt="Progressly Logo" width={32} height={32} className="w-8 h-8" />
        <span className="text-xl font-bold tracking-tight text-white">Progressly</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Funcionalidades
        </a>
        <a
          href="#how-it-works"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Como funciona
        </a>
        <a
          href="#pricing"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Preços
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <Link
          href="/login"
          className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Entrar
        </Link>
        <PrimaryButtonBase size="sm" className="whitespace-nowrap">
          <span className="sm:hidden">Começar</span>
          <span className="hidden sm:inline">Começar Agora</span>
        </PrimaryButtonBase>
      </div>
    </nav>
  );
}
