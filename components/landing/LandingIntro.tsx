"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const INTRO_DURATION_MS = 2800;
const EXIT_START_MS = 1700;

const lineVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 16 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  exit: { opacity: 0, filter: "blur(14px)", y: -20 },
};

const enterTransition = (delay: number) => ({
  duration: 0.6,
  delay,
  ease: [0.22, 1, 0.36, 1] as const,
});

const exitTransition = {
  duration: 1.1,
  ease: [0.4, 0, 1, 1] as const,
};

type LandingIntroProps = {
  onDone: () => void;
  onExitStart?: () => void;
};

export function LandingIntro({ onDone, onExitStart }: LandingIntroProps) {
  const t = useTranslations("Intro");
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      onExitStart?.();
    }, EXIT_START_MS);
    const doneTimer = setTimeout(() => onDone(), INTRO_DURATION_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone, onExitStart]);

  return (
    <motion.div
      role="presentation"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={exitTransition}
    >
      <div
        aria-live="polite"
        className="flex flex-col items-center gap-2 px-6 text-center"
      >
        <motion.p
          className="italic font-[family-name:var(--font-serif-display)] text-[clamp(28px,4vw,52px)] leading-tight text-white"
          variants={lineVariants}
          initial="hidden"
          animate={phase === "enter" ? "visible" : "exit"}
          transition={phase === "enter" ? enterTransition(0) : exitTransition}
        >
          {t("line1")}
        </motion.p>
        <motion.p
          className="italic font-[family-name:var(--font-serif-display)] text-[clamp(28px,4vw,52px)] leading-tight text-[#C6FF4A]"
          variants={lineVariants}
          initial="hidden"
          animate={phase === "enter" ? "visible" : "exit"}
          transition={phase === "enter" ? enterTransition(0.4) : exitTransition}
        >
          {t("line2")}
        </motion.p>
      </div>
    </motion.div>
  );
}
