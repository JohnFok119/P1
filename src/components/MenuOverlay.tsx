import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  href: string;
}

const items: MenuItem[] = [
  { label: "Horizon", href: "#projects" },
  { label: "How we build", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Full-screen navigation overlay that slides down from the top.
 *
 * Args:
 *     open: Whether the overlay is currently visible.
 *     onClose: Callback fired when the overlay should close (on close button
 *         click or after a menu item is selected).
 */
export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-foreground text-background flex flex-col"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-background/10">
            <span className="font-mono text-xs uppercase tracking-widest">
              Menu
            </span>
            <button
              onClick={onClose}
              className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-6 md:px-12">
            <ul className="space-y-4 md:space-y-6">
              {items.map((item, i) => (
                <motion.li
                  key={`${item.label}-${item.href}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease,
                    delay: 0.2 + i * 0.06,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="px-6 md:px-12 py-6 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-sm font-mono uppercase tracking-widest">
            <span>Irvine, CA</span>
            <a
              href="mailto:johnny.y.fok@gmail.com,giuseppipelayo@gmail.com"
              className="hover:text-accent transition-colors"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
