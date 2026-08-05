"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps {
  text: string;
  className?: string;
  /** Extra classes applied to each word span (e.g. per-word gradient). */
  wordClassName?: string;
  /** Delay before the reveal starts (s). */
  delay?: number;
  /** Trigger start position. */
  start?: string;
}

/**
 * TextReveal: splits text into words and staggers them in with a soft mask.
 * Each word is wrapped in an overflow-hidden span; the inner span translates
 * up and fades in. Plays once, honors reduced motion.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  wordClassName,
  delay = 0,
  start = "top 85%",
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { autoAlpha: 0, yPercent: 110 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.035,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay, start, wordClassName]);

  const words = text.split(" ");

  // Renders a <span> (phrasing content) so it can live inside headings.
  // Words stay in the accessibility tree; only the animation is visual.
  return (
    <span ref={ref} className={cn("block", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            data-word
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {word}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
};

TextReveal.displayName = "TextReveal";
