"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before this item animates (s). */
  delay?: number;
  /** Distance to travel up (px). Only applies to the "fade" variant. */
  y?: number;
  /** Start position relative to viewport. */
  start?: string;
  /** When true the animation plays once (default): set false to re-play on leave. */
  once?: boolean;
  /**
   * Motion language:
   * - "fade": rise + fade (default, documentary pacing)
   * - "mask": clip-path wipe from the bottom, editorial
   * - "blur": focus pull, dramatic but quiet
   */
  variant?: "fade" | "mask" | "blur";
}

/**
 * Reveal: brings children into view via GSAP ScrollTrigger.
 *
 * - Honors prefers-reduced-motion: renders fully visible, no animation.
 * - Cleans up tween + trigger on unmount (gsap.context).
 * - Animates transform/opacity/clip-path/filter only.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 32,
  start = "top 85%",
  once = true,
  variant = "fade",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const from: gsap.TweenVars =
        variant === "mask"
          ? { clipPath: "inset(0 0 100% 0)" }
          : variant === "blur"
            ? { autoAlpha: 0, y: 12, filter: "blur(10px)" }
            : { autoAlpha: 0, y };

      const to: gsap.TweenVars = {
        clipPath: "inset(0 0 0% 0)",
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: variant === "fade" ? 1.1 : 1.25,
        delay,
        ease: variant === "mask" ? "power4.inOut" : "power3.out",
        scrollTrigger: { trigger: el, start, once },
      };

      gsap.fromTo(el, from, to);
    });

    return () => ctx.revert();
  }, [delay, y, start, once, variant]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};

Reveal.displayName = "Reveal";
