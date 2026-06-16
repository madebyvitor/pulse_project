"use client";

import { useCallback, useEffect, useState } from "react";
import { LandingIntro } from "@/components/landing/LandingIntro";

const STORAGE_KEY = "cf_intro_played";

type IntroState = "checking" | "playing" | "done";

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

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    document.body.style.overflow = "";
    setIntroState("done");
  }, []);

  const isPlaying = introState === "playing";
  const hideContent = introState === "checking" || isPlaying;

  return (
    <>
      {isPlaying && <LandingIntro onDone={handleIntroDone} />}
      <div aria-hidden={isPlaying} className={hideContent ? "invisible" : undefined}>
        {children}
      </div>
    </>
  );
}
