import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Heading: typography primitive.
 *
 * Spec: COMPONENTS.md §6.
 * - Wraps <h1>–<h4>, display sizes, and eyebrow label.
 * - Renders correct semantic tag by default.
 * - eyebrow renders <p> (not a heading).
 *
 * Usage rule (UX_PRINCIPLES §5.2):
 * - One <h1> per page.
 * - Section titles use <h2>; sub-section titles <h3>; card titles <h4>.
 */
export type HeadingVariant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "eyebrow";

export interface HeadingProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "as"
> {
  variant?: HeadingVariant;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  textAlign?: "left" | "center" | "right";
}

const variantClasses: Record<HeadingVariant, string> = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  eyebrow: "eyebrow",
};

const variantToTag: Record<HeadingVariant, "h1" | "h2" | "h3" | "h4" | "p"> = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  eyebrow: "p",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, variant = "h2", as, textAlign = "left", children, ...props },
    ref,
  ) => {
    // eyebrow is never a heading element.
    const Tag = variant === "eyebrow" ? "p" : (as ?? variantToTag[variant]);

    return (
      <Tag
        ref={ref as React.Ref<HTMLHeadingElement>}
        className={cn(
          variantClasses[variant],
          "text-text-primary",
          textAlign === "center" && "text-center",
          textAlign === "right" && "text-right",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";
