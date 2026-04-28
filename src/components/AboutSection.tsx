import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, imageReveal } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import basketball from "@/assets/basketball.webp";

const HEADLINE =
  "We build the platforms that prove what every athlete can do — independent of where they play, who scouts them, or what their family can afford.";

const PULL_QUOTE =
  "Talent is everywhere. Recognition isn't. We're closing that gap.";

const BODY: readonly string[] = [
  "Every kid playing the game leaves something behind — a moment, a stat, a streak nobody wrote down. P1 builds the platforms that finally capture all of it. Not for the recruited few, but for every athlete who shows up, every coach who develops them, and every family quietly hoping it adds up to something.",
  "We're starting where it's hardest — the gym down the block, the pickup game, the recreational league — because if it works there, it works everywhere. From there the data becomes a portfolio. A record of what a player actually does on the court, independent of geography or program access. We're building toward a future where every athlete is seen on merit.",
];

/**
 * About statement section.
 *
 * Two-column layout: bold sentence-case headline on the left, large portrait
 * image on the right. An indented italic pull-quote sits between, followed by
 * body paragraphs and a circular-arrow "Learn more" CTA pinned bottom-right.
 */
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
          animate={inView ? "show" : "hidden"}
        >
          About — 01
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.h2
            className="lg:col-span-7 font-display font-medium tracking-tight leading-[1.05] text-foreground"
            style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.1 }}
          >
            {HEADLINE}
          </motion.h2>

          <motion.div
            className="lg:col-span-5 aspect-[4/5] overflow-hidden rounded-sm"
            variants={imageReveal}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <img
              src={basketball}
              alt="Player on court"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-24">
          <motion.blockquote
            className="lg:col-span-7 lg:col-start-3 font-display italic font-light text-foreground leading-snug"
            style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            &ldquo;{PULL_QUOTE}&rdquo;
          </motion.blockquote>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-24">
          <motion.div
            className="lg:col-span-6 lg:col-start-7 space-y-6"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            {BODY.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg text-foreground/80 leading-relaxed"
              >
                {paragraph}
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
