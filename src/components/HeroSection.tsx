import { useState } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Loader } from "@/components/Loader";

const HERO_HEADLINE =
  "We build intelligent telemetry for high-performance athletic programs.";

/**
 * Above-the-fold hero: full-bleed image carousel + loader curtain + headline.
 *
 * Mounts a one-shot `Loader` curtain on first render that fades away to reveal
 * the rotating `HeroCarousel`. The headline is gated on the `loaded` state so
 * it animates up after the loader leaves.
 */
const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden text-background"
    >
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <HeroCarousel />

      <div className="relative z-10 flex flex-col justify-end h-screen px-6 md:px-12 lg:px-16 pb-24 md:pb-32 pointer-events-none">
        <motion.h1
          className="font-display font-medium tracking-tight leading-[0.95] text-background max-w-5xl"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
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
