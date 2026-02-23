import {
  CheckCircle2,
  RefreshCw,
  Search,
  Code2,
  Mail,
  Users,
  CreditCard,
  BarChart3,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

/** Task item for the "Automate Tasks" card mockup. */
interface TaskItem {
  icon: LucideIcon;
  label: string;
  done: boolean;
}

const tasks: TaskItem[] = [
  { icon: Mail, label: "Social media post", done: true },
  { icon: Users, label: "Employee Tracking", done: false },
  { icon: CreditCard, label: "Payment reminder", done: true },
  { icon: BarChart3, label: "Cost Management", done: false },
];

const searchItems = [
  "Software & App Industry",
  "UX & UI Design Industry",
  "High Converting Customer",
];

/** Shared entrance + hover classes for every bento card. */
const cardBase =
  "bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20";

function entranceCls(visible: boolean) {
  return visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-12";
}

/** Projects/services section with a bento-grid layout and a CTA button. */
const ProjectsSection = () => {
  const { ref: headerRef, isInView: headerVisible } =
    useInView<HTMLDivElement>();
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="services"
      className="relative bg-background px-6 md:px-12 lg:px-16 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-16">
          <span
            className={`text-sm text-accent font-mono uppercase tracking-wider block transition-all duration-700 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            What we do
          </span>
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground mt-4 max-w-3xl leading-tight tracking-tight text-balance transition-all duration-700 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Our collection of tech services spans various needs at every stage
            of the transformation process.
          </h2>
        </div>

        {/* ── Bento grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* ── Card 1: Automate Tasks ── */}
          <div
            className={`${cardBase} ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="flex flex-col gap-2">
              {tasks.map((task, idx) => (
                <div
                  key={task.label}
                  className={`flex items-center justify-between bg-background border border-border rounded-lg px-4 py-3 transition-all duration-500 ease-out ${
                    gridVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <task.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {task.label}
                    </span>
                  </div>
                  {task.done ? (
                    <CheckCircle2
                      className={`w-4 h-4 text-accent ${gridVisible ? "animate-pulse-glow" : ""}`}
                    />
                  ) : (
                    <RefreshCw
                      className={`w-4 h-4 text-muted-foreground ${gridVisible ? "animate-spin-slow" : ""}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Automate Repetitive Tasks
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                We help you streamline internal operations by automating manual
                workflows
              </p>
            </div>
          </div>

          {/* ── Card 2: Automated Workflows ── */}
          <div
            className={`${cardBase} ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center ${gridVisible ? "animate-gentle-pulse" : ""}`}
                >
                  <Sparkles className="w-8 h-8 text-foreground" />
                </div>
                {[
                  { top: "-20px", left: "-40px" },
                  { top: "-20px", right: "-40px" },
                  { bottom: "-20px", left: "-30px" },
                  { bottom: "-20px", right: "-30px" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute w-8 h-8 rounded-lg bg-background/50 border border-border flex items-center justify-center ${
                      gridVisible
                        ? i % 2 === 0
                          ? "animate-float"
                          : "animate-float-delayed"
                        : ""
                    }`}
                    style={pos as React.CSSProperties}
                  >
                    <div className="w-3 h-3 rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Automated Workflows
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Boost efficiency across teams with smart automation. Build
                intelligent workflows that automate multi-step processes across
                tools and platforms.
              </p>
            </div>
          </div>

          {/* ── Card 3: Real-Time Intelligence ── */}
          <div
            className={`${cardBase} md:col-span-2 lg:col-span-1 lg:row-span-2 ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Research anything...
                    </span>
                  </div>
                  <button className="bg-accent text-accent-foreground rounded-lg px-4 py-2 text-sm font-medium">
                    Research
                  </button>
                </div>
                {searchItems.map((item, idx) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between py-2.5 border-t border-border ${gridVisible ? "animate-shimmer" : ""}`}
                    style={
                      {
                        "--shimmer-delay": `${idx * 0.5}s`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                    <span
                      className={`inline-flex ${gridVisible ? "animate-float" : ""}`}
                      style={{ animationDelay: `${idx * 0.4}s` }}
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Real-Time Intelligence
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Make smarter decisions with live data and real-time analytics
                powered by our cutting-edge platform.
              </p>
            </div>
          </div>

          {/* ── Card 4: Custom AI Agent Development ── */}
          <div
            className={`${cardBase} md:col-span-2 lg:col-span-2 ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="flex-1">
              <div
                className={`bg-background border border-border rounded-xl p-4 font-mono text-sm overflow-x-auto ${gridVisible ? "code-scanner" : ""}`}
              >
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">|</span>
                  <span className="bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    {"Code </>"}
                  </span>
                </div>
                <pre className="text-muted-foreground">
                  <code>
                    <span className="text-foreground">{"class "}</span>
                    <span className="text-accent">AutomationAgent</span>
                    <span className="text-foreground">{":"}</span>
                    {"\n"}
                    {"  def "}
                    <span className="text-foreground">__init__</span>
                    {"(self, activation_limit):"}
                    {"\n"}
                    {"    self.activation_limit ="}
                    {"\n"}
                    {"      activation_limit"}
                    {"\n"}
                    {'    self.current_mode = "idle"'}
                    {"\n\n"}
                    {"  def "}
                    <span className="text-foreground">evaluate_task</span>
                    {"(self, workload_value):"}
                    <span
                      className={`inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle ${gridVisible ? "animate-blink-cursor" : ""}`}
                    />
                  </code>
                </pre>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Custom AI Agent Development
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                We develop custom AI agents that integrate seamlessly with your
                tools and automate complex business logic.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA button ── */}
        <div
          className={`mt-16 text-center transition-all duration-700 ease-out ${
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
          >
            Learn More About Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
