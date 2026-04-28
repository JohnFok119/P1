import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import basketball from "@/assets/basketball.webp";
import volleyball from "@/assets/volleyball.webp";
import tennis from "@/assets/tennis.webp";
import soccer from "@/assets/soccer.webp";
import clutchLogo from "@/assets/clutch_logo.webp";

interface Project {
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Automated Stat Tracking",
    category: "Computer Vision · Live",
    image: basketball,
  },
  {
    title: "Player Profiling Index",
    category: "Recruiting · Beta",
    image: volleyball,
  },
  {
    title: "Four-Factors Reporting",
    category: "Coaching · Live",
    image: tennis,
  },
  {
    title: "AI Vision Tracking",
    category: "Research · Internal",
    image: soccer,
  },
  {
    title: "Clutch Companion App",
    category: "Mobile · Live",
    image: clutchLogo,
  },
];

/**
 * Featured projects horizontal snap-carousel.
 *
 * Renders a row of project cards that scroll horizontally with CSS
 * `scroll-snap` and can be advanced 70% of the viewport at a time via the
 * top-right circular arrow buttons.
 */
const ProjectsSection = () => {
  const { ref: headerRef, inView: headerIn } = useScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1): void => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative bg-background py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          ref={headerRef}
          className="flex justify-between items-end mb-12 md:mb-20"
        >
          <div>
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
              variants={fadeUp}
              initial="hidden"
              animate={headerIn ? "show" : "hidden"}
            >
              Featured — 02
            </motion.span>
            <motion.h2
              className="font-display font-medium tracking-tight text-foreground mt-4"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
              variants={fadeUp}
              initial="hidden"
              animate={headerIn ? "show" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              Featured projects
            </motion.h2>
          </div>
          <motion.div
            className="hidden md:flex gap-3"
            variants={fadeUp}
            initial="hidden"
            animate={headerIn ? "show" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => scrollBy(-1)}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 md:px-12 lg:px-16 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            className="snap-start shrink-0 w-[80%] md:w-[45%] lg:w-[32%] group cursor-pointer"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight">
                  {p.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
                  {p.category}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 mt-2 text-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
