"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Atmosphere: the layered cinematic backdrop that sits behind the whole site.
 *
 * Two planes:
 * - Deep plane (behind all content): a barely visible drifting grid, two
 *   aurora gradient blobs that breathe over ~30s, and a soft radial wash.
 *   It shows through transparent sections (hero, section gaps) and lends the
 *   page a sense of depth as it slowly parallaxes with scroll.
 * - Foreground plane (over content, pointer-events-none): stepped film grain,
 *   a quiet vignette, and a whisper of top light. Everything is sub-perceptual.
 *
 * Accessibility & perf:
 * - Reduced motion: all CSS animations stop (globals.css), GSAP parallax skipped.
 * - GPU-only transform/opacity; one ScrollTrigger; pointer-events-none.
 */
export const Atmosphere: React.FC = () => {
  const deepRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const deep = deepRef.current;
    if (!deep) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(deep, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Deep plane: behind everything, visible through transparent areas */}
      <div
        ref={deepRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden will-change-transform"
      >
        <div className="absolute inset-0 bg-grid motion-safe:animate-[gridDrift_70s_linear_infinite]" />
        <div className="absolute -top-48 left-[4%] size-[36rem] rounded-full bg-accent/8 blur-[160px] motion-safe:animate-aura-a" />
        <div className="absolute bottom-[-10rem] right-[2%] size-[40rem] rounded-full bg-accent-secondary/7 blur-[170px] motion-safe:animate-aura-b" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      {/* Foreground plane: over content, texture only. The grain is STATIC:
          animating a full-viewport noise layer repaints the whole screen every
          frame on Windows for a 4.5% opacity effect, which costs far more than
          it is worth. Static grain keeps the documentary texture with zero
          ongoing paint cost. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
        <div className="bg-film-grain absolute -inset-[12%] opacity-[0.045]" />
        <div className="bg-vignette absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.025] to-transparent" />
      </div>
    </>
  );
};

Atmosphere.displayName = "Atmosphere";
