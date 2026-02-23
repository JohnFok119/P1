const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border/50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <span className="font-display text-3xl font-bold text-foreground">P1</span>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Building exceptional digital products with precision and care.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
              <div className="flex flex-col gap-3">
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#team" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Team</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@p1.studio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">© 2026 P1. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
