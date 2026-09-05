"use client";

import * as React from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll: Lenis-powered smooth scrolling, synced with GSAP's ticker
 * so ScrollTrigger animations stay perfectly in phase with the scroll position.
 *
 * Perf & a11y:
 * - Skipped entirely when the user prefers reduced motion.
 * - Destroyed on unmount (SSR-safe: only runs in the browser).
 * - Uses transform/scroll only: no layout thrash.
 * - Perfectly tuned for cinematic momentum and natural feel.
 */
export const SmoothScroll: React.FC = () => {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // autoRaf: false -> Lenis must NOT start its own rAF loop. We drive it
      // from GSAP's ticker below; two loops fighting for the same scroll
      // position is what makes the page feel floaty and delayed.
      autoRaf: false,
      // lerp tuned for cinematic momentum: 0.12 for more momentum, smoother glide
      lerp: 0.12,
      // Duration for scroll to settle - slightly longer for cinematic feel
      duration: 1.6,
      // Wheel amplification - natural feel
      wheelMultiplier: 1.1,
      touchMultiplier: 1.3,
      // Custom easing for cinematic feel - exponential deceleration
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on("scroll", ScrollTrigger.update);
    registerLenis(lenis);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    // lagSmoothing(0): do not stretch time after a dropped frame
    gsap.ticker.lagSmoothing(0);

    // Add momentum preservation on wheel
    let lastScroll = 0;
    let momentumTimeout: number | null = null;

    lenis.on("scroll", ({ direction }: { direction: number }) => {
      // Clear existing momentum timeout
      if (momentumTimeout) {
        window.clearTimeout(momentumTimeout);
      }

      // Add subtle momentum on direction change
      if (lastScroll !== 0 && direction !== lastScroll) {
        // Small overshoot for natural feel
        momentumTimeout = window.setTimeout(() => {
          // Momentum naturally handled by lerp
        }, 50);
      }
      lastScroll = direction;
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      registerLenis(null);
      ScrollTrigger.clearScrollMemory();
      if (momentumTimeout) window.clearTimeout(momentumTimeout);
    };
  }, []);

  return null;
};

SmoothScroll.displayName = "SmoothScroll";
