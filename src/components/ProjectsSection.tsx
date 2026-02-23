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

/** Projects/services section with a bento-grid layout and a CTA button. */
const ProjectsSection = () => {
  return (
    <section
      id="services"
      className="relative bg-background px-6 md:px-12 lg:px-16 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-sm text-accent font-mono uppercase tracking-wider">
            What we do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 max-w-3xl leading-tight tracking-tight text-balance">
            Our collection of tech services spans various needs at every stage
            of the transformation process.
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Automate Tasks */}
          <div className="bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <div
                  key={task.label}
                  className="flex items-center justify-between bg-background border border-border rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <task.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {task.label}
                    </span>
                  </div>
                  {task.done ? (
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
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

          {/* Card 2: Automated Workflows */}
          <div className="bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center">
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
                    className="absolute w-8 h-8 rounded-lg bg-background/50 border border-border flex items-center justify-center"
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

          {/* Card 3: Real-Time Intelligence */}
          <div className="bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-6 md:col-span-2 lg:col-span-1 lg:row-span-2">
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
                {searchItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2.5 border-t border-border"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                    <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
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

          {/* Card 4: Custom AI Agent Development */}
          <div className="bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-6 md:col-span-2 lg:col-span-2">
            <div className="flex-1">
              <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm overflow-x-auto">
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

        {/* CTA button */}
        <div className="mt-16 text-center">
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
