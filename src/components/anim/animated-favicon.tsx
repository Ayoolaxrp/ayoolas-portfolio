"use client";

import * as React from "react";

/**
 * AnimatedFavicon: animates the favicon with a subtle pulse/rotation
 * when the page is loading or has focus. Respects reduced motion.
 */
export const AnimatedFavicon: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const frameRef = React.useRef(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    // Check for reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Animate favicon on page load
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) return;

    // Initial animation on load
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
      loadProgress += 10;
      if (loadProgress >= 100) {
        clearInterval(loadInterval);
        // Start subtle pulse animation
        startPulseAnimation(favicon);
      } else {
        updateFavicon(favicon, loadProgress);
      }
    }, 50);

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      if (document.hidden && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (!document.hidden && !intervalRef.current) {
        startPulseAnimation(favicon);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(loadInterval);
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Restore original favicon
      favicon.href = "/favicon.svg";
    };
  }, []);

  const startPulseAnimation = (favicon: HTMLLinkElement) => {
    let angle = 0;
    intervalRef.current = setInterval(() => {
      angle = (angle + 2) % 360;
      updateFavicon(favicon, 100, angle);
    }, 100);
  };

  const updateFavicon = (favicon: HTMLLinkElement, progress: number, rotation = 0) => {
    const size = 32;
    const center = size / 2;
    const radius = 12;

    // Create SVG with animated ring
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <!-- Background circle -->
        <circle cx="${center}" cy="${center}" r="${radius}" fill="#05070b" />
        <!-- Animated ring -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius - 2}"
          fill="none"
          stroke="#10b981"
          stroke-width="2.5"
          stroke-dasharray="${2 * Math.PI * (radius - 2)}"
          stroke-dashoffset="${2 * Math.PI * (radius - 2) * (1 - progress / 100)}"
          transform="rotate(-90 ${center} ${center})"
          filter="url(#glow)"
        />
        <!-- Center dot -->
        <circle cx="${center}" cy="${center}" r="4" fill="#10b981" opacity="0.8" />
      </svg>
    `;

    favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  return null;
};

AnimatedFavicon.displayName = "AnimatedFavicon";