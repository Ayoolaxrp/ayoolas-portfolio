"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Max translate distance in px (negative moves up slower, positive faster). */
  amount?: number;
  /** Horizontal parallax amount */
  amountX?: number;
  /** Scale parallax amount */
  scale?: number;
  /** Rotation parallax amount in degrees */
  rotate?: number;
  /** Whether to use scrub (true) or immediate (false) */
  scrub?: boolean | number;
}

/**
 * Parallax: gently moves children on vertical/horizontal axis while they scroll
 * through the viewport, adding layered depth. Disabled for reduced motion.
 * Supports multi-axis parallax for cinematic depth.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  amount = 40,
  amountX = 0,
  scale = 0,
  rotate = 0,
  scrub = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const from: gsap.TweenVars = {};
      const to: gsap.TweenVars = {};

      if (amount !== 0) {
        from.y = amount;
        to.y = -amount;
      }
      if (amountX !== 0) {
        from.x = amountX;
        to.x = -amountX;
      }
      if (scale !== 0) {
        from.scale = 1 - scale;
        to.scale = 1 + scale;
      }
      if (rotate !== 0) {
        from.rotation = -rotate;
        to.rotation = rotate;
      }

      gsap.fromTo(el, from, {
        ...to,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [amount, amountX, scale, rotate, scrub]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
};

Parallax.displayName = "Parallax";
