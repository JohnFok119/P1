import giuseppiImg from "@/assets/giuseppi.png";
import johnnyImg from "@/assets/johnny.png";
import { TeamMemberActivity } from "@/components/TeamMemberActivity";
import { useInView } from "@/hooks/use-in-view";
import { useRef, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  initial: string;
  bio: string;
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
    bio: "Giuseppi is a Full-Stack Software Engineer who loves turning complex concepts into shipping products. He currently leads the technical vision at JAGD, where he focuses on rapid prototyping, AI integration, and scalable backend architecture. With a Master's in Computer Science from UC Irvine, Giuseppi combines strong engineering fundamentals with a hands-on approach to building high-performance applications.",
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

const TeamSection = () => {
  const { ref: headerRef, isInView: headerVisible } =
    useInView<HTMLDivElement>();
  const { ref: cardsRef, isInView: cardsVisible } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const displayedMemberRef = useRef<TeamMember | null>(null);

  if (selectedMember) {
    displayedMemberRef.current = selectedMember;
  }

  const displayedMember = selectedMember ?? displayedMemberRef.current;
  const panelOpen = selectedMember !== null;

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(selectedMember?.name === member.name ? null : member);
  };

  const handlePanelTransitionEnd = () => {
    if (!selectedMember) {
      displayedMemberRef.current = null;
    }
  };

  const renderAvatar = (
    member: TeamMember,
    sizeClasses: string,
    textClasses: string,
  ) => {
    const hasImage =
      member.image &&
      member.image.trim().length > 0 &&
      !imageErrors[member.name];

    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center transition-all duration-500 shadow-inner relative`}
      >
        {hasImage ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={() =>
              setImageErrors((prev) => ({ ...prev, [member.name]: true }))
            }
          />
        ) : (
          <span
            className={`${textClasses} font-semibold text-accent select-none uppercase`}
          >
            {member.initial}
          </span>
        )}
      </div>
    );
  };

  return (
    <section
      id="team"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ── Section header ── */}
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
            <span className="italic font-normal text-accent">Founders</span>
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

        {/* ── Clickable profile cards ── */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <div
              key={member.name}
              onClick={() => handleMemberClick(member)}
              className={`group cursor-pointer bg-secondary border rounded-2xl overflow-hidden transition-[opacity,transform,border-color,box-shadow] duration-700 ease-out ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                selectedMember?.name === member.name
                  ? "border-accent shadow-lg shadow-accent/10"
                  : "border-border hover:border-accent/40"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [member.name]: true,
                    }))
                  }
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0) 60%)",
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-6 -mt-16 relative z-10">
                <span className="text-xs text-accent font-mono uppercase tracking-wider">
                  {member.role}
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                  {member.bio}
                </p>

                {/* Expand hint */}
                <div className="mt-4 text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                  <span
                    className={`inline-block transition-transform duration-300 ${
                      selectedMember?.name === member.name
                        ? "rotate-90"
                        : "rotate-0"
                    }`}
                  >
                    ▶
                  </span>
                  {selectedMember?.name === member.name
                    ? "Collapse"
                    : "View profile"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Expanded detail panel ── */}
        <div
          onTransitionEnd={handlePanelTransitionEnd}
          className={`mt-8 overflow-hidden transition-all duration-700 ease-out ${
            panelOpen ? "max-h-[1400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {displayedMember && (
            <div className="relative bg-secondary border border-border rounded-2xl p-8 md:p-12">
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors z-20"
              >
                <span className="text-xl">×</span>
              </button>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {/* Left column: avatar + activity */}
                <div className="flex flex-col items-center md:items-start">
                  {renderAvatar(
                    displayedMember,
                    "w-40 h-40 md:w-48 md:h-48 mx-auto mb-6",
                    "text-6xl md:text-7xl",
                  )}
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {displayedMember.name}
                    </h3>
                    <p className="text-accent font-mono text-sm mt-1">
                      {displayedMember.role}
                    </p>
                  </div>

                  {/* Activity graphs */}
                  <div className="w-full">
                    <TeamMemberActivity
                      github={displayedMember.github}
                      leetcode={displayedMember.leetcode}
                    />
                  </div>
                </div>

                {/* Right columns: bio + skills + education */}
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
                      About
                    </h4>
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      {displayedMember.bio}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {displayedMember.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 whitespace-nowrap"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
                        Education
                      </h4>
                      <div className="space-y-2">
                        {displayedMember.education.map((edu, j) => (
                          <p
                            key={j}
                            className="text-foreground/90 leading-snug"
                          >
                            {edu}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
