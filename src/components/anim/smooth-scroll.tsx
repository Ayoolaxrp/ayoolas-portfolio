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
      // lerp: higher = snappier. 0.26 stays visibly smooth on touchpads but
      // tracks the wheel within a frame or two on a mouse, which reads as
      // "responsive" instead of "laggy". Anything much lower on Windows
      // high-resolution wheels accumulates latency on fast scrolls.
      lerp: 0.26,
      // Slight wheel amplification so each notch travels as far as the hand
      // expects; keeps the glide without feeling like it is dragging.
      wheelMultiplier: 1.12,
      touchMultiplier: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    registerLenis(lenis);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    // lagSmoothing(0): do not stretch time after a dropped frame (e.g. tab
    // switched), which otherwise produces a sudden scroll lurch on return.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      registerLenis(null);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return null;
};

SmoothScroll.displayName = "SmoothScroll";
