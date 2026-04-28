import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import giuseppiImg from "@/assets/giuseppi.png";
import johnnyImg from "@/assets/johnny.webp";
import { fadeUp, imageReveal, ease } from "@/lib/motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  initial: string;
  bio: string;
  teaser: string;
  expertise: string[];
  education: string[];
  github: string;
  leetcode?: string;
}

const team: TeamMember[] = [
  {
    name: "Giuseppi Pelayo",
    role: "Founder & CEO",
    initial: "G",
    image: giuseppiImg,
    teaser: "Full-stack engineer turning complex concepts into shipping products.",
    bio: "Giuseppi is a Full-Stack Software Engineer who loves turning complex concepts into shipping products. As Founder & CEO of P1, he leads the technical vision — rapid prototyping, AI integration, and scalable backend architecture. With a Master's in Computer Science from UC Irvine, Giuseppi combines strong engineering fundamentals with a hands-on approach to building high-performance applications.",
    expertise: [
      "Full-Stack Engineering",
      "Mobile Development",
      "AI/LLM & API Integration",
      "Cloud Infrastructure",
      "C/C++",
      "Python",
      "Flask",
      "React",
      "Swift",
      "TypeScript/JavaScript",
      "Computer Vision",
      "Caffeine",
    ],
    education: [
      "Master of Computer Science — University of California, Irvine",
      "B.S., Computer Science — University of California, Riverside",
    ],
    github: "giuseppi",
    leetcode: "giuseppi",
  },
  {
    name: "Johnny Fok",
    role: "Co-Founder & CTO",
    initial: "J",
    image: johnnyImg,
    teaser: "Builds products and turns them into scalable, marketable solutions.",
    bio: "Johnny is a full-stack software engineer with a passion for building products and turning them into scalable, marketable solutions. He drives the rapid development of projects through his diverse experience in AI/ML, mobile development, and performance optimization.",
    expertise: [
      "Python (Flask)",
      "Swift",
      "C/C++",
      "Java",
      "SQLAlchemy",
      "LLM Integration/Training",
      "Performance Optimization",
      "AR/VR Development",
      "AWS",
      "Mobile Development",
      "Computer Vision",
    ],
    education: [
      "Master of Computer Science — University of California, Irvine",
      "B.S., Computer Science — California State Polytechnic University, Pomona",
    ],
    github: "JohnFok119",
    leetcode: "LupusOW",
  },
];

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Single team member card — portrait, role label, name, teaser, +/- toggle.
 *
 * Args:
 *     member: The team member to render.
 *     index: Position in the grid, used for staggered reveal delay.
 *     isOpen: Whether this card's expansion panel is currently open.
 *     onToggle: Click handler that flips this card's open state.
 */
function TeamMemberCard({
  member,
  index,
  isOpen,
  onToggle,
}: TeamMemberCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group text-left border-b border-foreground/10 pb-6"
      variants={imageReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary mb-6">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {member.role}
          </p>
          <h3
            className="font-display font-medium tracking-tight text-foreground mt-2 group-hover:text-accent transition-colors"
            style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)" }}
          >
            {member.name}
          </h3>
          <p className="text-foreground/70 mt-3 max-w-md leading-relaxed">
            {member.teaser}
          </p>
        </div>
        <span
          className="shrink-0 mt-2 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors"
          aria-hidden
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </div>
    </motion.button>
  );
}

interface TeamMemberPanelProps {
  member: TeamMember;
}

/**
 * Expanded detail panel — full bio, expertise pills, education list, charts.
 *
 * Args:
 *     member: The team member whose details are being shown.
 */
function TeamMemberPanel({ member }: TeamMemberPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12">
      <div className="lg:col-span-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          About
        </p>
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
          {member.bio}
        </p>
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Education
          </p>
          <ul className="space-y-2">
            {member.education.map((edu) => (
              <li key={edu} className="text-foreground/90 leading-snug">
                {edu}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-7 lg:self-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Expertise
        </p>
        <div className="flex flex-wrap gap-2">
          {member.expertise.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full bg-secondary text-foreground text-sm border border-foreground/10 whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Team section.
 *
 * Studio X-style layout: mono numeral label, sentence-case display headline,
 * a 2-col grid of clickable member cards, and a single-open inline expansion
 * panel below revealing the active member's bio, skills, education, and
 * GitHub/LeetCode activity charts.
 */
const TeamSection = () => {
  const [openName, setOpenName] = useState<string | null>(null);
  const { ref, inView } = useScrollReveal();

  const handleToggle = (name: string): void => {
    setOpenName((current) => (current === name ? null : name));
  };

  const openMember = team.find((m) => m.name === openName) ?? null;

  return (
    <section
      id="team"
      ref={ref}
      className="relative bg-background py-24 md:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <motion.span
            className="lg:col-span-12 font-mono text-xs uppercase tracking-widest text-muted-foreground block"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            Team — 04
          </motion.span>
          <motion.h2
            className="lg:col-span-9 font-display font-medium tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.75rem)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: 0.1 }}
          >
            The people building P1.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {team.map((member, i) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={i}
              isOpen={openName === member.name}
              onToggle={() => handleToggle(member.name)}
            />
          ))}
        </div>

        <AnimatePresence initial={false}>
          {openMember && (
            <motion.div
              key={openMember.name}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden border-t border-foreground/10 mt-8"
            >
              <TeamMemberPanel member={openMember} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TeamSection;
