"use client";

import * as React from "react";

/**
 * CustomCursor: a quiet, premium two-part cursor (dot + trailing ring) plus
 * magnetic pull on `[data-magnetic]` elements.
 *
 * Cohesion rules (why this feels unified):
 * - ONE rAF loop drives BOTH the dot and the ring on the same tick.
 * - The ring's lerp (0.65) is tuned for near-locked tracking: it trails by a
 *   fraction of a frame for depth but never feels slow or floaty.
 * - Scale (interactive grow / text mode) is lerped INSIDE the loop, and the
 *   ring has NO CSS transform transition, so nothing fights the loop.
 * - On first visible frame the ring snaps to the dot's position, so they
 *   never start desynchronized.
 *
 * Rules:
 * - Only activates on fine pointers + no reduced motion (desktop feel).
 * - No re-renders on move: everything is driven through refs and one rAF loop.
 * - The native cursor is hidden by adding `cursor-premium` to <html>.
 * - Hovering any interactive element grows the ring; `[data-cursor-text]`
 *   elements switch the ring into a label state ("View").
 * - Magnetic targets translate up to ~6px toward the pointer on mousemove
 *   and spring back on leave.
 */
export const CustomCursor: React.FC = () => {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);

  const target = React.useRef({ x: -100, y: -100 });
  const ringPos = React.useRef({ x: -100, y: -100 });
  const currentScale = React.useRef(1);
  const magneticEl = React.useRef<HTMLElement | null>(null);
  const state = React.useRef({
    hovering: false,
    textMode: false,
    visible: false,
    targetScale: 1,
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
    if (!dot || !ring || !label) return;

    let raf = 0;

    const tick = () => {
      const current = state.current;
      if (!current.visible) {
        raf = 0;
        return;
      }

      // Ring catches up to the dot every frame. 0.65 is effectively locked:
      // ~1 frame of trail for depth, imperceptible as latency.
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.65;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.65;

      // Scale eases toward its target (grow over links, larger over text).
      currentScale.current +=
        (current.targetScale - currentScale.current) * 0.38;

      dot.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${currentScale.current})`;

      label.style.opacity = current.textMode ? "1" : "0";

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
        }
        magneticEl.current = element;
        const rect = element.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.transform = `translate(${relX * 12}px, ${relY * 10}px)`;
      } else if (magneticEl.current) {
        magneticEl.current.style.transform = "";
        magneticEl.current = null;
      }
    };

    const onOver = (event: MouseEvent) => {
      // Text-entry fields keep the native I-beam: hide the custom cursor.
      if (
        (event.target as HTMLElement | null)?.closest?.(
          "input, textarea, select",
        )
      ) {
        state.current.hovering = false;
        state.current.textMode = false;
        state.current.targetScale = 1;
        setVisible(false);
        return;
      }

      const element = (event.target as HTMLElement | null)?.closest?.(
        "a, button, [role='button'], [data-cursor-text], label",
      );
      const interactive = Boolean(element);
      const textMode = Boolean(
        (event.target as HTMLElement | null)?.closest?.("[data-cursor-text]"),
      );
      state.current.hovering = interactive;
      state.current.textMode = textMode;
      state.current.targetScale = textMode ? 2.2 : interactive ? 1.7 : 1;

      ring.classList.toggle("bg-accent-soft", interactive);
      ring.classList.toggle("border-accent", interactive && !textMode);
      ring.classList.toggle("border-accent-border", !interactive);
      dot.style.opacity = interactive ? "0.25" : "1";
      label.textContent = element?.getAttribute("data-cursor-text") ?? "View";
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
      /* Always mounted: visibility is driven by the capability gate above, so
         the pair can never silently vanish while the native cursor is hidden. */
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
        className="fixed left-0 top-0 flex size-9 items-center justify-center rounded-full border border-accent-border bg-transparent opacity-0 transition-[border-color,background-color,opacity] duration-fast ease-standard"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent opacity-0"
        >
          View
        </span>
      </div>
    </div>
  );
};

CustomCursor.displayName = "CustomCursor";
