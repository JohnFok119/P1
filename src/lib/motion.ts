import type { Variants, Transition } from "framer-motion";
import { useReducedMotion as useFmReduce } from "framer-motion";

/** Primary expo-out reveal curve used across Studio X-inspired motion. */
export const ease = [0.16, 1, 0.3, 1] as const;

/** Fade + 24px upward translate. Use for headings, paragraphs, labels. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** Pure opacity fade-in. Use for ancillary blocks. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.0, ease } },
};

/** Image reveal — slight scale-down from 1.04 → 1 with fade. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease } },
};

/**
 * Stagger transition factory for `variants` parents.
 *
 * Args:
 *     delayChildren: Delay before the first child animation, in seconds.
 *     staggerChildren: Stagger interval between children, in seconds.
 *
 * Returns:
 *     A Framer Motion `Transition` object suitable for parent variants.
 */
export const stagger = (
  delayChildren = 0,
  staggerChildren = 0.08,
): Transition => ({
  delayChildren,
  staggerChildren,
});

/** Top-down overlay (menu) entrance variant. */
export const overlayIn: Variants = {
  hidden: { y: "-100%" },
  show: { y: 0, transition: { duration: 0.6, ease } },
};

/**
 * Re-export of Framer Motion's `useReducedMotion` for centralised access.
 *
 * Returns:
 *     `true` when the user prefers reduced motion, otherwise `false`.
 */
export const useReducedMotion = useFmReduce;
