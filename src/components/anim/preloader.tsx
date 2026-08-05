"use client";

import * as React from "react";

import { SITE_NAME } from "@/config/site.config";

type Phase = "idle" | "in" | "out" | "done";

/**
 * Preloader: a very short, very premium intro. The wordmark draws itself
 * (letters fade up in sequence) while a hairline fills, then the whole veil
 * lifts out of frame to reveal the hero.
 *
 * Rules:
 * - Plays once per session (sessionStorage), ~1.2s total, never a spinner.
 * - Reduced motion: skipped entirely (content is already visible).
 * - Renders nothing on the server; mounts after hydration to avoid a flash.
 */
export const Preloader: React.FC = () => {
  const [phase, setPhase] = React.useState<Phase>("idle");

  React.useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || sessionStorage.getItem("preloader-seen")) return;

    const raf = window.requestAnimationFrame(() => setPhase("in"));
    const enter = window.setTimeout(() => {
      setPhase("out");
      sessionStorage.setItem("preloader-seen", "1");
    }, 1150);
    const exit = window.setTimeout(() => setPhase("done"), 1850);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(enter);
      window.clearTimeout(exit);
    };
  }, []);

  if (phase === "idle" || phase === "done") return null;

  const leaving = phase === "out";
  const letters = SITE_NAME.split("");

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-canvas transition-transform duration-[700ms] ease-emphasized ${
        leaving ? "translate-y-[-100%]" : ""
      }`}
    >
      <div
        className={`flex flex-col items-center gap-5 transition-opacity duration-fast ease-standard ${
          leaving ? "opacity-0" : ""
        }`}
      >
        <p className="flex overflow-hidden text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-letter-up"
              // Full name is long: cap the stagger so the final letters still
              // settle before the veil lifts (1.15s window).
              style={{ animationDelay: `${Math.min(index * 45, 700)}ms` }}
            >
              {letter}
            </span>
          ))}
        </p>
        <span className="h-px w-24 overflow-hidden bg-border-default">
          <span className="block h-full w-full origin-left bg-gradient-to-r from-accent to-accent-secondary animate-line-fill" />
        </span>
      </div>
    </div>
  );
};

Preloader.displayName = "Preloader";
