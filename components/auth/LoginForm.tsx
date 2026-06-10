"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toast } from "./Toast";

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
  const router = useRouter();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const loginSchema = z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z.string().min(1, t("passwordRequired")),
  });

  type LoginData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (_data: LoginData) => {
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  };

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

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email" className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("emailLabel")}
            </Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                id="login-email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="pl-10 bg-input border-border"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="login-password" className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("passwordLabel")}
            </Label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                id="login-password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                className="pl-10 bg-input border-border"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full font-bold h-11">
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">{t("divider")}</span>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleGitHub}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full h-11 font-bold"
          >
            {isGithubLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <GitHubIcon />
            )}
            {t("github")}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogle}
            disabled={isGithubLoading || isSubmitting}
            className="w-full h-11"
          >
            {isGoogleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Globe size={18} />
            )}
            {t("google")}
          </Button>
        </div>

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
