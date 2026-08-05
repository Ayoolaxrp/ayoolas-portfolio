import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section: vertical rhythm primitive that wraps every page section.
 *
 * Spec: COMPONENTS.md §5.
 * - Vertical padding: space.12 mobile / space.20 desktop
 * - Horizontal padding: handled by Container inside
 * - Background variants: default (canvas), surface, sunken
 *
 * Variants:
 * - default: bg.canvas
 * - surface: bg.surface (alternating row for visual rhythm)
 * - sunken: bg.surface-sunken (code-heavy sections)
 * - subtle: bg.subtle (alternate row, slightly raised)
 *
 * Cinematic spacing (V5 design direction): space.24 mobile / space.40 desktop,
 * used on major story chapters so the page breathes like a documentary.
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "surface" | "sunken" | "subtle";
  /** Vertical padding override. "cinematic" = spacious, "hero" = space.24, "compact" = space.8, "default" = standard. */
  spacing?: "default" | "compact" | "hero" | "cinematic";
  as?: "section" | "div" | "article" | "aside";
}

const variantClasses = {
  default: "bg-canvas",
  surface: "bg-surface",
  sunken: "bg-surface-sunken",
  subtle: "bg-subtle",
} as const;

const spacingClasses = {
  compact: "py-8 md:py-12",
  default: "py-12 md:py-20",
  hero: "py-20 md:py-28",
  cinematic: "py-24 md:py-40",
} as const;

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      className,
      variant = "default",
      spacing = "default",
      as: As = "section",
      children,
      ...props
    },
    ref,
  ) => {
    const Element = As as React.ElementType;
    return (
      <Element
        ref={ref}
        className={cn(
          variantClasses[variant],
          spacingClasses[spacing],
          className,
        )}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

Section.displayName = "Section";
