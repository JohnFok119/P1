import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * First-paint loading curtain.
 *
 * A full-bleed dark panel that fills a hairline progress bar from 0 → 100% over
 * 1.5s, then fades away after a short hold. Calls `onComplete` once the fade
 * animation finishes so the host page can flag itself as "loaded".
 *
 * Args:
 *     onComplete: Callback fired when the fade-out animation ends.
 */
export function Loader({ onComplete }: LoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-foreground text-background flex flex-col justify-end p-6 md:p-12"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.6, duration: 0.5, ease }}
      onAnimationComplete={onComplete}
    >
      <div className="flex justify-between items-end mb-4">
        <span className="font-display text-2xl md:text-4xl font-medium tracking-tight">
          P1
        </span>
        <span className="font-mono text-xs uppercase tracking-widest opacity-70">
          Loading
        </span>
      </div>
      <div className="h-px bg-background/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease }}
          style={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );
}
