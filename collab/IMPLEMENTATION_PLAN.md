# P1 — Studio X-Inspired Redesign: Implementation Plan for Cursor

> **Reader**: Cursor (or any IDE agent). **Source of truth for visuals**: https://www.thisisstudiox.com — open in a separate browser tab and use as live reference while implementing each phase. **Companion file**: `./DESIGN_TOKENS.md` — colors, fonts, motion timings, spacing.
> 
> **Goal**: take the existing Vite + React + Tailwind landing page at `C:\College-Stuff\UCI-Files\Startup\P1` and rebuild its visual layer to match Studio X's design language while keeping P1's sports-analytics content.
> 
> **Approach**: hybrid — Studio X *structure* (sections, layout patterns, micro-interactions, palette, typography), P1 *content* (rewritten copy targeted to coaches/athletes/recruiters, existing assets reused).

---

## 0. Pre-flight (10 min)

### 0.1 Verify environment
```bash
cd C:\College-Stuff\UCI-Files\Startup\P1
node -v        # expect >=18
npm -v
git status     # expect clean working tree on test/newfrontend branch
npm run dev    # expect dev server boots at http://localhost:5173
```
Stop the dev server (Ctrl+C) before continuing.

### 0.2 Install dependencies
```bash
npm install framer-motion@^11.0.0 lenis@^1.1.0
```

Add to `package.json` `"dependencies"` (npm should do this automatically, but verify):
- `"framer-motion": "^11.0.0"`
- `"lenis": "^1.1.0"`

### 0.3 Branch hygiene
```bash
git checkout -b feature/studio-x-redesign
```
Commit at the end of every phase with message `[STUDIO-X PHASE N] <summary>`.

### 0.4 Acceptance criteria for Pre-flight
- [ ] `npm install` exits 0
- [ ] `npm run dev` opens browser, current site renders
- [ ] New branch checked out

---

## Phase 1 — Theme Swap (palette + fonts) (~25 min)

### 1.1 Files
- `src/index.css` (edit)
- `tailwind.config.ts` (edit)

### 1.2 Replace Google Fonts import
In `src/index.css` line 1, replace the existing `@import url(...)` line with:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

### 1.3 Replace `:root` block in `src/index.css`
Replace the entire `@layer base { :root { ... } }` block (lines ~7–51) with:
```css
@layer base {
  :root {
    --background: 48 26% 92%;        /* #F2F0E6 cream */
    --foreground: 0 0% 10%;          /* #1A1A1A ink */

    --card: 52 33% 97%;              /* #FBFAF5 */
    --card-foreground: 0 0% 10%;

    --popover: 52 33% 97%;
    --popover-foreground: 0 0% 10%;

    --primary: 15 100% 50%;          /* #FF4101 orange */
    --primary-foreground: 0 0% 100%;

    --secondary: 45 28% 88%;         /* #EAE6D8 */
    --secondary-foreground: 0 0% 10%;

    --muted: 45 28% 88%;
    --muted-foreground: 35 5% 47%;   /* #7A7670 */

    --accent: 15 100% 50%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 10%;              /* used at 0.1 alpha via tailwind opacity utilities */
    --input: 0 0% 10%;
    --ring: 15 100% 50%;

    --radius: 0.25rem;

    --sidebar-background: 48 26% 92%;
    --sidebar-foreground: 0 0% 10%;
    --sidebar-primary: 15 100% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 45 28% 88%;
    --sidebar-accent-foreground: 0 0% 10%;
    --sidebar-border: 0 0% 10%;
    --sidebar-ring: 15 100% 50%;
  }
}
```

### 1.4 Remove dark-theme utilities from `src/index.css`
Delete these utilities (purple-themed, no longer applicable):
- `.text-gradient { ... }`
- `.glow-purple { ... }`
- `.bg-gradient-radial { ... }`

Update the shimmer/scanner gradients to use `hsl(var(--accent) / 0.5)` instead of hard-coded `hsla(262, 83%, 58%, ...)`:
- `.animate-shimmer::after` background → `linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.06) 50%, transparent 100%)`
- `.code-scanner::after` background → `linear-gradient(90deg, transparent, hsl(var(--accent) / 0.35), transparent)`

### 1.5 Update `tailwind.config.ts` fontFamily (line 16–19)
Replace:
```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
},
```

### 1.6 Add new keyframes to `tailwind.config.ts` `keyframes` block
Add after existing keyframes:
```ts
"reveal-up": {
  "0%": { opacity: "0", transform: "translateY(24px)" },
  "100%": { opacity: "1", transform: "translateY(0)" },
},
"reveal-image": {
  "0%": { opacity: "0", transform: "scale(1.04)" },
  "100%": { opacity: "1", transform: "scale(1)" },
},
"loader-fill": {
  "0%": { transform: "scaleX(0)" },
  "100%": { transform: "scaleX(1)" },
},
"marquee": {
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(-50%)" },
},
```

And matching `animation` entries:
```ts
"reveal-up": "reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
"reveal-image": "reveal-image 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
"loader-fill": "loader-fill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
marquee: "marquee 40s linear infinite",
```

