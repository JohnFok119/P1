import { Linkedin, Twitter } from "lucide-react";
import giuseppiImg from "@/assets/giuseppi.png";
import johnnyImg from "@/assets/johnny.png";
import { useInView } from "@/hooks/use-in-view";

/** Team member data for the founders section. */
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    name: "Giuseppi Pelayo",
    role: "Founder & CEO",
    image: giuseppiImg,
    bio: "Visionary strategist with a decade of experience in brand development, marketing consulting, and performance analytics. Giuseppi founded P1 to bridge the gap between strategy and execution for ambitious teams.",
  },
  {
    name: "Johnny Fok",
    role: "Co-Founder & CTO",
    image: johnnyImg,
    bio: "Technical architect and automation expert specializing in AI agent development, workflow optimization, and real-time intelligence systems. Johnny drives the technology vision at P1.",
  },
];

/** Founders/team section with profile cards (image, role, name, bio, social links). */
const TeamSection = () => {
  const { ref: headerRef, isInView: headerVisible } =
    useInView<HTMLDivElement>();
  const { ref: cardsRef, isInView: cardsVisible } =
    useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="team"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className={`text-sm text-accent font-mono uppercase tracking-wider block transition-[opacity,transform] duration-700 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Our Team
          </span>
          <h2
            className={`font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mt-4 transition-[opacity,transform] duration-700 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Meet the{" "}
            <span className="italic font-normal text-gradient">Founders</span>
          </h2>
          <p
            className={`text-muted-foreground mt-4 max-w-lg mx-auto text-lg transition-[opacity,transform] duration-700 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            The people behind P1, driving strategy and innovation for businesses
            worldwide.
          </p>
        </div>

        {/* Team cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group bg-secondary border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-[opacity,transform,border-color] duration-700 ease-out ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6 -mt-16 relative z-10">
                <span className="text-xs text-accent font-mono uppercase tracking-wider">
                  {member.role}
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {member.bio}
                </p>

                {/* Social links */}
                <div className="flex gap-3 mt-4">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
                    aria-label={`${member.name} on X`}
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
