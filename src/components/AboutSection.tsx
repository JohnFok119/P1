import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

/** Placeholder images for the cascading gallery — swap with real assets later. */
const images: { src: string; alt: string }[] = [
  { src: heroBg, alt: "Team collaboration in modern office" },
  { src: heroBg, alt: "Motion and innovation" },
  { src: heroBg, alt: "Focused work environment" },
  { src: heroBg, alt: "Bold direction forward" },
];

/** Process step card data. */
interface ProcessCard {
  title: string;
  description: string;
  bars: number;
}

const processCards: ProcessCard[] = [
  {
    title: "Discover",
    description:
      "We start by understanding your goals, challenges, and market landscape.",
    bars: 3,
  },
  {
    title: "Strategize",
    description:
      "Our experts craft a focused plan that aligns with your objectives.",
    bars: 4,
  },
  {
    title: "Execute",
    description:
      "We implement strategies efficiently to deliver measurable growth results.",
    bars: 3,
  },
  {
    title: "Evolve",
    description:
      "We track performance and refine continuously for lasting success.",
    bars: 4,
  },
];

/** About section with two-column headline + cascading images and process cards. */
const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative bg-background px-6 md:px-12 lg:px-16 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left content */}
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-foreground">
              <span className="italic">THINK.</span>
              <br />
              <span className="italic">DEVELOP.</span>
              <br />
              <span className="italic">TRANSFORM.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              We work with ambitious teams to uncover opportunities, refine
              operations, and drive sustainable success.
            </p>
            <a
              href="#team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors group"
            >
              About us
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Right cascading images (desktop) */}
          <div className="relative h-[500px] md:h-[600px] hidden md:block">
            {images.map((img, i) => (
              <div
                key={img.alt}
                className="absolute rounded-lg overflow-hidden shadow-2xl"
                style={{
                  width: "200px",
                  height: "160px",
                  top: `${i * 100}px`,
                  left: `${i * 80}px`,
                  zIndex: i + 1,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Mobile image grid */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {images.map((img) => (
              <div
                key={img.alt}
                className="aspect-[4/3] relative rounded-lg overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Process cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
          {processCards.map((card) => (
            <div
              key={card.title}
              className="bg-secondary border border-border rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: card.bars }).map((_, j) => (
                  <div
                    key={j}
                    className="w-0.5 h-4 bg-accent rounded-full"
                  />
                ))}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
