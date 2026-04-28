import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Track when an element scrolls into view for one-shot reveal animations.
 *
 * Wraps Framer Motion's `useInView` with sensible defaults: the element is
 * considered in view once `amount` of its area is visible, with a 10% bottom
 * margin so reveals fire just before the element is fully on screen, and the
 * detection only fires once per page load.
 *
 * Args:
 *     amount: Fraction (0–1) of the element that must be visible to trigger.
 *
 * Returns:
 *     `{ ref, inView }` — attach `ref` to the target element and conditionally
 *     drive your animation on `inView`.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  amount: number = 0.2,
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, {
    amount,
    once: true,
    margin: "0px 0px -10% 0px",
  });
  return { ref, inView };
}
