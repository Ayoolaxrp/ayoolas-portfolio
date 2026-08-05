import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton: loading state that matches the shape of final content.
 *
 * Spec: COMPONENTS.md §16.
 * - Honors prefers-reduced-motion (handled in globals.css).
 * - Border-radius matches the element it represents.
 * - Never use a spinner in place of a skeleton for content loading.
 *
 * Accessibility:
 * - Wrap in <div aria-busy="true" aria-label="Loading"> when used alone.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tailwind width class, e.g. "w-32". */
  widthClass?: string;
  /** Tailwind height class, e.g. "h-4". */
  heightClass?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  widthClass = "w-full",
  heightClass = "h-4",
  ...props
}) => (
  <div
    role="status"
    aria-label="Loading"
    className={cn(
      "rounded-md bg-subtle",
      "animate-pulse",
      widthClass,
      heightClass,
      className,
    )}
    {...props}
  />
);

Skeleton.displayName = "Skeleton";
