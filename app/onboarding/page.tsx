import type { Metadata } from "next";
import { OnboardingForm } from "@/components/auth/OnboardingForm";

export const metadata: Metadata = {
  title: "Configurar agência — Progressly",
  description:
    "Complete seu cadastro informando o nome da sua agência ou estúdio para acessar o Progressly.",
};

export default function OnboardingPage() {
  return <OnboardingForm />;
}
