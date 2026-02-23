const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-background/80 backdrop-blur-lg border-b border-border/30">
      <a href="#" className="font-display text-2xl font-bold tracking-tight text-foreground">
        P1
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
        <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</a>
        <a href="#team" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Team</a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
