import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, ease } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Step {
  num: string;
  title: string;
  summary: string;
  detail: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Discovery",
    summary: "We meet your coaching staff and audit current data workflows.",
    detail:
      "We sit with head coaches, assistants, and program leadership to map the questions you actually need answered. We audit current scouting workflows, manual stat sheets, video review cadence, and recruiting touchpoints — so the system we deliver replaces friction, not adds to it.",
  },
  {
    num: "02",
    title: "Calibration",
    summary: "Camera setup, court calibration, athlete enrollment.",
    detail:
      "A one-time calibration locks our vision pipeline to your venue. We register court geometry, jersey rosters, and lighting profiles. Athletes are enrolled into the system in under 5 minutes per roster.",
  },
  {
    num: "03",
    title: "Recording",
    summary: "Capture games and practices using standard cameras.",
    detail:
      "No proprietary hardware. P1 ingests footage from any 1080p camera mounted at midcourt. Coaches record like they always have — we handle the rest.",
  },
  {
    num: "04",
    title: "Ingestion",
    summary: "Upload triggers our automated processing pipeline.",
    detail:
      "Drag-and-drop upload to the P1 dashboard. Within minutes, our pipeline normalizes the footage, runs detection, tracks every player and the ball, and flags possessions automatically.",
  },
  {
    num: "05",
    title: "AI Analysis",
    summary: "Computer vision extracts every shot, pass, and movement.",
    detail:
      "Our proprietary models extract granular events — shot location, defender distance, possession outcome, transition speed. Every event is timestamped and searchable.",
  },
  {
    num: "06",
    title: "Visualization",
    summary: "Coaches see heatmaps, four-factors, and lineup matrices.",
    detail:
      "Outputs land in the coach dashboard: shot heatmaps, four-factor splits, lineup ± , player efficiency ratings. Every chart drills down to the underlying clip.",
  },
  {
    num: "07",
    title: "Coach Review",
    summary: "Weekly insight reports tailored to your gameplan.",
    detail:
      "We don't just hand over data. P1 generates a weekly insight brief — what changed, what's working, what to address — so the staff acts on findings instead of mining them.",
  },
  {
    num: "08",
    title: "Recruiter Visibility",
    summary: "Player profiles published to a national recruiter network.",
    detail:
      "Standardized player profiles — efficiency, role-fit, growth trajectory — surface to a network of recruiters at the next level. Visibility scales without your staff lifting a finger.",
  },
  {
    num: "09",
    title: "Iteration",
    summary: "Quarterly retros tighten the loop.",
    detail:
      "Every quarter we review usage with your staff, retire metrics nobody touches, and add the ones the season actually surfaced. The system improves alongside the program.",
  },
];

const HEADLINE =
  "Our work follows a clear pipeline, so creativity sits alongside statistical and operational rigor.";

/**
 * Process section — 9 numbered steps with single-open inline expansion.
 *
 * Clicking a row reveals its detail copy in a smoothly height-tweened panel.
 * Only one step can be open at a time; clicking the open row closes it.
 */
const ProcessSection = () => {
  const [open, setOpen] = useState<string | null>(null);
  const { ref, inView } = useScrollReveal();

  return (
    <section id="process" className="relative bg-background py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24"
        >
          <motion.span
            className="lg:col-span-12 font-mono text-xs uppercase tracking-widest text-muted-foreground block"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            Process — 03
          </motion.span>
          <motion.h2
            className="lg:col-span-9 font-display font-medium tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.75rem)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
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
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
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
                      animate={{ height: "auto", opacity: 1 }}
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
