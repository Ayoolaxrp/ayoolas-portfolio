"use client";

import * as React from "react";

/**
 * ScrollProgress: a slim accent line pinned to the top edge of the viewport
 * that fills as the visitor moves through the story. Reinforces the
 * documentary pacing (V5 design direction) without being decorative:
 * it is a passive, pointer-events-none progress indicator.
 *
 * - Runs on rAF-throttled scroll reads; GPU-composited width updates only.
 * - Harmless under reduced motion (a static width reflects scroll position,
 *   which is not motion-for-motion's-sake, but we keep it subtle anyway).
 * - Added glow effect and subtle thickness change for premium feel.
 */
export const ScrollProgress: React.FC = () => {
  const barRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const el = barRef.current;
      const glow = glowRef.current;
      if (!el || !glow) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${progress})`;
      // Move glow with progress
      glow.style.transform = `translateX(${progress * 100}%)`;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      {/* Glow that travels with progress */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[4px] opacity-60"
        style={{ transform: "translateX(-100%)" }}
      />
      <div
        ref={barRef}
        aria-hidden
        className="h-full w-full origin-left bg-gradient-to-r from-accent to-accent-secondary will-change-transform relative"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

ScrollProgress.displayName = "ScrollProgress";
