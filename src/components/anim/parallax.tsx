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
}

/**
 * Parallax: gently moves children on a vertical axis while they scroll through
 * the viewport, adding layered depth. Disabled for reduced motion.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  amount = 40,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
};

Parallax.displayName = "Parallax";