### 1.7 Acceptance criteria
- [ ] `npm run dev` shows the page on cream background `#F2F0E6`
- [ ] Headlines render in Inter Tight (DevTools → Computed → `font-family`)
- [ ] No purple remains visible anywhere
- [ ] No console errors

### 1.8 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 1] palette + fonts swap"
```

---

## Phase 2 — Lenis + Framer Motion infrastructure (~30 min)

### 2.1 Files to create
- `src/lib/lenis.ts`
- `src/lib/motion.ts`
- `src/hooks/use-scroll-reveal.ts`

### 2.2 `src/lib/lenis.ts`
```ts
import Lenis from 'lenis';

let instance: Lenis | null = null;

export function initLenis(): Lenis {
  if (instance) return instance;
  if (typeof window === 'undefined') return null as unknown as Lenis;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return null as unknown as Lenis;

  instance = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    syncTouch: false,
  });

  function raf(time: number) {
    instance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function scrollTo(target: string | number | HTMLElement) {
  instance?.scrollTo(target);
}
```

### 2.3 `src/lib/motion.ts`
```ts
import type { Variants, Transition } from 'framer-motion';

export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.0, ease } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Transition => ({
  delayChildren,
  staggerChildren,
});

export const overlayIn: Variants = {
  hidden: { y: '-100%' },
  show: { y: 0, transition: { duration: 0.6, ease } },
};
```

### 2.4 `src/hooks/use-scroll-reveal.ts`
```ts
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  amount: number = 0.2,
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount, once: true, margin: '0px 0px -10% 0px' });
  return { ref, inView };
}
```

### 2.5 Mount Lenis in `src/main.tsx`
Edit `src/main.tsx`. After the existing imports, before `createRoot`, add:
```ts
import { initLenis } from '@/lib/lenis';
initLenis();
```

### 2.6 Acceptance criteria
- [ ] Scroll the page — feels inertial / damped, not instant
- [ ] On macOS trackpad, momentum scroll continues smoothly
- [ ] If user has `prefers-reduced-motion: reduce`, scroll is native (test via DevTools → Rendering → Emulate CSS media feature)
- [ ] No console errors

### 2.7 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 2] lenis + framer-motion infrastructure"
```

---

## Phase 3 — Navbar rebuild (centered logo + hamburger) (~45 min)

### 3.1 Reference
Studio X nav anatomy:
- Top bar: thin, full-width, hairline border-bottom
- Left: empty (or small index/locale label)
- Center: studio name "Studio X" — clicks home
- Right: hamburger icon labeled "Menu" — opens full-screen overlay
- On scroll: bar stays sticky, no hide/reveal

### 3.2 Files
- `src/components/Navbar.tsx` (replace contents)
- `src/components/MenuOverlay.tsx` (create)

### 3.3 `src/components/MenuOverlay.tsx`
```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '@/lib/motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

const items = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export function MenuOverlay({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-foreground text-background flex flex-col"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-background/10">
            <span className="font-mono text-xs uppercase tracking-widest">Menu</span>
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
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.06 }}
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
            <a href="mailto:johnny.y.fok@gmail.com" className="hover:text-accent transition-colors">
              johnny.y.fok@gmail.com
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 3.4 `src/components/Navbar.tsx` (replace entire file)
```tsx
import { useState } from 'react';
import { MenuOverlay } from '@/components/MenuOverlay';

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
```

### 3.5 Acceptance criteria
- [ ] Logo "P1" centered in nav
- [ ] "Menu" label top-right opens full-screen overlay sliding from top
- [ ] Overlay shows 6 nav items in display font, each links to `#` anchor
- [ ] Click "Close" or any nav item closes overlay
- [ ] On overlay close, page scrolls (Lenis) to anchor target

### 3.6 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 3] navbar + menu overlay"
```

---

## Phase 4 — Hero carousel with loader (~60 min)

### 4.1 Reference
Studio X hero:
- Full-bleed background carousel: 4 images cross-fading (or sliding) every ~5 s
- Drag interaction: user can drag horizontally to advance manually (label "DRAG ←→" appears on hover)
- Headline overlay: large display text, lower-left or center
- Loader: progress bar fills 0→100% on first paint, then fades; only on first visit

### 4.2 Files
- `src/components/Loader.tsx` (create)
- `src/components/HeroCarousel.tsx` (create)
- `src/components/HeroSection.tsx` (replace contents)

### 4.3 `src/components/Loader.tsx`
```tsx
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

interface Props {
  onComplete: () => void;
}

export function Loader({ onComplete }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-foreground text-background flex flex-col justify-end p-6 md:p-12"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.6, duration: 0.5, ease }}
      onAnimationComplete={onComplete}
    >
      <div className="flex justify-between items-end mb-4">
        <span className="font-display text-2xl md:text-4xl font-medium tracking-tight">P1</span>
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
          style={{ width: '100%' }}
        />
      </div>
    </motion.div>
  );
}
```

### 4.4 `src/components/HeroCarousel.tsx`
```tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '@/lib/motion';
import basketball from '@/assets/basketball.png';
import volleyball from '@/assets/volleyball.png';
import tennis from '@/assets/tennis.png';
import soccer from '@/assets/soccer.png';

