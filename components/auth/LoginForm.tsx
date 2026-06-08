"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { PrimaryButton } from "./PrimaryButton";
import { Toast } from "./Toast";

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

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const t = useTranslations("Auth.login");
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  /* ── Mock handlers ── */
  const handleGitHub = async () => {
    setIsGithubLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsGithubLoading(false);
    setToastMessage(t("redirectGithub"));
    setShowToast(true);
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsGoogleLoading(false);
    setToastMessage(t("redirectGoogle"));
    setShowToast(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="space-y-5"
      >
        <header className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1">{t("title")}</h2>
          <p className="text-[#888888] text-sm">{t("subtitle")}</p>
        </header>

        <div className="space-y-3">
          {/* ── Primary: GitHub ── */}
          <PrimaryButton
            type="button"
            onClick={handleGitHub}
            isLoading={isGithubLoading}
            disabled={isGoogleLoading}
            className="flex items-center justify-center gap-3"
          >
            {!isGithubLoading && <GitHubIcon />}
            {t("github")}
          </PrimaryButton>

          {/* ── Secondary: Google ── */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isGoogleLoading || isGithubLoading}
            className="flex items-center justify-center gap-3 w-full bg-transparent border border-[#333333] text-white py-3 rounded-lg hover:bg-[#161616] hover:border-[#444444] transition-all disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Globe size={18} />
            )}
            <span className="text-sm font-medium">{t("google")}</span>
          </button>
        </div>

        {/* ── Footer link ── */}
        <p className="text-center text-sm text-[#888888] pt-1">
          {t("noAccount")}{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-[#C6FF4A] font-semibold hover:underline transition-colors"
          >
            {t("createAccount")}
          </button>
        </p>
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
