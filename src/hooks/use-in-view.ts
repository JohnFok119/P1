import { useLayoutEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Lightweight scroll-trigger hook built on the Intersection Observer API.
 * Returns a ref to attach to the target element and a boolean indicating
 * whether that element is currently (or has been) within the viewport.
 *
 * Uses useLayoutEffect so that on re-mounts (e.g. HMR) the visibility
 * state is resolved synchronously before the browser paints — preventing
 * a flash of the invisible/animated-out state.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0.15, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Synchronous viewport check: if the element is already visible
    // (e.g. after an HMR re-mount), mark it immediately so the browser
    // never paints the opacity-0 / translated-out state.
    const rect = element.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyVisible) {
      setIsInView(true);
      if (triggerOnce) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}
