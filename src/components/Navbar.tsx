import { useState } from "react";
import { MenuOverlay } from "@/components/MenuOverlay";

/**
 * Top-of-page navigation bar.
 *
 * Studio X-inspired anatomy: a thin, sticky, hairline-bordered bar with a
 * mono "Est. 2025" label on the left, a centered "P1" wordmark, and a "Menu"
 * trigger on the right that opens the full-screen `MenuOverlay`.
 */
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-6 md:px-12 py-5 bg-background/80 backdrop-blur border-b border-foreground/10">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Est. 2025
        </span>
        <a
          href="#"
          className="justify-self-center font-display text-xl md:text-2xl font-medium tracking-tight text-foreground hover:text-accent transition-colors"
        >
          P1
        </a>
        <button
          onClick={() => setOpen(true)}
          className="justify-self-end font-mono text-xs uppercase tracking-widest text-foreground hover:text-accent transition-colors"
          aria-label="Open menu"
        >
          Menu
        </button>
      </nav>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
