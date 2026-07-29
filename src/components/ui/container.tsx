import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Container — width-and-padding primitive that holds page content.
 *
 * Spec: COMPONENTS.md §4.
 * Variants: max (1200px), prose (720px), wide (1400px).
 * Default element is <div>; pass `as` for semantic override.
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "max" | "prose" | "wide";
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "max", as: As = "div", children, ...props }, ref) => {
    const variantClass =
      variant === "prose"
        ? "container-prose"
        : variant === "wide"
          ? "container-wide"
          : "container-page";

    // Render the chosen element but type the ref as a div (good enough
    // for consumer ergonomics; underlying element receives the ref).
    const Element = As as React.ElementType;

    return (
      <Element ref={ref} className={cn(variantClass, className)} {...props}>
        {children}
      </Element>
    );
  },
);

Container.displayName = "Container";
