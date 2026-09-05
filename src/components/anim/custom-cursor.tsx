"use client";

import * as React from "react";

/**
 * CustomCursor: a quiet, premium two-part cursor (dot + trailing ring) plus
 * magnetic pull on `[data-magnetic]` elements, text mode, image mode.
 *
 * Cohesion rules (why this feels unified):
 * - ONE rAF loop drives BOTH the dot and the ring on the same tick.
 * - The ring's lerp (0.7) is tuned for near-locked tracking with subtle trail.
 * - Scale (interactive grow / text mode / image mode) is lerped INSIDE the loop.
 * - On first visible frame the ring snaps to the dot's position.
 *
 * Rules:
 * - Only activates on fine pointers + no reduced motion (desktop feel).
 * - No re-renders on move: everything is driven through refs and one rAF loop.
 * - The native cursor is hidden by adding `cursor-premium` to <html>.
 * - Hovering interactive elements grows the ring.
 * - `[data-cursor-text]` elements switch to text mode (I-beam cursor).
 * - `[data-cursor-image]` elements switch to image mode (zoom cursor).
 * - Magnetic targets translate up to ~8px toward the pointer on mousemove
 *   and spring back on leave.
 */
export const CustomCursor: React.FC = () => {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const imageIconRef = React.useRef<HTMLSpanElement>(null);

  const target = React.useRef({ x: -100, y: -100 });
  const ringPos = React.useRef({ x: -100, y: -100 });
  const currentScale = React.useRef(1);
  const currentRotation = React.useRef(0);
  const magneticEl = React.useRef<HTMLElement | null>(null);
  const state = React.useRef({
    hovering: false,
    textMode: false,
    imageMode: false,
    visible: false,
    targetScale: 1,
    targetRotation: 0,
    labelText: "View",
  });

  React.useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("cursor-premium");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const imageIcon = imageIconRef.current;
    if (!dot || !ring || !label || !imageIcon) return;

    let raf = 0;

    const tick = () => {
      const current = state.current;
      if (!current.visible) {
        raf = 0;
        return;
      }

      // Ring catches up to the dot every frame. 0.7 for smooth trail.
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.7;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.7;

      // Scale eases toward its target.
      currentScale.current +=
        (current.targetScale - currentScale.current) * 0.4;

      // Rotation for image mode.
      currentRotation.current +=
        (current.targetRotation - currentRotation.current) * 0.3;

      dot.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${currentScale.current}) rotate(${currentRotation.current}deg)`;

      label.style.opacity = current.textMode ? "1" : "0";
      imageIcon.style.opacity = current.imageMode ? "1" : "0";
      label.textContent = current.labelText;

      raf = window.requestAnimationFrame(tick);
    };

    const setVisible = (visible: boolean) => {
      const wasVisible = state.current.visible;
      state.current.visible = visible;
      if (visible && !wasVisible) {
        // Snap the ring onto the dot so the pair enters perfectly aligned.
        ringPos.current.x = target.current.x;
        ringPos.current.y = target.current.y;
      }
      dot.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? "1" : "0";
      if (visible && raf === 0) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    const onMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (!state.current.visible) setVisible(true);

      // Magnetic pull: translate the closest magnetic target a touch.
      const element = (event.target as HTMLElement | null)?.closest?.(
        "[data-magnetic]",
      ) as HTMLElement | null;
      if (element) {
        if (magneticEl.current && magneticEl.current !== element) {
          magneticEl.current.style.transform = "";
          magneticEl.current.style.transition = "transform 0.4s cubic-bezier(0.3, 0, 0, 1)";
        }
        magneticEl.current = element;
        const rect = element.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.transform = `translate(${relX * 16}px, ${relY * 12}px)`;
      } else if (magneticEl.current) {
        magneticEl.current.style.transform = "";
        magneticEl.current.style.transition = "transform 0.5s cubic-bezier(0.3, 0, 0, 1)";
        magneticEl.current = null;
      }
    };

    const onOver = (event: MouseEvent) => {
      const targetEl = event.target as HTMLElement | null;

      // Text-entry fields keep the native I-beam: hide the custom cursor.
      if (targetEl?.closest?.("input, textarea, select, [contenteditable]")) {
        state.current.hovering = false;
        state.current.textMode = false;
        state.current.imageMode = false;
        state.current.targetScale = 1;
        state.current.targetRotation = 0;
        state.current.labelText = "View";
        setVisible(false);
        return;
      }

      // Check for image mode first (images, figures, galleries)
      const imageEl = targetEl?.closest?.(
        "img, figure, [data-cursor-image], .gallery-image, .project-image",
      );
      const isImage = Boolean(imageEl);

      // Check for text mode
      const textEl = targetEl?.closest?.(
        "a, button, [role='button'], [data-cursor-text], label, h1, h2, h3, h4, h5, h6, p, span, li, td, th",
      );
      const isText = Boolean(textEl) && !isImage;

      // Check for interactive elements
      const interactiveEl = targetEl?.closest?.(
        "a, button, [role='button'], [data-magnetic], label, input[type='checkbox'], input[type='radio'], select",
      );
      const isInteractive = Boolean(interactiveEl);

      state.current.hovering = isInteractive || isText || isImage;
      state.current.textMode = isText;
      state.current.imageMode = isImage;

      if (isImage) {
        state.current.targetScale = 3.5;
        state.current.targetRotation = 15;
        state.current.labelText = "Zoom";
      } else if (isText) {
        state.current.targetScale = 2.2;
        state.current.targetRotation = 0;
        state.current.labelText = textEl?.getAttribute("data-cursor-text") ?? "Select";
      } else if (isInteractive) {
        state.current.targetScale = 1.8;
        state.current.targetRotation = 0;
        state.current.labelText = interactiveEl?.getAttribute("data-cursor-text") ?? "Click";
      } else {
        state.current.targetScale = 1;
        state.current.targetRotation = 0;
        state.current.labelText = "View";
      }

      ring.classList.toggle("bg-accent-soft", state.current.hovering);
      ring.classList.toggle("border-accent", state.current.hovering && !isText && !isImage);
      ring.classList.toggle("border-accent-border", !state.current.hovering);
      ring.classList.toggle("border-accent-secondary", isImage);
      dot.style.opacity = state.current.hovering ? "0.15" : "1";
    };

    const onLeave = () => setVisible(false);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") setVisible(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKey);

    return () => {
      root.classList.remove("cursor-premium");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80]"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 rounded-full bg-accent opacity-0"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex size-10 items-center justify-center rounded-full border border-accent-border bg-transparent opacity-0 transition-[border-color,background-color,opacity] duration-fast ease-standard"
        style={{ willChange: "transform, opacity" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent opacity-0 transition-opacity duration-fast"
        >
          View
        </span>
        <span
          ref={imageIconRef}
          className="absolute size-4 text-accent opacity-0 transition-opacity duration-fast"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
      </div>
    </div>
  );
};

CustomCursor.displayName = "CustomCursor";
