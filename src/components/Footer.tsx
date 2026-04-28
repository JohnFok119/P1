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
      { label: "Clutch", href: "https://v0-clutch-web.vercel.app/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Horizon", href: "#projects" },
      { label: "How we build", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Email — Johnny", href: "mailto:johnny.y.fok@gmail.com" },
      { label: "Email — Giuseppi", href: "mailto:giuseppipelayo@gmail.com" },
    ],
  },
];

/**
 * Page footer.
 *
 * Dark footer (foreground bg, background text): a P1 brand block plus three
 * navigation columns. The bottom row carries the copyright + privacy/terms
 * placeholders.
 */
const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background pt-24 pb-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-6">
            <span className="font-display text-5xl md:text-6xl font-medium tracking-tight">
              P1
            </span>
            <p className="mt-6 max-w-xs text-background/70 leading-relaxed">
              Talent is everywhere. We build the platforms.
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
