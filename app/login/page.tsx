import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth/AuthScreen";

export const metadata: Metadata = {
  title: "Entrar — Pulse",
  description:
    "Acesse o painel Pulse para gerenciar seus projetos, clientes e relatórios em um único lugar.",
};

export default function LoginPage() {
  return <AuthScreen />;
}
