import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroBg from "@/assets/hero-bg.png";

/**
 * Closing call-to-action section.
 *
 * Full-bleed dark-overlaid hero image with a centered headline and two
 * stacked-on-mobile / side-by-side-on-desktop buttons: orange "Send an
 * enquiry" mailto and a cream "Book a demo" placeholder anchor.
 */
const ContactCTASection = () => {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden text-background"
    >
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-foreground/75 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-48 text-center">
        <motion.span
          className="font-mono text-xs uppercase tracking-widest text-background/70 block"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          Get in touch — 05
        </motion.span>
        <motion.h2
          className="font-display font-medium tracking-tight mt-6 mx-auto max-w-3xl"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          Investors, coaches, parents, and the people who want to build this with us.
        </motion.h2>
        <motion.p
          className="mt-6 mx-auto max-w-xl text-background/70 text-base md:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          We're early. Reach out.
        </motion.p>
        <motion.div
          className="mt-12 flex justify-center"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          <a
            href="mailto:johnny.y.fok@gmail.com,giuseppipelayo@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-accent-hover transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;
