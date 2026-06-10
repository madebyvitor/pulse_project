"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl text-white font-medium tracking-tight mb-16 text-center">
          {t("headline")}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="overflow-hidden border-b border-white/10">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span
                  className={cn(
                    "text-xl text-white font-medium transition-colors",
                    openIndex === idx && "text-[#C6FF4A]"
                  )}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-500 transition-transform duration-300",
                    openIndex === idx && "rotate-180 text-[#C6FF4A]"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="pb-8 text-gray-400 leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
