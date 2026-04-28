import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import basketball from "@/assets/basketball.webp";
import volleyball from "@/assets/volleyball.webp";
import tennis from "@/assets/tennis.webp";

interface Post {
  date: string;
  title: string;
  image: string;
}

/* PLACEHOLDER posts — replace with real blog entries when available */
const posts: Post[] = [
  {
    date: "Apr 18, 2026",
    title: "How we built P1's vision pipeline on commodity hardware",
    image: basketball,
  },
  {
    date: "Mar 12, 2026",
    title: "What the Four Factors miss in high-school basketball",
    image: volleyball,
  },
  {
    date: "Feb 02, 2026",
    title: "Recruiter visibility 101 — a player's checklist",
    image: tennis,
  },
];

/**
 * Insights / blog teasers — three cards with image, date, and title.
 *
 * Hover scales the image and turns the title orange. The "All articles" CTA
 * in the header has the same circular arrow treatment as the About section.
 */
const InsightsSection = () => {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="insights" className="relative bg-background py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-20 gap-8"
        >
          <div>
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground block"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              Insights — 07
            </motion.span>
            <motion.h2
              className="font-display font-medium tracking-tight text-foreground mt-4"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.75rem)" }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              Perspectives on data, sport, and player development.
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 group"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
              All articles
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background group-hover:bg-accent transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className="aspect-[3/2] overflow-hidden rounded-sm bg-secondary mb-4">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {p.date}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight mt-2 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
