import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { useInView } from "@/hooks/use-in-view";

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

const headlineWords = ["THINK.", "DEVELOP.", "TRANSFORM."];

/** About section with two-column headline + cascading images and process cards. */
const AboutSection = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView<HTMLDivElement>({
    threshold: 0.15,
  });
  const { ref: cardsRef, isInView: cardsVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      className="relative bg-background px-6 md:px-12 lg:px-16 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left content */}
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-foreground">
              {headlineWords.map((word, i) => (
                <span
                  key={word}
                  className={`italic block transition-all duration-700 ease-out ${
                    heroVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {word}
                </span>
              ))}
            </h2>
            <p
              className={`text-muted-foreground text-lg leading-relaxed max-w-md transition-all duration-700 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              We work with ambitious teams to uncover opportunities, refine
              operations, and drive sustainable success.
            </p>
            <a
              href="#team"
              className={`inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-all duration-700 ease-out group ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              About us
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Right cascading images (desktop) — staircase slide-in from right */}
          <div className="relative h-[500px] md:h-[600px] hidden md:block">
            {images.map((img, i) => (
              <div
                key={img.alt}
                className={`absolute rounded-lg overflow-hidden shadow-2xl transition-all duration-700 ease-out ${
                  heroVisible
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-20 scale-95"
                }`}
                style={{
                  width: "200px",
                  height: "160px",
                  top: `${i * 100}px`,
                  left: `${i * 80}px`,
                  zIndex: i + 1,
                  transitionDelay: `${200 + i * 150}ms`,
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
            {images.map((img, i) => (
              <div
                key={img.alt}
                className={`aspect-[4/3] relative rounded-lg overflow-hidden transition-all duration-700 ease-out ${
                  heroVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
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

        {/* Process cards row — staggered rise with bar-grow animation */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24"
        >
          {processCards.map((card, i) => (
            <div
              key={card.title}
              className={`bg-secondary border border-border rounded-lg p-6 flex flex-col gap-4 transition-all duration-700 ease-out ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: card.bars }).map((_, j) => (
                  <div
                    key={j}
                    className={`w-0.5 bg-accent rounded-full transition-all duration-500 ease-out origin-bottom ${
                      cardsVisible ? "h-4" : "h-0"
                    }`}
                    style={{
                      transitionDelay: `${i * 150 + 400 + j * 75}ms`,
                    }}
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
