"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { RefreshCw, Building2, ArrowRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/auth/Toast";

/* ─── Schema ─── */
const onboardingSchema = z.object({
  agencyName: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(80, "Máximo de 80 caracteres"),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

/* ─── Steps indicator ─── */
const STEPS = ["Conta criada", "Nome da agência", "Dashboard"];

function PulseLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-[#C6FF4A] flex items-center justify-center">
        <RefreshCw className="w-4 h-4 text-black" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight text-white">Pulse</span>
    </div>
  );
}

export function OnboardingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { agencyName: "" },
  });

  const agencyName = watch("agencyName");

  const onSubmit = async (_data: OnboardingData) => {
    setIsLoading(true);
    // Mock: create Organization record + link to user
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setShowToast(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  const handleSignOut = async () => {
    // Mock sign out
    router.push("/login");
  };

  return (
    <>
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#C6FF4A] selection:text-black">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6FF4A]/4 blur-[100px] pointer-events-none rounded-full" />

        <div className="w-full max-w-sm relative z-10 flex flex-col items-center gap-8">
          {/* Logo */}
          <PulseLogo />

          {/* Progress steps */}
          <div className="flex items-center gap-2 w-full justify-center">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={[
                      "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                      i === 0
                        ? "bg-[#C6FF4A] text-black"
                        : i === 1
                        ? "bg-[#C6FF4A] text-black ring-2 ring-[#C6FF4A]/30"
                        : "bg-[#222222] text-[#444444]",
                    ].join(" ")}
                  >
                    {i === 0 ? "✓" : i + 1}
                  </div>
                  <span
                    className={[
                      "text-[9px] uppercase tracking-wider font-semibold whitespace-nowrap",
                      i === 1 ? "text-[#C6FF4A]" : i === 0 ? "text-[#888888]" : "text-[#333333]",
                    ].join(" ")}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={[
                      "h-px w-8 mb-4 transition-all",
                      i === 0 ? "bg-[#C6FF4A]/40" : "bg-[#222222]",
                    ].join(" ")}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-[#111111] border border-[#222222] rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <header className="mb-7">
              <h1 className="text-xl font-bold text-white mb-1.5">
                Qual o nome da sua agência?
              </h1>
              <p className="text-[#888888] text-sm leading-relaxed">
                Isso será usado como o nome da sua organização no Pulse. Você
                pode alterar depois.
              </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="space-y-1.5 group">
                <label className="text-xs font-medium text-[#888888] uppercase tracking-wider">
                  Nome da agência ou estúdio
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444444] group-focus-within:text-[#C6FF4A]/50 transition-colors pointer-events-none">
                    <Building2 size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Ex: Acme Studio"
                    autoFocus
                    {...register("agencyName")}
                    className={[
                      "w-full bg-[#0a0a0a] border rounded-lg py-3 pl-10 pr-4 text-white text-sm",
                      "placeholder:text-[#333333] transition-all outline-none",
                      "focus:ring-4 focus:ring-[#C6FF4A]/10",
                      errors.agencyName
                        ? "border-red-500/60 focus:border-red-500/80"
                        : "border-[#222222] focus:border-[#C6FF4A]/30",
                    ].join(" ")}
                  />
                </div>
                {errors.agencyName && (
                  <p className="text-red-400 text-[11px] font-medium pl-1">
                    {errors.agencyName.message}
                  </p>
                )}
                {/* Character preview */}
                {agencyName && !errors.agencyName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-[#555555] pl-1"
                  >
                    Sua organização será criada como{" "}
                    <span className="text-[#888888] font-semibold">
                      &ldquo;{agencyName}&rdquo;
                    </span>
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={[
                  "w-full flex items-center justify-center gap-2",
                  "bg-[#C6FF4A] text-black font-bold py-3.5 rounded-lg",
                  "hover:bg-[#d4ff6e] hover:shadow-[0_0_20px_rgba(198,255,74,0.2)]",
                  "transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                ].join(" ")}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Finalizar Cadastro
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Sign out link — minimal */}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-[#444444] hover:text-[#888888] transition-colors text-xs font-medium"
          >
            <LogOut size={13} />
            Sair e cancelar cadastro
          </button>
        </div>
      </main>

      <Toast
        show={showToast}
        message="Organização criada! Abrindo seu dashboard…"
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
