"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface PortraitProps {
  /** Path to the portrait image. */
  src: string;
  alt: string;
  className?: string;
}

/**
 * Portrait: the actual profile photo. Shows a styled placeholder until the
 * image at `src` loads successfully, then fades it in. If the file is missing,
 * the placeholder stays (no broken-image icon).
 *
 * The load check is race-safe: a fast local image can finish loading before
 * React hydrates and attaches `onLoad`, so an effect also checks `complete`
 * right after mount. That covers both paths.
 */
export const Portrait: React.FC<PortraitProps> = ({ src, alt, className }) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={cn("relative h-full w-full", className)}>
      {/* Fallback monogram: shown only until the real photo loads (or forever,
          if the file is missing). When loaded, opacity drops to 0 so it does
          not paint over the portrait. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 p-6 transition-opacity duration-slow ease-standard",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-accent-soft text-2xl font-semibold text-accent">
          A
        </span>
      </div>

      {/* The real photo, layered above the fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-standard",
          loaded ? "opacity-100" : "opacity-0",
        )}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

Portrait.displayName = "Portrait";
