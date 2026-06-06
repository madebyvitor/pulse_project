"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ElementType;
  showPasswordToggle?: boolean;
  registration?: UseFormRegisterReturn;
  error?: string;
}

export function InputField({
  label,
  placeholder,
  type = "text",
  icon: Icon,
  showPasswordToggle = false,
  registration,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-medium text-[#888888] uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444444] group-focus-within:text-[#C6FF4A]/50 transition-colors pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          {...registration}
          className={[
            "w-full bg-[#111111] border rounded-lg py-3 px-4 text-white text-sm",
            "placeholder:text-[#444444] transition-all outline-none",
            "focus:ring-4 focus:ring-[#C6FF4A]/10",
            error
              ? "border-red-500/60 focus:border-red-500/80"
              : "border-[#222222] focus:border-[#C6FF4A]/30",
            Icon ? "pl-10" : "",
            showPasswordToggle ? "pr-10" : "",
          ].join(" ")}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444] hover:text-[#888888] transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-[11px] font-medium mt-1 pl-1">
          {error}
        </p>
      )}
    </div>
  );
}
