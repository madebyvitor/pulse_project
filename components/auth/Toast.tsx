"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export function Toast({ show, message, type = "success", onClose }: ToastProps) {
  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl"
          style={{
            background: isSuccess ? "rgba(17,17,17,0.98)" : "rgba(17,17,17,0.98)",
            borderColor: isSuccess ? "rgba(198,255,74,0.3)" : "rgba(239,68,68,0.3)",
            boxShadow: isSuccess
              ? "0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(198,255,74,0.1)"
              : "0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(239,68,68,0.1)",
          }}
        >
          {isSuccess ? (
            <CheckCircle2 size={18} className="text-[#C6FF4A] flex-shrink-0" />
          ) : (
            <XCircle size={18} className="text-red-500 flex-shrink-0" />
          )}
          <span className="text-white text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-[#444444] hover:text-[#888888] transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
