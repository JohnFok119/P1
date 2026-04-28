# P1 — Design Tokens (Studio X-Inspired)

> Reference these tokens from `IMPLEMENTATION_PLAN.md`. Match exact values. Do not invent.

---

## 1. Color Palette

### Raw hex
| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--bg` | `#F2F0E6` | `48 26% 92%` | Page background, default surface |
| `--bg-deep` | `#EAE6D8` | `45 28% 88%` | Section dividers, sunken panels |
| `--ink` | `#1A1A1A` | `0 0% 10%` | Primary text, headlines |
| `--ink-soft` | `#3D3D3D` | `0 0% 24%` | Body copy, descriptions |
| `--ink-mute` | `#7A7670` | `35 5% 47%` | Captions, labels, placeholder |
| `--accent` | `#FF4101` | `15 100% 50%` | Hover, active, CTAs, numerals |
| `--accent-hover` | `#E63A00` | `15 100% 45%` | Pressed/hover state of orange |
| `--line` | `#1A1A1A` | `0 0% 10%` (10% alpha → `rgba(26,26,26,0.1)`) | Hairline dividers |
| `--surface` | `#FBFAF5` | `52 33% 97%` | Card/inset background |

### Apply to `src/index.css` `:root`
```css
:root {
  --background: 48 26% 92%;        /* #F2F0E6 */
  --foreground: 0 0% 10%;          /* #1A1A1A */
  --card: 52 33% 97%;              /* #FBFAF5 */
  --card-foreground: 0 0% 10%;
  --popover: 52 33% 97%;
  --popover-foreground: 0 0% 10%;
  --primary: 15 100% 50%;          /* #FF4101 */
  --primary-foreground: 0 0% 100%;
  --secondary: 45 28% 88%;         /* #EAE6D8 */
  --secondary-foreground: 0 0% 10%;
  --muted: 45 28% 88%;
  --muted-foreground: 35 5% 47%;
  --accent: 15 100% 50%;           /* #FF4101 */
  --accent-foreground: 0 0% 100%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 10% / 0.1;        /* hairline */
  --input: 0 0% 10% / 0.15;
  --ring: 15 100% 50%;
  --radius: 0.25rem;               /* Studio X uses very small radii */
}
```

### Remove
Delete from `index.css`:
- `--glow`, `--glow-muted`
- `.text-gradient`, `.glow-purple`, `.bg-gradient-radial` utilities (purple-themed)
- `.code-scanner`, `.vision-scan` keep but recolor to `hsl(var(--accent) / 0.5)`

---

## 2. Typography

### Fonts
- **Display** (headings, hero, large): `"Söhne", "Inter", system-ui, sans-serif` — Studio X uses Söhne but it's licensed; use **Inter Tight** as free near-equivalent.
- **Body** (paragraphs, UI): `"Inter", "Outfit", system-ui, sans-serif`
- **Mono** (numerals 01–09, labels): `"JetBrains Mono", "Geist Mono", monospace`

### Replace Google Fonts import in `src/index.css` line 1
```css
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Update `tailwind.config.ts` fontFamily
```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
},
```

### Type scale
| Role | Size (desktop) | Size (mobile) | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| Hero H1 | `clamp(4rem, 9vw, 8rem)` | `3.25rem` | 500 | `-0.04em` | 0.95 |
| Section H2 | `clamp(2.5rem, 5vw, 4.5rem)` | `2.25rem` | 500 | `-0.03em` | 1.0 |
| Featured statement | `clamp(2rem, 3.5vw, 3rem)` | `1.75rem` | 400 | `-0.02em` | 1.15 |
| H3 (card title) | `1.5rem` | `1.25rem` | 500 | `-0.01em` | 1.2 |
| Body large | `1.125rem` | `1rem` | 400 | `0` | 1.55 |
| Body | `1rem` | `0.95rem` | 400 | `0` | 1.6 |
| Caption / label | `0.75rem` | `0.75rem` | 500 | `0.08em` (uppercase) | 1.3 |
| Process numeral (01–09) | `clamp(3rem, 5vw, 5rem)` | `2.5rem` | 400 mono | `-0.02em` | 1 |

### Casing rules
- Headlines: sentence case (NOT all caps). Example: "We design intelligent telemetry for high-performance teams."
- Labels / nav / mono numerals: UPPERCASE.
- Italic emphasis used sparingly inside headings (e.g., one italic word).

---

## 3. Spacing & Layout

### Container
- Max width: `1440px` (`max-w-[1440px]` or `max-w-[90rem]`)
- Side padding: `clamp(1.5rem, 5vw, 4rem)` (`px-6 md:px-12 lg:px-16`)
- Vertical section padding: `py-24 md:py-32 lg:py-40`

### Grid
- 12-column on desktop, 4-column on mobile, gutter `1.5rem`
- Hero: full-bleed (no side padding); content inside container

### Border radius
- Default: `0.25rem` (4 px) — Studio X is sharp
- Cards: `0.5rem` (8 px)
- Pills (tags): `9999px` (full)
- Avatars: `9999px`

### Hairlines
- Use `1px solid hsl(var(--border))` for section dividers
- Never multi-pixel borders

---

## 4. Motion

### Easing (use across Framer Motion + CSS)
```ts
export const ease = {
  out: [0.16, 1, 0.3, 1],            // expo-out — primary reveal curve
  inOut: [0.65, 0, 0.35, 1],         // smooth cross-state
  spring: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 },
} as const;
```

### Durations
| Action | Duration |
|---|---|
| Text reveal (fade + 24px rise) | `0.9s` |
| Image reveal (scale 1.04 → 1) | `1.2s` |
| Hover color/transform | `0.25s` |
| Carousel slide change | `0.7s` |
| Menu overlay open | `0.6s` |
| Loader sweep | `1.5s` |
| Page transition | `0.8s` |

### Stagger
- Section heading words: `0.06s` per word
- Process step rows: `0.08s` per row
- Card grid items: `0.1s` per card

### Lenis config
```ts
new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  syncTouch: false,
});
```

---

## 5. Cursor states

Studio X swaps cursor on interactive elements:
- Default: native pointer
- Carousel hover: custom "DRAG →" pill (build with `pointer-events-none` div following `mousemove`)
- Link hover: small filled circle (orange, 8 px)
- Implementation: optional in Phase 14 — skip if time-constrained, native cursor acceptable.

---

## 6. Imagery

- **Format**: prefer AVIF/WebP; PNG fallback acceptable for existing assets
- **Aspect ratios used by Studio X**:
  - Hero slides: 16:9
  - Project cards: 4:3
  - Insights cards: 3:2
  - Testimonial portraits: 1:1
- **Color treatment**: full color, no overlay/grading. Slight `saturate(0.95)` filter optional for cohesion.
- **Loading**: `loading="lazy"` on all images below the fold; hero uses `loading="eager"` + `fetchpriority="high"`.

---

## 7. Accessibility floor

- Contrast: `#1A1A1A` on `#F2F0E6` = 14.5:1 ✓ AAA
- `#FF4101` on `#F2F0E6` = 3.4:1 — use only for accents, NEVER body text. For orange-on-cream text, switch to `#C73300` (`15 100% 39%`) which gives 5.1:1.
- All interactive elements have `:focus-visible` outline: `2px solid hsl(var(--accent))` offset `2px`.
- Reduced motion: wrap all Framer Motion + Lenis with `prefers-reduced-motion: reduce` check (disable Lenis, set Framer durations to 0).