const slides = [
  { src: basketball, alt: 'Basketball action shot' },
  { src: volleyball, alt: 'Volleyball action shot' },
  { src: tennis, alt: 'Tennis action shot' },
  { src: soccer, alt: 'Soccer action shot' },
];

const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [hovering]);

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={slides[index].src}
          alt={slides[index].alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) setIndex((i) => (i + 1) % slides.length);
            else if (info.offset.x > 80) setIndex((i) => (i - 1 + slides.length) % slides.length);
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-foreground/30 pointer-events-none" />

      {/* Drag hint */}
      <motion.div
        className="absolute bottom-8 right-8 font-mono text-xs uppercase tracking-widest text-background pointer-events-none"
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Drag ← →
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-8 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-px w-8 transition-colors ${i === index ? 'bg-background' : 'bg-background/30'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

### 4.5 `src/components/HeroSection.tsx` (replace entire file)
```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Loader } from '@/components/Loader';

const HERO_HEADLINE = 'We build intelligent telemetry for high-performance athletic programs.';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden text-background"
    >
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <HeroCarousel />

      <div className="relative z-10 flex flex-col justify-end h-screen px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
        <motion.h1
          className="font-display font-medium tracking-tight leading-[0.95] text-background max-w-5xl"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 32 }}
          transition={{ duration: 1.0, ease, delay: 0.2 }}
        >
          {HERO_HEADLINE}
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroSection;
```

### 4.6 Acceptance criteria
- [ ] On first load, loader fills bottom progress bar 0→100%, then fades out (~2 s total)
- [ ] After loader, hero carousel auto-rotates every 5 s
- [ ] Mouse-enter hero: carousel pauses, "DRAG ← →" hint appears bottom-right
- [ ] Drag horizontally past 80 px advances/rewinds slide
- [ ] Headline text appears bottom-left after loader, fades up
- [ ] 4 slide indicators visible bottom-left

### 4.7 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 4] hero carousel + loader"
```

---

## Phase 5 — About statement section (~30 min)

### 5.1 Reference
Studio X "About" pattern:
- Two-column layout: bold statement on left, large image on right
- Below: a featured pull-quote in larger italic
- "Learn more" link with circular arrow button

### 5.2 Files
- `src/components/AboutSection.tsx` (replace contents — keep file)

### 5.3 New `src/components/AboutSection.tsx`
```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp, imageReveal } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import basketball from '@/assets/basketball.png';

const HEADLINE =
  "We deliver telemetry pipelines that shape player development and directly improve the win rate of the programs we partner with.";

const PULL_QUOTE =
  "We build systems where measurement and performance are inseparable.";

const BODY = [
  "P1 equips high-school and collegiate programs with professional-grade statistical telemetry — the same caliber of data NBA front offices rely on.",
  "Our pipelines run on standard match footage. No wearables, no manual stat-keeping, no extra coaching staff. Coaches get the metrics that matter; players get the visibility that recruiters look for.",
];

const AboutSection = () => {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-background px-6 md:px-12 lg:px-16 py-24 md:py-40"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.span
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-12"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          About — 01
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.h2
            className="lg:col-span-7 font-display font-medium tracking-tight leading-[1.05] text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)' }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            {HEADLINE}
          </motion.h2>

          <motion.div
            className="lg:col-span-5 aspect-[4/5] overflow-hidden rounded-sm"
            variants={imageReveal}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <img src={basketball} alt="Player on court" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-24">
          <motion.blockquote
            className="lg:col-span-7 lg:col-start-3 font-display italic font-light text-foreground leading-snug"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)' }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.3 }}
          >
            "{PULL_QUOTE}"
          </motion.blockquote>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-24">
          <motion.div
            className="lg:col-span-6 lg:col-start-7 space-y-6"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.4 }}
          >
            {BODY.map((p, i) => (
              <p key={i} className="text-lg text-foreground/80 leading-relaxed">
                {p}
              </p>
            ))}
            <a
              href="#process"
              className="inline-flex items-center gap-3 mt-4 group"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                Learn more about us
              </span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background group-hover:bg-accent transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
```

### 5.4 Acceptance criteria
- [ ] "About — 01" mono label top-left
- [ ] Bold sentence-case headline left, image right at top
- [ ] Italic pull-quote in middle, indented
- [ ] Body paragraphs + "Learn more" link bottom-right
- [ ] All elements fade up on scroll into view
- [ ] Hover on "Learn more": arrow circle turns orange

### 5.5 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 5] about statement section"
```

---

## Phase 6 — Featured Projects carousel (~50 min)

### 6.1 Reference
Studio X "Featured" carousel:
- Full-width row of project cards (~3 visible at a time desktop)
- Each card: large image, project name, location, hover → image scales 1.02
- Drag/scroll-snap interaction; prev/next arrows

