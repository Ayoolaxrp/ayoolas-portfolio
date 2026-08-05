import * as React from "react";

import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/anim/reveal";

/**
 * SectionIntro: the chapter heading used across the homepage.
 *
 * V5 design direction (documentary pacing): each chapter opens like a film
 * title card. A large serif chapter number, a hairline rule, a mono label,
 * then a display headline and a connective lede. The lede carries the
 * storytelling thread from the previous chapter into this one, so scrolling
 * feels like one continuous narrative rather than stacked blocks.
 *
 * Props:
 * - index: chapter number, e.g. "01"
 * - label: chapter name, e.g. "The person"
 * - title: headline (string or JSX, e.g. with a serif accent)
 * - lede: connective copy that continues the story from the prior chapter
 * - align: "left" | "center" (center reserved for the finale chapter)
 */
export interface SectionIntroProps {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({
  index,
  label,
  title,
  lede,
  align = "left",
  className,
}) => {
  const centered = align === "center";

  return (
    <Reveal className={className}>
      <div
        className={
          centered
            ? "mx-auto mb-16 flex max-w-3xl flex-col items-center text-center md:mb-24"
            : "mb-16 max-w-4xl md:mb-24"
        }
      >
        {/* Chapter marker: serif number + hairline + mono label */}
        <p
          className={
            centered
              ? "flex flex-wrap items-center justify-center gap-4"
              : "flex flex-wrap items-center gap-4"
          }
        >
          <span
            aria-hidden
            className="text-serif-display-italic text-2xl leading-none text-accent md:text-3xl"
          >
            {index}
          </span>
          <span aria-hidden className="h-px w-12 bg-border-strong" />
          <span className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
            {label}
          </span>
        </p>

        <Heading as="h2" variant="display-md" className="mt-8 md:mt-10">
          {title}
        </Heading>

        {lede && (
          <p
            className={
              centered
                ? "mt-6 max-w-2xl text-body-lg text-text-secondary reading-width"
                : "mt-6 max-w-2xl text-body-lg text-text-secondary reading-width"
            }
          >
            {lede}
          </p>
        )}
      </div>
    </Reveal>
  );
};

SectionIntro.displayName = "SectionIntro";
