"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Building2, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { Toast } from "./Toast";

/** Calculates password strength 0–3 */
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
  "bg-[#C6FF4A]",
];

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const t = useTranslations("Auth.signup");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const signupSchema = z.object({
    nome: z.string().min(1, t("nameRequired")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    empresa: z.string().min(1, t("companyRequired")),
    senha: z
      .string()
      .min(1, t("passwordRequired"))
      .min(8, t("passwordMin")),
  });

  type SignupData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (_data: SignupData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowToast(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
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
          <InputField
            label={t("nameLabel")}
            placeholder={t("namePlaceholder")}
            icon={User}
            registration={register("nome")}
            error={errors.nome?.message}
          />
          <InputField
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            type="email"
            icon={Mail}
            registration={register("email")}
            error={errors.email?.message}
          />
          <InputField
            label={t("companyLabel")}
            placeholder={t("companyPlaceholder")}
            icon={Building2}
            registration={register("empresa")}
            error={errors.empresa?.message}
          />

          {/* Password + strength meter */}
          <div className="space-y-2">
            <InputField
              label={t("passwordLabel")}
              placeholder={t("passwordPlaceholder")}
              showPasswordToggle
              icon={Lock}
              registration={{
                ...register("senha", {
                  onChange: (e) => setPasswordValue(e.target.value),
                }),
              }}
              error={errors.senha?.message}
            />
            {/* Strength bar */}
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

          <PrimaryButton type="submit" isLoading={isLoading}>
            {t("submit")}
          </PrimaryButton>
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
        message={t("success")}
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
