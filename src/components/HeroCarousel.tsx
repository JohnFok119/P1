import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";
import basketball from "@/assets/basketball.webp";
import volleyball from "@/assets/volleyball.webp";
import tennis from "@/assets/tennis.webp";
import soccer from "@/assets/soccer.webp";

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: basketball, alt: "Basketball action shot" },
  { src: volleyball, alt: "Volleyball action shot" },
  { src: tennis, alt: "Tennis action shot" },
  { src: soccer, alt: "Soccer action shot" },
];

const AUTOPLAY_MS = 5000;
const DRAG_THRESHOLD_PX = 80;

/**
 * Full-bleed cross-fading hero carousel with drag advance.
 *
 * Auto-rotates through `slides` every `AUTOPLAY_MS`, pausing while the cursor
 * is over the surface. Horizontal drag past `DRAG_THRESHOLD_PX` advances or
 * rewinds the slide. A hairline indicator strip and a "Drag ← →" mono hint
 * layer over the imagery.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(t);
  }, [hovering]);

  return (
    <div
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={slides[index].src}
          alt={slides[index].alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -DRAG_THRESHOLD_PX) {
              setIndex((i) => (i + 1) % slides.length);
            } else if (info.offset.x > DRAG_THRESHOLD_PX) {
              setIndex((i) => (i - 1 + slides.length) % slides.length);
            }
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-foreground/30 pointer-events-none" />

      <motion.div
        className="absolute bottom-8 right-8 font-mono text-xs uppercase tracking-widest text-background pointer-events-none"
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Drag ← →
      </motion.div>

      <div className="absolute bottom-8 left-8 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-px w-8 transition-colors ${
              i === index ? "bg-background" : "bg-background/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
