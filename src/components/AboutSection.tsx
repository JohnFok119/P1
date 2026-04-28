import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, imageReveal } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import basketball from "@/assets/basketball.png";

const HEADLINE =
  "We deliver telemetry pipelines that shape player development and directly improve the win rate of the programs we partner with.";

const PULL_QUOTE =
  "We build systems where measurement and performance are inseparable.";

const BODY: readonly string[] = [
  "P1 equips high-school and collegiate programs with professional-grade statistical telemetry — the same caliber of data NBA front offices rely on.",
  "Our pipelines run on standard match footage. No wearables, no manual stat-keeping, no extra coaching staff. Coaches get the metrics that matter; players get the visibility that recruiters look for.",
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
