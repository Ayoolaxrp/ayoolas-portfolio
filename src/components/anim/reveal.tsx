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
   * - "slide": horizontal slide with fade
   * - "scale": scale up with fade
   */
  variant?: "fade" | "mask" | "blur" | "slide" | "scale";
  /** Stagger children individually */
  stagger?: number;
  /** Custom ease */
  ease?: string;
}

/**
 * Reveal: brings children into view via GSAP ScrollTrigger.
 *
 * - Honors prefers-reduced-motion: renders fully visible, no animation.
 * - Cleans up tween + trigger on unmount (gsap.context).
 * - Animates transform/opacity/clip-path/filter only.
 * - Supports staggering children for cinematic reveals.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 40,
  start = "top 88%",
  once = true,
  variant = "fade",
  stagger = 0,
  ease = "power3.out",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      let from: gsap.TweenVars;
      let to: gsap.TweenVars;

      switch (variant) {
        case "mask":
          from = { clipPath: "inset(0 0 100% 0)" };
          to = { clipPath: "inset(0 0 0% 0)", duration: 1.3 };
          break;
        case "blur":
          from = { autoAlpha: 0, y: 16, filter: "blur(12px)" };
          to = { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.2 };
          break;
        case "slide":
          from = { autoAlpha: 0, x: -60 };
          to = { autoAlpha: 1, x: 0, duration: 1.1 };
          break;
        case "scale":
          from = { autoAlpha: 0, scale: 0.92 };
          to = { autoAlpha: 1, scale: 1, duration: 1.1 };
          break;
        case "fade":
        default:
          from = { autoAlpha: 0, y };
          to = { autoAlpha: 1, y: 0, duration: 1.2 };
          break;
      }

      const config: gsap.TweenVars = {
        ...to,
        delay,
        ease,
        scrollTrigger: { trigger: el, start, once },
      };

      if (stagger > 0 && el.children.length > 1) {
        gsap.fromTo(
          Array.from(el.children) as HTMLElement[],
          { ...from },
          { ...config, stagger }
        );
      } else {
        gsap.fromTo(el, from, config);
      }
    });

    return () => ctx.revert();
  }, [delay, y, start, once, variant, stagger, ease]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};

Reveal.displayName = "Reveal";
