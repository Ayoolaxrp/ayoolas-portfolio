"use client";

import * as React from "react";
import Image from "next/image";

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
 * Uses next/image to handle basePath correctly for GitHub Pages subpath deployment.
 */
export const Portrait: React.FC<PortraitProps> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);

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

      {/* The real photo, layered above the fallback. Uses next/image for basePath handling. */}
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          className={cn(
            "object-cover transition-opacity duration-slow ease-standard",
            loaded ? "opacity-100" : "opacity-0",
          )}
          sizes="100vw"
        />
      </div>
    </div>
  );
};

Portrait.displayName = "Portrait";
