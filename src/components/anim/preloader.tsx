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
 * - Animated favicon during loading.
 */
export const Preloader: React.FC = () => {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const faviconRef = React.useRef<HTMLLinkElement>(null);

  // Animated favicon during loading
  React.useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) faviconRef.current = favicon;
  }, []);

  React.useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || sessionStorage.getItem("preloader-seen")) return;

    // Animate favicon
    let faviconFrame = 0;
    const faviconInterval = window.setInterval(() => {
      if (faviconRef.current && phase === "in") {
        const dots = "⬤◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯";
        const chars = dots.split("");
        faviconRef.current.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%2310b981'>${chars[faviconFrame % chars.length]}</text></svg>`;
        faviconFrame++;
      }
    }, 100);

    const raf = window.requestAnimationFrame(() => setPhase("in"));
    const enter = window.setTimeout(() => {
      setPhase("out");
      sessionStorage.setItem("preloader-seen", "1");
    }, 1100);
    const exit = window.setTimeout(() => setPhase("done"), 1700);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(enter);
      window.clearTimeout(exit);
      window.clearInterval(faviconInterval);
      // Restore favicon
      if (faviconRef.current) {
        faviconRef.current.href = "/favicon.svg";
      }
    };
  }, [phase]);

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
        <div className="relative">
          <p className="flex overflow-hidden text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-letter-up"
                // Full name is long: cap the stagger so the final letters still
                // settle before the veil lifts (1.15s window).
                style={{ animationDelay: `${Math.min(index * 40, 650)}ms` }}
              >
                {letter}
              </span>
            ))}
          </p>
          {/* Subtle glow behind wordmark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent-secondary/10 blur-xl opacity-0 motion-safe:animate-[fadeIn_0.6s_ease-out_0.2s_forwards]"
          />
        </div>
        <span className="h-px w-28 overflow-hidden bg-border-default">
          <span className="block h-full w-full origin-left bg-gradient-to-r from-accent to-accent-secondary animate-line-fill" />
        </span>
      </div>
    </div>
  );
};

Preloader.displayName = "Preloader";
