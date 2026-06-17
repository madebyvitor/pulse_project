"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingIntro } from "@/components/landing/LandingIntro";

const STORAGE_KEY = "cf_intro_played";

const crossfadeTransition = {
  duration: 1.1,
  ease: [0.4, 0, 1, 1] as const,
};

type IntroState = "checking" | "playing" | "revealing" | "done";

type LandingPageShellProps = {
  children: React.ReactNode;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LandingPageShell({ children }: LandingPageShellProps) {
  const [introState, setIntroState] = useState<IntroState>("checking");

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "true";

    if (alreadyPlayed || prefersReducedMotion()) {
      if (!alreadyPlayed) {
        sessionStorage.setItem(STORAGE_KEY, "true");
      }
      setIntroState("done");
      return;
    }

    setIntroState("playing");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleExitStart = useCallback(() => {
    setIntroState("revealing");
  }, []);

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    document.body.style.overflow = "";
    setIntroState("done");
  }, []);

  const showIntro = introState === "playing" || introState === "revealing";
  const contentVisible = introState === "revealing" || introState === "done";
  const contentInteractive = introState === "done";

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <LandingIntro
            key="landing-intro"
            onDone={handleIntroDone}
            onExitStart={handleExitStart}
          />
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden={showIntro && !contentVisible}
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={crossfadeTransition}
        className={contentInteractive ? undefined : "pointer-events-none"}
      >
        {children}
      </motion.div>
    </>
  );
}
