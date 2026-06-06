"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { LoginForm } from "./LoginForm";

const FEATURES = [
  { text: "Portal white-label para seus clientes" },
  { text: "Timeline automática de projetos" },
  { text: "Relatórios gerados por IA" },
];

function PulseLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-[#C6FF4A] flex items-center justify-center">
        <RefreshCw className="w-5 h-5 text-black" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold tracking-tight text-white">Pulse</span>
    </div>
  );
}

export function AuthScreen() {
  return (
    <main className="flex min-h-screen w-full bg-[#050505] font-sans selection:bg-[#C6FF4A] selection:text-black antialiased">
      {/* ─── LEFT PANEL ─── */}
      <section className="hidden lg:flex flex-col justify-between w-[42%] bg-[#050505] p-12 border-r border-[#222222]">
        <PulseLogo />

        <div className="max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              A plataforma que seus clientes vão amar.
            </h1>
            <p className="text-[#888888] text-lg mb-8">
              Gerencie projetos, onboarding e aprovações em um único lugar
              profissional.
            </p>

            <ul className="space-y-4 mb-10">
              {FEATURES.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-white font-medium"
                >
                  <CheckCircle2
                    className="text-[#C6FF4A] flex-shrink-0"
                    size={20}
                  />
                  <span>{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Mini project preview card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <RefreshCw size={80} className="text-[#C6FF4A]" />
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-white text-sm font-semibold">
                  Web Redesign Project
                </span>
                <span className="text-[#C6FF4A] text-xs font-bold bg-[#C6FF4A]/10 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              <div className="w-full h-2 bg-[#222222] rounded-full mb-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                  className="h-full bg-[#C6FF4A]"
                />
              </div>

              <div className="flex justify-between text-[10px] text-[#444444] font-medium uppercase tracking-tighter">
                <span>Phase 3: Development</span>
                <span>72% Complete</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#222222] flex gap-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="h-1 flex-1 bg-[#222222] rounded-full" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Testimonial */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C6FF4A] to-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">Thiago Mendes</p>
              <p className="text-[#888888] text-[10px]">Founder, Studio Aurora</p>
            </div>
          </div>
          <p className="text-[#888888] text-xs italic leading-relaxed max-w-xs">
            &ldquo;O Pulse mudou a forma como entregamos projetos. Nossos clientes
            elogiam a transparência todos os dias.&rdquo;
          </p>
        </div>
      </section>

      {/* ─── RIGHT PANEL ─── */}
      <section className="flex-1 bg-[#080808] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6FF4A]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <PulseLogo />
          </div>

          {/* Auth card */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111111] border border-[#222222] rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <LoginForm />
            </motion.div>
          </AnimatePresence>

          {/* Trust badge — LGPD only */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111]/50 border border-[#222222]">
              <span className="text-[10px] text-[#888888] font-medium uppercase tracking-tight">
                🔒 LGPD Compliant
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
