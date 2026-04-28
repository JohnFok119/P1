# P1 — Studio X Redesign Delta Review

> Companion to `IMPLEMENTATION_PLAN.md` and `DESIGN_TOKENS.md`. Captures known
> visual / functional gaps between the redesigned P1 site and the Studio X
> reference (`https://www.thisisstudiox.com`) at the time of hand-off.

---

## Visible deltas vs Studio X

### Custom drag cursor
- **Studio X** swaps the native cursor for a "DRAG ←→" pill on the hero carousel and project carousel.
- **P1** uses the native grab cursor + a static "Drag ← →" hint that fades in on hover.
- *Reason*: marked optional in Phase 14 of the plan; native cursor is acceptable for v1.

### Page transitions between routes
- **Studio X** uses Barba.js / GSAP page transitions when navigating between project detail pages.
- **P1** is single-route — no transitions needed today.
- *Reason*: Out of scope. Will be relevant only if/when project detail pages are added.

### Image art direction
- **Studio X** uses bespoke interior-design photography produced for each project.
- **P1** reuses the existing sport stock PNGs (`basketball.png`, `volleyball.png`, `tennis.png`, `soccer.png`) across the hero, projects, insights, and contact sections.
- *Reason*: Asset modifications were out of scope; fresh photography to be commissioned.

### Real testimonials
- All three quotes in `TestimonialsSection.tsx` are flagged with `/* PLACEHOLDER */` and use invented coach / AD names.
- Replace once real partner quotes are collected.

### Real insights / blog posts
- `InsightsSection.tsx` posts are flagged `/* PLACEHOLDER */` and link to `#`.
- "All articles" CTA also points to `#`. Wire to the blog index when content is ready.

### Newsletter form backend
- `Footer.tsx` newsletter form is `onSubmit={preventDefault}` — no submission target.
- Will need an integration (Mailchimp, Buttondown, custom API endpoint, etc.) before this is functional.

### Process step imagery
- **Studio X** displays a bespoke image inside each expanded process step.
- **P1** currently shows only the detail copy in the expanded panel.
- Add per-step photography / diagrams when the visual library is ready.

### Featured projects — case study pages
- **Studio X** project cards link to detailed case-study pages with hero, gallery, and write-up.
- **P1** cards are visual placeholders only (no `<a>` target). Add routes + detail pages when project content is written.

### Menu overlay focus trap
- The full-screen `MenuOverlay` does not currently trap keyboard focus while open.
- Acceptable for v1; flagged in Phase 15 for follow-up. Add a focus-trap (e.g., `focus-trap-react`) when accessibility audit happens.

### Non-`hero` slide drag on touch
- The hero carousel uses Framer Motion `drag="x"`. Drag-snap on touch / swipe on mobile works, but `dragSnapToOrigin` is not set, so the dragged slide may briefly drift before snapping. Visual only — does not affect navigation.

### Service detail pages
- The menu links "Services" and "Projects" both anchor to `#process` / `#projects` on the same page. Studio X has dedicated service pages.

---

## Deviations from the runbook (intentional)

These were agreed up-front with the user, not gaps:

1. **Branch**: stayed on `test/newfrontend` instead of creating `feature/studio-x-redesign` (Phase 0.3 skipped).
2. **Commits**: no per-phase commits. The user takes the working tree from this state and commits manually.
3. **TeamSection**: rebuilt in full Studio X language (single-open accordion + portrait cards + clean expansion panel) rather than the light restyle the plan prescribed. The plan's Phase 13.3 is superseded.
4. **Section numerals**: because Team is now a numbered section, downstream numerals shifted. Final ordering: About 01, Featured 02, Process 03, Trusted by 04, Team 05, Words from partners 06, Insights 07, Get in touch 08.

---

## Lint / build status at hand-off

- `npm run build` — exits 0, no TS errors.
- `npm run lint` — 3 errors, 7 warnings, **all pre-existing** in `src/components/ui/*` (shadcn) and `tailwind.config.ts` (`require()` plugin import). No errors introduced by this redesign.

---

## Suggested next-pass priorities

1. Replace placeholder testimonials and insights with real content.
2. Wire the newsletter form to a real subscription endpoint.
3. Source / shoot custom hero + project photography to replace the sport PNGs.
4. Add focus-trap to `MenuOverlay` for keyboard accessibility.
5. Add the custom drag-cursor pill (Phase 14 optional item).
6. Build out `/projects/<slug>` detail routes + transitions.
