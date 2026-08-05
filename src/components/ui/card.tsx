import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card: base container for grouping content.
 *
 * Spec: COMPONENTS.md §7.
 * - bg.surface, border.subtle, radius.lg, padding.space.6
 *
 * Variants:
 * - default: flat
 * - interactive: hover lifts shadow
 * - accent: border.accent + optional glow
 *
 * Accessibility:
 * - Clickable cards MUST wrap content in <a>, not nest.
 */
export type CardVariant = "default" | "interactive" | "accent" | "outline";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-surface border border-border-subtle",
  interactive: [
    "bg-surface border border-border-subtle",
    "transition-[box-shadow,border-color,transform] duration-fast ease-standard",
    "hover:border-border-default hover:shadow-md",
  ].join(" "),
  accent: ["bg-surface border border-accent-border", "shadow-glow"].join(" "),
  outline: "bg-transparent border border-border-default",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg p-6", variantClasses[variant], className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";

/**
 * CardHeader / CardBody / CardFooter: optional semantic slots.
 * Use when a card needs structured composition. Plain <div> otherwise.
 */
export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />
));
CardBody.displayName = "CardBody";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex items-center gap-3", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
