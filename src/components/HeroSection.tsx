import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="P1 team working"
          className="w-full h-full object-cover opacity-50 object-[center_1%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1
          className="font-display text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tighter leading-none text-foreground animate-fade-in-up"
        >
          P1
        </h1>
        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Building the future, one project at a time.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
