import Lenis from "lenis";

let instance: Lenis | null = null;

/**
 * Initialise (or return the existing) global Lenis smooth-scroll instance.
 *
 * Skips initialisation entirely on the server, or when the user has requested
 * reduced motion. The returned value is `null`-typed-as-Lenis in those cases
 * to keep the call-site type ergonomic; callers should treat it as opaque.
 *
 * Returns:
 *     The active Lenis instance, or `null` cast as `Lenis` when smoothing
 *     is disabled (SSR or `prefers-reduced-motion`).
 */
export function initLenis(): Lenis {
  if (instance) return instance;
  if (typeof window === "undefined") return null as unknown as Lenis;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return null as unknown as Lenis;

  instance = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    syncTouch: false,
  });

  function raf(time: number): void {
    instance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return instance;
}

/**
 * Return the current Lenis instance if one has been initialised.
 *
 * Returns:
 *     The Lenis instance, or `null` when smoothing is disabled / not yet set up.
 */
export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smoothly scroll the page to a target element, selector, or absolute Y offset.
 *
 * Args:
 *     target: A CSS selector, an absolute pixel offset, or a DOM element.
 */
export function scrollTo(target: string | number | HTMLElement): void {
  instance?.scrollTo(target);
}
