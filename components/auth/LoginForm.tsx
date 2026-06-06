"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Globe, Mail, ArrowRight } from "lucide-react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { Toast } from "./Toast";

/* ─── Magic Link schema ─── */
const magicLinkSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
});

type MagicLinkData = z.infer<typeof magicLinkSchema>;

/* ─── GitHub SVG Icon ─── */
function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function LoginForm() {
  const [magicSent, setMagicSent] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [showMagicForm, setShowMagicForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MagicLinkData>({
    resolver: zodResolver(magicLinkSchema),
  });

  /* ── Mock handlers ── */
  const handleGitHub = async () => {
    setIsGithubLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsGithubLoading(false);
    setToastMessage("Redirecionando para o GitHub…");
    setShowToast(true);
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsGoogleLoading(false);
    setToastMessage("Redirecionando para o Google…");
    setShowToast(true);
  };

  const onMagicSubmit = async (_data: MagicLinkData) => {
    setIsMagicLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsMagicLoading(false);
    setMagicSent(true);
  };

  return (
    <>
      <motion.div
        key="login"
        initial={{ opacity: 0, x: 0, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
        <header className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1">Acesse o Pulse</h2>
          <p className="text-[#888888] text-sm">
            Entre com sua conta para continuar
          </p>
        </header>

        {/* ── Primary: GitHub ── */}
        <PrimaryButton
          type="button"
          onClick={handleGitHub}
          isLoading={isGithubLoading}
          className="flex items-center justify-center gap-3"
        >
          {!isGithubLoading && <GitHubIcon />}
          Continuar com GitHub
        </PrimaryButton>

        {/* ── Secondary: Google ── */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={isGoogleLoading}
          className="flex items-center justify-center gap-3 w-full bg-transparent border border-[#333333] text-white py-3 rounded-lg hover:bg-[#161616] hover:border-[#444444] transition-all disabled:opacity-50"
        >
          {isGoogleLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Globe size={18} />
          )}
          <span className="text-sm font-medium">Continuar com Google</span>
        </button>

        {/* ── Divider ── */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#222222]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#111111] px-4 text-[11px] text-[#444444] uppercase tracking-widest font-semibold">
              ou
            </span>
          </div>
        </div>

        {/* ── Magic Link ── */}
        {!magicSent ? (
          <>
            {showMagicForm ? (
              <motion.form
                key="magic-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit(onMagicSubmit)}
                noValidate
                className="space-y-3"
              >
                <InputField
                  label="Seu e-mail"
                  placeholder="voce@suaagencia.com"
                  type="email"
                  icon={Mail}
                  registration={register("email")}
                  error={errors.email?.message}
                />
                <button
                  type="submit"
                  disabled={isMagicLoading}
                  className="flex items-center justify-center gap-2 w-full text-[#C6FF4A] text-sm font-semibold py-2.5 rounded-lg border border-[#C6FF4A]/20 hover:bg-[#C6FF4A]/5 transition-all disabled:opacity-50"
                >
                  {isMagicLoading ? (
                    <div className="w-4 h-4 border-2 border-[#C6FF4A] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Enviar link de acesso
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <button
                type="button"
                onClick={() => setShowMagicForm(true)}
                className="flex items-center justify-center gap-2 w-full text-[#888888] text-sm font-medium py-2 hover:text-white transition-colors"
              >
                <Mail size={15} />
                Entrar com Magic Link (e-mail)
              </button>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4 px-5 rounded-xl border border-[#C6FF4A]/20 bg-[#C6FF4A]/5"
          >
            <Mail className="text-[#C6FF4A] mx-auto mb-2" size={22} />
            <p className="text-white text-sm font-semibold mb-1">
              Link enviado!
            </p>
            <p className="text-[#888888] text-xs leading-relaxed">
              Verifique sua caixa de entrada e clique no link para acessar.
            </p>
          </motion.div>
        )}
      </motion.div>

      <Toast
        show={showToast}
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
