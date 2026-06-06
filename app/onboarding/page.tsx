import type { Metadata } from "next";
import { OnboardingForm } from "@/components/auth/OnboardingForm";

export const metadata: Metadata = {
  title: "Configurar agência — Pulse",
  description:
    "Complete seu cadastro informando o nome da sua agência ou estúdio para acessar o Pulse.",
};

export default function OnboardingPage() {
  return <OnboardingForm />;
}
