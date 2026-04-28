import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ease } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Quote {
  text: string;
  name: string;
  role: string;
}

/* PLACEHOLDER quotes — replace with real testimonials when available */
const quotes: Quote[] = [
  {
    text: "P1 turned a season's worth of film into the kind of read-out I'd only ever seen at the next level. We adjusted our defensive scheme inside a week.",
    name: "Coach M. Avila",
    role: "Head Coach, Pacific Prep League",
  },
  {
    text: "Our recruiter inbox went from polite silence to active outreach. The standardized profiles meant scouts could compare players honestly.",
    name: "D. Tanaka",
    role: "Athletic Director, NorCal Hoops",
  },
  {
    text: "It removed the guesswork. We stopped arguing about lineups and started shipping wins.",
    name: "Coach R. Patel",
    role: "Assistant Coach, Coastal Athletic Conf.",
  },
];

/**
 * Testimonials carousel.
 *
 * Shows one quote at a time in large italic display type, with a name + role
 * footer. Prev/next circular arrow buttons cross-fade between quotes.
 */
const TestimonialsSection = () => {
  const [i, setI] = useState(0);
  const { ref, inView } = useScrollReveal();

  const next = (): void => setI((p) => (p + 1) % quotes.length);
  const prev = (): void =>
    setI((p) => (p - 1 + quotes.length) % quotes.length);
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
            Words from partners — 06
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
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                &ldquo;{q.text}&rdquo;
                <footer className="not-italic mt-8 font-sans">
                  <p className="text-base md:text-lg text-foreground font-medium">
                    {q.name}
                  </p>
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
