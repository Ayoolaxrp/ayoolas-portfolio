import type Lenis from "lenis";

/**
 * Shared handle to the active Lenis instance.
 *
 * `SmoothScroll` registers the instance on mount; other components (e.g.
 * MobileNav) can stop/start smooth scrolling: e.g. to lock background
 * scroll while a drawer is open. `body { overflow: hidden }` alone doesn't
 * stop Lenis (it animates the window scroller), so this is the reliable way.
 */
let lenisInstance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null): void {
  lenisInstance = lenis;
}

export function stopSmoothScroll(): void {
  lenisInstance?.stop();
}

export function startSmoothScroll(): void {
  lenisInstance?.start();
}

/**
 * Smoothly scroll to a selector or element, honouring the active Lenis
 * instance (Lenis otherwise hijacks native anchor jumps). Falls back to
 * native smooth scrolling when Lenis is inactive (e.g. reduced motion).
 */
export function scrollToTarget(
  target: string | HTMLElement,
  offset = -96,
): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 0.75 });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Click handler for hash links in the shape "/#section" (footer Focus
 * columns, What I Build cross-links). Intercepts the click and smooth-scrolls
 * via Lenis so in-page jumps match the rest of the site's motion. Links that
 * are not hash links, or whose target does not exist on this page, fall
 * through to default navigation (harmless progressive enhancement).
 */
export function handleHashHref(
  event: { preventDefault: () => void },
  href: string,
  offset = -80,
): void {
  if (!href.startsWith("/#")) return;
  const selector = href.slice(1); // "/#projects" -> "#projects"
  if (!document.querySelector(selector)) return;
  event.preventDefault();
  scrollToTarget(selector, offset);
}
