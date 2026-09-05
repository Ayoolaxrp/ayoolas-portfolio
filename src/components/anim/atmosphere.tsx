"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Atmosphere: the layered cinematic backdrop that sits behind the whole site.
 *
 * Three planes:
 * - Deep plane (behind all content): a barely visible drifting grid, three
 *   aurora gradient blobs that breathe over ~30-40s, and a soft radial wash.
 *   It shows through transparent sections (hero, section gaps) and lends the
 *   page a sense of depth as it slowly parallaxes with scroll.
 * - Mid plane: subtle floating particles/orbs for added depth.
 * - Foreground plane (pointer-events-none): stepped film grain,
 *   a quiet vignette, and a whisper of top light. Everything is sub-perceptual.
 *
 * Accessibility & perf:
 * - Reduced motion: all CSS animations stop (globals.css), GSAP parallax skipped.
 * - GPU-only transform/opacity; one ScrollTrigger; pointer-events-none.
 */
export const Atmosphere: React.FC = () => {
  const deepRef = React.useRef<HTMLDivElement>(null);
  const midRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const deep = deepRef.current;
    const mid = midRef.current;
    if (!deep || !mid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Deep plane parallax
      gsap.to(deep, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Mid plane parallax (faster)
      gsap.to(mid, {
        yPercent: 6,
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[50rem] rounded-full bg-accent/3 blur-[200px] motion-safe:animate-[auraA_35s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      {/* Mid plane: subtle floating orbs for depth */}
      <div
        ref={midRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-5 overflow-hidden will-change-transform"
      >
        <div className="absolute top-[15%] left-[10%] size-4 rounded-full bg-accent/10 blur-xl motion-safe:animate-[auraB_25s_ease-in-out_infinite]" />
        <div className="absolute top-[35%] right-[15%] size-6 rounded-full bg-accent-secondary/8 blur-xl motion-safe:animate-[auraA_30s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] left-[20%] size-3 rounded-full bg-accent/12 blur-xl motion-safe:animate-[auraB_28s_ease-in-out_infinite]" />
        <div className="absolute bottom-[40%] right-[25%] size-5 rounded-full bg-accent-secondary/6 blur-xl motion-safe:animate-[auraA_32s_ease-in-out_infinite]" />
      </div>

      {/* Texture plane: behind content, not over it */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-[3]">
        <div className="bg-film-grain absolute -inset-[12%] opacity-[0.03]" />
        <div className="bg-vignette absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.015] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/[0.01] to-transparent" />
      </div>
    </>
  );
};

Atmosphere.displayName = "Atmosphere";
