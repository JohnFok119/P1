import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const partners: readonly string[] = [
  "UC Irvine",
  "UC Riverside",
  "Cal Poly Pomona",
  "AAU West Coast",
  "Pacific Prep League",
  "Coastal Athletic Conf.",
  "NorCal Hoops",
  "Inland Empire HS",
];

/**
 * Trusted-by section with an infinite horizontal marquee of partner wordmarks.
 *
 * The marquee is built by duplicating the partner list and translating the row
 * by `-50%` over 40s, producing a seamless loop. Hover lifts a wordmark from
 * 40% to 100% opacity.
 */
const ClientLogosSection = () => {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="clients"
      className="relative bg-secondary py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="mb-12">
          <motion.span
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            Trusted by — 04
          </motion.span>
          <motion.h2
            className="font-display font-medium text-foreground mt-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.1 }}
          >
            Programs and partners
          </motion.h2>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-12 md:gap-20 animate-marquee whitespace-nowrap w-max">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
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
