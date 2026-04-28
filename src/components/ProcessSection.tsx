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
    title: "Computer vision foundation",
    summary:
      "Real-time, on-device. YOLO-based detection running at full frame rate on iPhone.",
    detail:
      "We trained and deployed a YOLO-based detection stack that runs on-device at full frame rate. No streaming, no servers in the inference loop. The phone is the entire pipeline — ball, hoop, players, and plays detected in real time. That's the foundation everything else sits on.",
  },
  {
    num: "02",
    title: "Skill model",
    summary:
      "Glicko-2 with custom modifiers across game modes from 1v1 to 5v5.",
    detail:
      "Built on Glicko-2 with custom modifiers for points, assists, and game-mode dynamics across 1v1 to 5v5. Designed so a player's rating reflects what they actually do — not who they happen to play with. Placement matches and seasonal soft resets keep the ladder honest as the population grows.",
  },
  {
    num: "03",
    title: "Iteration loop",
    summary: "Beta users sharpen the model with every game logged.",
    detail:
      "We're our own first beta testers, joined by a small group of early users. Every game logged sharpens the model and the product. The system gets better in proportion to the players using it — and we're building the next layer in front of every release.",
  },
];

const HEADLINE = "Three layers, built end-to-end.";

/**
 * "How we build" section — 3 numbered layers with single-open inline expansion.
 *
 * Clicking a row reveals its detail copy in a smoothly height-tweened panel.
 * Only one layer can be open at a time; clicking the open row closes it.
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
            How we build — 03
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
