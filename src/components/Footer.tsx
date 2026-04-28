interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Stat tracking", href: "#projects" },
      { label: "Player profiling", href: "#projects" },
      { label: "Coach reports", href: "#projects" },
      { label: "Clutch app", href: "https://v0-clutch-web.vercel.app/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Insights", href: "#insights" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Email — Johnny", href: "mailto:johnny.y.fok@gmail.com" },
      { label: "Email — Giuseppi", href: "mailto:giuseppipelayo@gmail.com" },
      { label: "GitHub", href: "https://github.com/JohnFok119" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

/**
 * Page footer.
 *
 * 5-column dark footer (foreground bg, background text): a P1 brand block,
 * three navigation columns, and a newsletter capture column. The bottom row
 * carries the copyright + privacy/terms placeholders.
 */
const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background pt-24 pb-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <span className="font-display text-5xl md:text-6xl font-medium tracking-tight">
              P1
            </span>
            <p className="mt-6 max-w-xs text-background/70 leading-relaxed">
              Telemetry pipelines for high-performance athletic programs.
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-background/60">
              Irvine, CA
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-background/60 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-background hover:text-accent transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 md:col-start-11">
            <h4 className="font-mono text-xs uppercase tracking-widest text-background/60 mb-4">
              Newsletter
            </h4>
            <p className="text-background/70 text-sm mb-3">
              Quarterly notes on player analytics.
            </p>
            <form
              className="flex gap-2 border-b border-background/30 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email
              </label>
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Email"
                className="bg-transparent flex-1 outline-none text-background placeholder:text-background/40"
              />
              <button
                type="submit"
                className="text-background hover:text-accent transition-colors"
                aria-label="Subscribe to newsletter"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 font-mono text-xs uppercase tracking-widest text-background/50">
          <span>© 2026 P1. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
