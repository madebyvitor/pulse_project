"use client";

import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function PrimaryButton({
  children,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        "w-full bg-[#C6FF4A] text-black font-bold py-3.5 rounded-lg transition-all active:scale-[0.98]",
        "hover:bg-[#d4ff6e] hover:shadow-[0_0_20px_rgba(198,255,74,0.2)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2",
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