### 6.2 Files
- `src/components/ProjectsSection.tsx` (replace contents)

### 6.3 Project data
Replace existing bento grid with carousel of 5 cards. Use existing P1 services as projects.

### 6.4 New `src/components/ProjectsSection.tsx`
```tsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import basketball from '@/assets/basketball.png';
import volleyball from '@/assets/volleyball.png';
import tennis from '@/assets/tennis.png';
import soccer from '@/assets/soccer.png';
import clutchLogo from '@/assets/clutch_logo.webp';

interface Project {
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  { title: 'Automated Stat Tracking',     category: 'Computer Vision · Live',     image: basketball },
  { title: 'Player Profiling Index',      category: 'Recruiting · Beta',           image: volleyball },
  { title: 'Four-Factors Reporting',      category: 'Coaching · Live',             image: tennis },
  { title: 'AI Vision Tracking',          category: 'Research · Internal',         image: soccer },
  { title: 'Clutch Companion App',        category: 'Mobile · Live',               image: clutchLogo },
];

const ProjectsSection = () => {
  const { ref: headerRef, inView: headerIn } = useScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' });
  };

  return (
    <section
      id="projects"
      className="relative bg-background py-24 md:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={headerRef} className="flex justify-between items-end mb-12 md:mb-20">
          <div>
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
              variants={fadeUp}
              initial="hidden"
              animate={headerIn ? 'show' : 'hidden'}
            >
              Featured — 02
            </motion.span>
            <motion.h2
              className="font-display font-medium tracking-tight text-foreground mt-4"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
              variants={fadeUp}
              initial="hidden"
              animate={headerIn ? 'show' : 'hidden'}
              transition={{ delay: 0.1 }}
            >
              Featured projects
            </motion.h2>
          </div>
          <motion.div
            className="hidden md:flex gap-3"
            variants={fadeUp}
            initial="hidden"
            animate={headerIn ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => scrollBy(-1)}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 md:px-12 lg:px-16 pb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            className="snap-start shrink-0 w-[80%] md:w-[45%] lg:w-[32%] group cursor-pointer"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight">
                  {p.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
                  {p.category}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 mt-2 text-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
```

Add to `src/index.css` `@layer utilities`:
```css
.scrollbar-none::-webkit-scrollbar { display: none; }
```

### 6.5 Acceptance criteria
- [ ] "Featured — 02" header with prev/next arrow buttons top-right
- [ ] Horizontal scrolling card row, snap to card edges
- [ ] Click prev/next: row scrolls 70% of viewport
- [ ] Hover card: image scales subtly, arrow turns orange
- [ ] Cards fade-up staggered on scroll into view

### 6.6 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 6] featured projects carousel"
```

---

## Phase 7 — Process section (numbered 01–09 with expand) (~60 min)

### 7.1 Reference
Studio X process:
- Headline + subhead at top of section
- 9 numbered rows: `01 — Pre-Concept` etc., hairline divider between
- Click row → expands inline showing detail copy + image
- Single row open at a time

### 7.2 Files
- `src/components/ProcessSection.tsx` (create)
- `src/pages/Index.tsx` (add import + place after `<ProjectsSection />`)

### 7.3 New `src/components/ProcessSection.tsx`
```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { fadeUp, ease } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Step {
  num: string;
  title: string;
  summary: string;
  detail: string;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    summary: 'We meet your coaching staff and audit current data workflows.',
    detail:
      'We sit with head coaches, assistants, and program leadership to map the questions you actually need answered. We audit current scouting workflows, manual stat sheets, video review cadence, and recruiting touchpoints — so the system we deliver replaces friction, not adds to it.',
  },
  {
    num: '02',
    title: 'Calibration',
    summary: 'Camera setup, court calibration, athlete enrollment.',
    detail:
      'A one-time calibration locks our vision pipeline to your venue. We register court geometry, jersey rosters, and lighting profiles. Athletes are enrolled into the system in under 5 minutes per roster.',
  },
  {
    num: '03',
    title: 'Recording',
    summary: 'Capture games and practices using standard cameras.',
    detail:
      'No proprietary hardware. P1 ingests footage from any 1080p camera mounted at midcourt. Coaches record like they always have — we handle the rest.',
  },
  {
    num: '04',
    title: 'Ingestion',
    summary: 'Upload triggers our automated processing pipeline.',
    detail:
      'Drag-and-drop upload to the P1 dashboard. Within minutes, our pipeline normalizes the footage, runs detection, tracks every player and the ball, and flags possessions automatically.',
  },
  {
    num: '05',
    title: 'AI Analysis',
    summary: 'Computer vision extracts every shot, pass, and movement.',
    detail:
      'Our proprietary models extract granular events — shot location, defender distance, possession outcome, transition speed. Every event is timestamped and searchable.',
  },
  {
    num: '06',
    title: 'Visualization',
    summary: 'Coaches see heatmaps, four-factors, and lineup matrices.',
    detail:
      'Outputs land in the coach dashboard: shot heatmaps, four-factor splits, lineup ± , player efficiency ratings. Every chart drills down to the underlying clip.',
  },
  {
    num: '07',
    title: 'Coach Review',
    summary: 'Weekly insight reports tailored to your gameplan.',
    detail:
      "We don't just hand over data. P1 generates a weekly insight brief — what changed, what's working, what to address — so the staff acts on findings instead of mining them.",
  },
  {
    num: '08',
    title: 'Recruiter Visibility',
    summary: 'Player profiles published to a national recruiter network.',
    detail:
      'Standardized player profiles — efficiency, role-fit, growth trajectory — surface to a network of recruiters at the next level. Visibility scales without your staff lifting a finger.',
  },
  {
    num: '09',
    title: 'Iteration',
    summary: 'Quarterly retros tighten the loop.',
    detail:
      'Every quarter we review usage with your staff, retire metrics nobody touches, and add the ones the season actually surfaced. The system improves alongside the program.',
  },
];

