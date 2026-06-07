import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth/AuthScreen";

export const metadata: Metadata = {
  title: "Entrar — Progressly",
  description:
    "Acesse o painel Progressly para gerenciar seus projetos, clientes e relatórios em um único lugar.",
};

export default function LoginPage() {
  return <AuthScreen />;
}
