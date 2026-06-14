"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "./Toast";
import { signup } from "@/app/actions/auth";

function passwordStrength(value: string): number {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) || /[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

const strengthColors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-primary",
];

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const t = useTranslations("Auth.signup");
  const tErrors = useTranslations("Auth.errors");
  const [isPending, startTransition] = useTransition();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const signupSchema = z.object({
    name: z.string().min(1, t("nameRequired")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z.string().min(1, t("passwordRequired")).min(8, t("passwordMin")),
  });

  type SignupData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupData) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("password", data.password);

    startTransition(async () => {
      const result = await signup(formData);
      if (result?.error) {
        const errorKey =
          result.error === "auth_failed" ? "signupFailed" : result.error;
        setToastMessage(tErrors(errorKey));
        setShowToast(true);
      }
    });
  };

  const strength = passwordStrength(passwordValue);

  return (
    <>
      <motion.div
        key="signup"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        <header>
          <h2 className="text-2xl font-bold text-white mb-1">{t("title")}</h2>
          <p className="text-[#888888] text-sm">{t("subtitle")}</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="signup-name" className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("nameLabel")}
            </Label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-name"
                placeholder={t("namePlaceholder")}
                className="pl-10 bg-input border-border"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="signup-email" className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("emailLabel")}
            </Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="pl-10 bg-input border-border"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("passwordLabel")}
            </Label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                className="pl-10 bg-input border-border"
                {...register("password", {
                  onChange: (e) => setPasswordValue(e.target.value),
                })}
              />
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            <div className="flex gap-1 h-1 px-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    strength > i ? strengthColors[strength] : "bg-[#222222]"
                  }`}
                />
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full font-bold h-11">
            {isPending ? <Loader2 size={16} className="animate-spin" /> : t("submit")}
          </Button>
        </form>

        <p className="text-[10px] text-[#444444] text-center leading-relaxed">
          {t("terms")}{" "}
          <span className="text-[#888888] underline cursor-pointer hover:text-white transition-colors">
            {t("termsLink")}
          </span>{" "}
          {t("and")}{" "}
          <span className="text-[#888888] underline cursor-pointer hover:text-white transition-colors">
            {t("privacyLink")}
          </span>
          .
        </p>

        <div className="pt-2 text-center">
          <p className="text-sm text-[#888888]">
            {t("hasAccount")}{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#C6FF4A] font-semibold hover:underline"
            >
              {t("loginLink")}
            </button>
          </p>
        </div>
      </motion.div>

      <Toast
        show={showToast}
        message={toastMessage}
        type="error"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