const HEADLINE =
  'Our work follows a clear pipeline, so creativity sits alongside statistical and operational rigor.';

const ProcessSection = () => {
  const [open, setOpen] = useState<string | null>(null);
  const { ref, inView } = useScrollReveal();

  return (
    <section id="process" className="relative bg-background py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <motion.span
            className="lg:col-span-12 font-mono text-xs uppercase tracking-widest text-muted-foreground block"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            Process — 03
          </motion.span>
          <motion.h2
            className="lg:col-span-9 font-display font-medium tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.75rem)' }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            {HEADLINE}
          </motion.h2>
        </div>

        <ul className="border-t border-foreground/10">
          {steps.map((s, i) => {
            const isOpen = open === s.num;
            return (
              <motion.li
                key={s.num}
                className="border-b border-foreground/10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.6, ease }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : s.num)}
                  className="w-full grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-sm md:text-base text-muted-foreground">
                    {s.num}
                  </span>
                  <span
                    className="col-span-8 md:col-span-5 font-display font-medium text-foreground group-hover:text-accent transition-colors"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
                  >
                    {s.title}
                  </span>
                  <span className="hidden md:block md:col-span-5 text-muted-foreground text-sm md:text-base">
                    {s.summary}
                  </span>
                  <span className="col-span-2 md:col-span-1 justify-self-end self-center">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                    ) : (
                      <Plus className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 pb-8">
                        <p className="col-span-12 md:col-span-7 md:col-start-2 text-foreground/80 text-base md:text-lg leading-relaxed">
                          {s.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProcessSection;
```

### 7.4 Acceptance criteria
- [ ] 9 rows visible, hairline dividers between
- [ ] Each row shows: `01` numeral · title · summary · `+` icon
- [ ] Click row: row expands smoothly, `+` becomes `−`, detail paragraph appears indented
- [ ] Click another row: previous closes, new opens (single-open behavior)
- [ ] Hover row: title turns orange

### 7.5 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 7] process section"
```

---

## Phase 8 — Client logos strip (~25 min)

### 8.1 Reference
Studio X client strip: monochrome wordmarks scrolling horizontally, infinite marquee.

### 8.2 Files
- `src/components/ClientLogosSection.tsx` (create)

### 8.3 New file
```tsx
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const partners = [
  'UC Irvine',
  'UC Riverside',
  'Cal Poly Pomona',
  'AAU West Coast',
  'Pacific Prep League',
  'Coastal Athletic Conf.',
  'NorCal Hoops',
  'Inland Empire HS',
];

const ClientLogosSection = () => {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="clients" className="relative bg-secondary py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="mb-12">
          <motion.span
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            Trusted by — 04
          </motion.span>
          <motion.h2
            className="font-display font-medium text-foreground mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            Programs and partners
          </motion.h2>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-12 md:gap-20 animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-4xl font-medium tracking-tight text-foreground/40 hover:text-foreground transition-colors"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
```

### 8.4 Acceptance criteria
- [ ] Marquee strip auto-scrolls left infinitely (40 s loop)
- [ ] Wordmarks rendered in display font, low-opacity
- [ ] Hover individual wordmark turns full opacity
- [ ] Section background `--secondary` cream-deep

### 8.5 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 8] client logos strip"
```

---

## Phase 9 — Testimonials carousel (~40 min)

### 9.1 Files
- `src/components/TestimonialsSection.tsx` (create)

### 9.2 New file
```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ease } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Quote {
  text: string;
  name: string;
  role: string;
}

/* PLACEHOLDER quotes — replace with real testimonials when available */
const quotes: Quote[] = [
  {
    text: "P1 turned a season's worth of film into the kind of read-out I'd only ever seen at the next level. We adjusted our defensive scheme inside a week.",
    name: 'Coach M. Avila',
    role: 'Head Coach, Pacific Prep League',
  },
  {
    text: 'Our recruiter inbox went from polite silence to active outreach. The standardized profiles meant scouts could compare players honestly.',
    name: 'D. Tanaka',
    role: 'Athletic Director, NorCal Hoops',
  },
  {
    text: "It removed the guesswork. We stopped arguing about lineups and started shipping wins.",
    name: 'Coach R. Patel',
    role: 'Assistant Coach, Coastal Athletic Conf.',
  },
];

const TestimonialsSection = () => {
  const [i, setI] = useState(0);
  const { ref, inView } = useScrollReveal();

  const next = () => setI((p) => (p + 1) % quotes.length);
  const prev = () => setI((p) => (p - 1 + quotes.length) % quotes.length);
  const q = quotes[i];

  return (
    <section className="relative bg-background py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="mb-12">
          <motion.span
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            Words from partners — 05
          </motion.span>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease }}
                className="font-display italic font-light text-foreground leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
              >
                "{q.text}"
                <footer className="not-italic mt-8 font-sans">
                  <p className="text-base md:text-lg text-foreground font-medium">{q.name}</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {q.role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="col-span-12 lg:col-span-3 flex gap-3 lg:justify-end">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
```

### 9.3 Acceptance criteria
- [ ] One quote visible at a time, large italic display font
- [ ] Attribution (name + role mono) below quote
- [ ] Next/prev arrows cycle through 3 quotes with smooth fade-cross
- [ ] All quotes flagged `/* PLACEHOLDER */` in source for future replacement

### 9.4 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 9] testimonials carousel"
```

---

## Phase 10 — Insights grid (3 cards) (~30 min)

### 10.1 Files
- `src/components/InsightsSection.tsx` (create)

### 10.2 New file
```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import basketball from '@/assets/basketball.png';
import volleyball from '@/assets/volleyball.png';
import tennis from '@/assets/tennis.png';

interface Post {
  date: string;
  title: string;
  image: string;
}

/* PLACEHOLDER posts — replace with real blog entries when available */
const posts: Post[] = [
  {
    date: 'Apr 18, 2026',
    title: 'How we built P1’s vision pipeline on commodity hardware',
    image: basketball,
  },
  {
    date: 'Mar 12, 2026',
    title: 'What the Four Factors miss in high-school basketball',
    image: volleyball,
  },
  {
    date: 'Feb 02, 2026',
    title: 'Recruiter visibility 101 — a player’s checklist',
    image: tennis,
  },
];

const InsightsSection = () => {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="insights" className="relative bg-background py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-20 gap-8">
          <div>
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              Insights — 06
            </motion.span>
            <motion.h2
              className="font-display font-medium tracking-tight text-foreground mt-4"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.1 }}
            >
              Perspectives on data, sport, and player development.
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 group"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
              All articles
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background group-hover:bg-accent transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className="aspect-[3/2] overflow-hidden rounded-sm bg-secondary mb-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {p.date}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight mt-2 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
```

### 10.3 Acceptance criteria
- [ ] 3 cards in a row desktop, stacked mobile
- [ ] Each card: image (3:2) + date + title
- [ ] Hover card: image scales, title turns orange
- [ ] "All articles →" link top-right with circular arrow

### 10.4 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 10] insights grid"
```

---

## Phase 11 — Contact CTA (~25 min)

### 11.1 Files
- `src/components/ContactCTASection.tsx` (create)

### 11.2 New file
```tsx
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import heroBg from '@/assets/hero-bg.png';

const ContactCTASection = () => {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden text-background">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" aria-hidden className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/75 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-48 text-center">
        <motion.span
          className="font-mono text-xs uppercase tracking-widest text-background/70 block"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          Get in touch — 07
        </motion.span>
        <motion.h2
          className="font-display font-medium tracking-tight mt-6 mx-auto max-w-3xl"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.1 }}
        >
          For program partnerships, demos, or joining the team.
        </motion.h2>
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          <a
            href="mailto:johnny.y.fok@gmail.com,giuseppipelayo@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-accent-hover transition-colors"
          >
            Send an enquiry
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-mono text-xs uppercase tracking-widest hover:bg-background/80 transition-colors"
          >
            Book a demo
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;
```

In `tailwind.config.ts`, add to colors:
```ts
'accent-hover': 'hsl(15 100% 45%)',
```

### 11.3 Acceptance criteria
- [ ] Full-width section, blurred background image, dark overlay
- [ ] Centered headline + dual buttons
- [ ] Orange button "Send an enquiry" → mailto
- [ ] Cream button "Book a demo" → placeholder `#`

### 11.4 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 11] contact cta"
```

---

## Phase 12 — Footer rebuild (~30 min)

### 12.1 Files
- `src/components/Footer.tsx` (replace contents)

### 12.2 New file
```tsx
const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Stat tracking', href: '#projects' },
      { label: 'Player profiling', href: '#projects' },
      { label: 'Coach reports', href: '#projects' },
      { label: 'Clutch app', href: 'https://v0-clutch-web.vercel.app/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Process', href: '#process' },
      { label: 'Insights', href: '#insights' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Email — Johnny', href: 'mailto:johnny.y.fok@gmail.com' },
      { label: 'Email — Giuseppi', href: 'mailto:giuseppipelayo@gmail.com' },
      { label: 'GitHub', href: 'https://github.com/JohnFok119' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background pt-24 pb-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <span className="font-display text-5xl md:text-6xl font-medium tracking-tight">P1</span>
            <p className="mt-6 max-w-xs text-background/70 leading-relaxed">
              Telemetry pipelines for high-performance athletic programs.
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-background/60">
              Irvine, CA
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-background/60 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-background hover:text-accent transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 md:col-start-11">
            <h4 className="font-mono text-xs uppercase tracking-widest text-background/60 mb-4">
              Newsletter
            </h4>
            <p className="text-background/70 text-sm mb-3">
              Quarterly notes on player analytics.
            </p>
            <form className="flex gap-2 border-b border-background/30 pb-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent flex-1 outline-none text-background placeholder:text-background/40"
              />
              <button type="submit" className="text-background hover:text-accent transition-colors">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 font-mono text-xs uppercase tracking-widest text-background/50">
          <span>© 2026 P1. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Privacy</a>
            <a href="#" className="hover:text-background transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### 12.3 Acceptance criteria
- [ ] Footer has dark `--foreground` background, cream text
- [ ] 5-column grid: P1 brand block, Product, Company, Connect, Newsletter
- [ ] Newsletter input with arrow submit
- [ ] Bottom row: © 2026 + Privacy/Terms
- [ ] All links hover orange

### 12.4 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 12] footer"
```

---

## Phase 13 — Wire up `Index.tsx` (section ordering) (~15 min)

### 13.1 Files
- `src/pages/Index.tsx` (replace contents)

### 13.2 New file
```tsx
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ProcessSection from '@/components/ProcessSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import TeamSection from '@/components/TeamSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import InsightsSection from '@/components/InsightsSection';
import ContactCTASection from '@/components/ContactCTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ProcessSection />
      <ClientLogosSection />
      <TeamSection />
      <TestimonialsSection />
      <InsightsSection />
      <ContactCTASection />
      <Footer />
    </div>
  );
};

export default Index;
```

### 13.3 TeamSection treatment
Keep `TeamSection.tsx` as-is functionally but restyle minimally:
- Remove `bg-gradient-radial` div (purple) — replace with plain `bg-secondary`.
- Replace `font-display` italic accent text colors: `text-accent` orange is correct under new palette.
- Test card avatars still render. If purple-tinted gradients remain in card backgrounds, swap to `bg-background border border-foreground/10`.

### 13.4 Acceptance criteria
- [ ] Page renders all 10 sections in this order: Hero → About → Projects → Process → Clients → Team → Testimonials → Insights → ContactCTA → Footer
- [ ] No section has remnant dark theme / purple
- [ ] Smooth scroll between anchors works (Lenis)

### 13.5 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 13] wire up index page"
```

---

## Phase 14 — Polish pass (~45 min)

### 14.1 Reduced motion
In `src/lib/motion.ts`, export a hook:
```ts
import { useReducedMotion as useFmReduce } from 'framer-motion';
export const useReducedMotion = useFmReduce;
```
Most Framer Motion components respect this automatically; verify no animation runs when `prefers-reduced-motion: reduce` is set.

### 14.2 Focus states
In `src/index.css` `@layer base`:
```css
:focus-visible {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 2px;
}
```

### 14.3 Selection color
```css
::selection {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
```

### 14.4 Body weight + smoothing
Update body in `@layer base`:
```css
body {
  @apply bg-background text-foreground font-sans antialiased;
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 14.5 Fix existing components for new palette
Search and update purple/dark-themed classes in:
- `src/components/TeamMemberActivity.tsx` — change any `text-accent` / glow utilities to align with new palette (orange is fine; remove purple shadows)
- `src/components/NavLink.tsx` — verify hover states use `text-accent` correctly
- `src/components/ui/*` (shadcn) — most are token-driven so will adopt new palette automatically. Spot-check Button, Card, Dialog.

### 14.6 Image handling
- Add `loading="lazy"` to all `<img>` tags below the fold.
- Add `decoding="async"` to all images.
- Hero carousel uses `loading="eager"` on first slide.

### 14.7 Acceptance criteria
- [ ] Tab through page: every focusable element shows orange focus ring
- [ ] Selecting text highlights orange
- [ ] DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`: all motion stops, Lenis disabled, page is usable
- [ ] No purple/dark gradients survive in any component

### 14.8 Commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 14] polish + a11y"
```

---

## Phase 15 — Final verification (~30 min)

### 15.1 Build check
```bash
npm run build
```
Expected: exits 0, no TypeScript errors, no warnings about unused imports.

### 15.2 Lint check
```bash
npm run lint
```
Fix any lint errors introduced.

### 15.3 Manual QA checklist (in `npm run dev`)
Open `http://localhost:5173` and verify:

**First load**
- [ ] Loader shows, fills, fades out
- [ ] Hero carousel auto-rotates
- [ ] No console errors / warnings

**Visual fidelity vs https://www.thisisstudiox.com**
- [ ] Cream `#F2F0E6` background everywhere except: ContactCTA (dark overlay), Footer (dark)
- [ ] Orange `#FF4101` only in: hover states, mono numerals, primary buttons, accent links
- [ ] Inter Tight on all headlines (DevTools confirms)
- [ ] Hairline `1px` dividers, no thick borders
- [ ] Small radii (4–8 px), no large rounded cards

**Interactions**
- [ ] Hamburger menu: opens overlay, animates from top, all 6 items work, closes on item click
- [ ] Smooth scroll feels inertial on trackpad
- [ ] Hero drag advances slide
- [ ] Projects carousel prev/next buttons work + horizontal scroll-snap
- [ ] Process: click row → expands; click another → previous closes
- [ ] Testimonials: prev/next cycles 3 quotes
- [ ] Footer newsletter form does not submit anywhere (placeholder)

**Responsive**
- [ ] Resize to 375 × 812 (iPhone): all sections stack, no horizontal scroll
- [ ] Resize to 768 × 1024 (iPad): grids reduce to 2-col where appropriate
- [ ] Resize to 1440 × 900 (desktop): full layouts active

**Reduced motion**
- [ ] DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`
- [ ] Reload — Lenis disabled, no Framer animations run, page usable

**Accessibility**
- [ ] Tab order is logical (Nav → Hero → About → ... → Footer)
- [ ] Focus rings visible (orange)
- [ ] Hamburger menu trap-focused while open (acceptable to skip for v1; flag in POST_REVIEW)
- [ ] Lighthouse a11y score ≥ 90

### 15.4 Final commit
```bash
git add -A && git commit -m "[STUDIO-X PHASE 15] final verification + fixes"
```

---

## Phase 16 — Delta review (~15 min)

Create `collab/POST_REVIEW.md` listing any visible deltas vs https://www.thisisstudiox.com that you noticed but did not fully match. Examples to consider:
- Custom cursor (drag pill) — Studio X has this; we skipped (Phase 14 optional)
- Page transitions between routes — only relevant if we add multi-page routing
- Image art direction — Studio X uses bespoke interior photography; we use sport stock
- Testimonial real quotes — currently placeholders
- Newsletter form backend — currently no-op
- Process step real images — Studio X has one image per step; we currently show none in expanded detail

Commit: `git add -A && git commit -m "[STUDIO-X PHASE 16] delta review notes"`.

---

## Reference: file inventory after redesign

**Modified:**
- `package.json`
- `tailwind.config.ts`
- `src/index.css`
- `src/main.tsx`
- `src/pages/Index.tsx`
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/ProjectsSection.tsx`
- `src/components/TeamSection.tsx` (light touch)
- `src/components/Footer.tsx`

**Created:**
- `src/components/MenuOverlay.tsx`
- `src/components/HeroCarousel.tsx`
- `src/components/Loader.tsx`
- `src/components/ProcessSection.tsx`
- `src/components/ClientLogosSection.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/InsightsSection.tsx`
- `src/components/ContactCTASection.tsx`
- `src/lib/lenis.ts`
- `src/lib/motion.ts`
- `src/hooks/use-scroll-reveal.ts`

**Untouched (intentionally):**
- `src/components/ui/*` (shadcn — token-driven)
- `src/components/TeamMemberActivity.tsx` (style spot-check only)
- `src/components/NavLink.tsx`
- `src/hooks/use-in-view.ts` (kept for backward compat; new code uses `use-scroll-reveal`)

---

## Total estimated time

| Phase | Est. time |
|---|---|
| 0 Pre-flight | 10 min |
| 1 Theme | 25 min |
| 2 Lenis + motion | 30 min |
| 3 Navbar | 45 min |
| 4 Hero | 60 min |
| 5 About | 30 min |
| 6 Projects | 50 min |
| 7 Process | 60 min |
| 8 Clients | 25 min |
| 9 Testimonials | 40 min |
| 10 Insights | 30 min |
| 11 Contact CTA | 25 min |
| 12 Footer | 30 min |
| 13 Wire-up | 15 min |
| 14 Polish | 45 min |
| 15 Verify | 30 min |
| 16 Delta review | 15 min |
| **Total** | **~9 hours** |

---

## Hand-off rules for Cursor

1. Execute phases in order. Do **not** skip ahead.
2. After every phase, commit with the prescribed message and run `npm run dev` to spot-check.
3. If a step's instruction conflicts with existing code in a way the plan didn't predict, **stop and ask** before improvising. Do not invent visual decisions.
4. Reference https://www.thisisstudiox.com **constantly** — open in adjacent browser tab, scroll to the matching section while implementing.
5. Reference `./DESIGN_TOKENS.md` for any color, font, or motion value not spelled out in this file.
6. Do not introduce new dependencies beyond `framer-motion` and `lenis`.
7. Keep file sizes under 300 lines. Split helper components if needed.
8. Do not modify content of existing assets (PNGs/WebPs); only reuse them.
9. Mark every placeholder copy block with `/* PLACEHOLDER */` so it can be searched and replaced later.
