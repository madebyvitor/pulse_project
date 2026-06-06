"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Building2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { Toast } from "./Toast";

const signupSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  empresa: z.string().min(1, "Nome da agência/empresa é obrigatório"),
  senha: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type SignupData = z.infer<typeof signupSchema>;

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

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
          <h2 className="text-2xl font-bold text-white mb-1">
            Comece gratuitamente
          </h2>
          <p className="text-[#888888] text-sm">
            Crie sua conta em segundos. Sem cartão de crédito.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <InputField
            label="Nome completo"
            placeholder="Seu nome completo"
            icon={User}
            registration={register("nome")}
            error={errors.nome?.message}
          />
          <InputField
            label="E-mail profissional"
            placeholder="voce@suaagencia.com"
            type="email"
            icon={Mail}
            registration={register("email")}
            error={errors.email?.message}
          />
          <InputField
            label="Nome da agência ou empresa"
            placeholder="Ex: Studio Aurora"
            icon={Building2}
            registration={register("empresa")}
            error={errors.empresa?.message}
          />

          {/* Password + strength meter */}
          <div className="space-y-2">
            <InputField
              label="Crie uma senha"
              placeholder="••••••••"
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
                    strength > i
                      ? strengthColors[strength]
                      : "bg-[#222222]"
                  }`}
                />
              ))}
            </div>
          </div>

          <PrimaryButton type="submit" isLoading={isLoading}>
            Criar conta grátis
          </PrimaryButton>
        </form>

        <p className="text-[10px] text-[#444444] text-center leading-relaxed">
          Ao criar uma conta você concorda com os{" "}
          <span className="text-[#888888] underline cursor-pointer hover:text-white transition-colors">
            Termos de Uso
          </span>{" "}
          e{" "}
          <span className="text-[#888888] underline cursor-pointer hover:text-white transition-colors">
            Política de Privacidade
          </span>
          .
        </p>

        <div className="pt-2 text-center">
          <p className="text-sm text-[#888888]">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#C6FF4A] font-semibold hover:underline"
            >
              Entrar
            </button>
          </p>
        </div>
      </motion.div>

      <Toast
        show={showToast}
        message="Conta criada com sucesso! Redirecionando…"
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
