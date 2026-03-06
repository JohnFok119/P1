import {
  CheckCircle2,
  RefreshCw,
  Search,
  Eye,
  Mail,
  Users,
  CreditCard,
  BarChart3,
  Sparkles,
  Info,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import clutchLogo from "@/assets/clutch_logo.webp";

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

/** Static shot coordinates for the heatmap (SVG viewBox 0 0 500 470). */
const shotData: { x: number; y: number; made: boolean }[] = [
  { x: 250, y: 400, made: true },
  { x: 260, y: 415, made: true },
  { x: 235, y: 388, made: true },
  { x: 100, y: 395, made: true },
  { x: 400, y: 400, made: true },
  { x: 280, y: 200, made: true },
  { x: 250, y: 120, made: true },
  { x: 220, y: 350, made: false },
  { x: 290, y: 360, made: false },
  { x: 150, y: 250, made: false },
  { x: 350, y: 248, made: false },
  { x: 250, y: 178, made: false },
];

/** Four Factors comparison rows. */
const fourFactors: {
  metric: string;
  teamA: string;
  teamB: string;
  diff: string;
  positive: boolean;
}[] = [
  { metric: "PPP", teamA: "1.08", teamB: "0.95", diff: "+0.13", positive: true },
  { metric: "+/-", teamA: "+4", teamB: "-4", diff: "+8", positive: true },
  { metric: "eFG%", teamA: "54.2%", teamB: "48.1%", diff: "+6.1%", positive: true },
  { metric: "TO%", teamA: "12%", teamB: "15%", diff: "-3%", positive: true },
  { metric: "ORB%", teamA: "28%", teamB: "32%", diff: "-4%", positive: false },
  { metric: "FTR", teamA: ".35", teamB: ".28", diff: "+.07", positive: true },
];

/** Clutch app URL — update to your live app link. */
const CLUTCH_APP_URL = "https://v0-clutch-web.vercel.app/";

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
            Professional Grade Analytics designed for every stage of Player Evaluation and Team Development to increase Visibility for Recruiters.
          </h2>
        </div>

        {/* ── Bento grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* ── Card 1: Automate Stat Tracking ── */}
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
                Automated Stat Tracking
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                We eliminate manual stat keeping by automatically logging every shot, assist, and rebound directly from your match footage.
              </p>
            </div>
          </div>

          {/* ── Card 2: Advanced Player Profiling ── */}
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
                Advanced Player Profiling
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Evaluate talent with objective data. We generate standardized efficiency ratings and spatial heatmaps to showcase player value to national recruiters.
              </p>
            </div>
          </div>

          {/* ── Card 3: Objective Performance Insights ── */}
          <div
            className={`${cardBase} md:col-span-2 lg:col-span-1 lg:row-span-2 ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* Shot distribution heatmap */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                Shot Distribution
              </h4>
              <div className="relative bg-background border border-border rounded-xl overflow-hidden flex items-center justify-center">
                <svg
                  className="w-full text-muted-foreground/40"
                  viewBox="0 0 500 470"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ maxHeight: 200 }}
                >
                  <rect width="500" height="470" fill="hsl(var(--background))" />
                  {/* Baseline & center line */}
                  <path d="M250,470 L250,420" stroke="currentColor" strokeWidth="2" fill="none" />
                  {/* Rim */}
                  <circle cx="250" cy="420" r="7.5" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
                  {/* Key / paint */}
                  <path d="M220,470 V380 H280 V470" stroke="currentColor" strokeWidth="2" fill="none" />
                  {/* Free-throw circle */}
                  <circle cx="250" cy="380" r="60" stroke="currentColor" strokeWidth="2" fill="none" />
                  {/* Three-point arc */}
                  <path d="M30,470 V140 Q250,80 470,140 V470" stroke="currentColor" strokeWidth="2" fill="none" />
                  {/* Restricted area (dashed) */}
                  <path d="M170,470 V380 H330 V470" stroke="currentColor" strokeWidth="1" strokeDasharray="4" fill="none" />
                  {/* Paint zone highlight */}
                  <path d="M220,470 V380 H280 V470" fill="hsl(var(--accent))" opacity="0.08" />
                  {/* Shot dots */}
                  {shotData.map((s, i) => (
                    <circle
                      key={i}
                      cx={s.x}
                      cy={s.y}
                      r="6"
                      fill={s.made ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                      opacity={0.85}
                    />
                  ))}
                </svg>
                {/* Legend */}
                <div className="absolute bottom-2 right-2 bg-secondary/90 backdrop-blur px-2.5 py-1.5 rounded-lg border border-border text-[10px] text-muted-foreground flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Make
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    Miss
                  </div>
                </div>
              </div>
            </div>

            {/* Four Factors stats table */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                Four Factors
              </h4>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/50 border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Metric</th>
                      <th className="px-3 py-2 font-medium text-right">A</th>
                      <th className="px-3 py-2 font-medium text-right">B</th>
                      <th className="px-3 py-2 font-medium text-right">Diff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {fourFactors.map((row) => (
                      <tr
                        key={row.metric}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-3 py-2 font-medium text-foreground">
                          {row.metric}
                        </td>
                        <td className="px-3 py-2 text-right text-foreground font-semibold">
                          {row.teamA}
                        </td>
                        <td className="px-3 py-2 text-right text-muted-foreground">
                          {row.teamB}
                        </td>
                        <td
                          className={`px-3 py-2 text-right font-semibold ${
                            row.positive ? "text-accent" : "text-destructive"
                          }`}
                        >
                          {row.diff}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-start gap-2 bg-accent/5 border border-accent/10 rounded-lg px-3 py-2">
                <Info className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Transition defense held opponents to 0.82 PPP in the second
                  half, well below their 1.12 season average.
                </p>
              </div>
            </div>

            {/* Card title + description */}
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Objective Performance Insights
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Make smarter coaching decisions with granular data. Identify optimal lineup combinations and correct mechanical errors using actionable post game analytics.
              </p>
            </div>
          </div>

          {/* ── Card 4: AI Powered Vision Tracking ── */}
          <div
            className={`${cardBase} md:col-span-2 lg:col-span-2 ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="flex-1">
              <div
                className={`relative bg-background border border-border rounded-xl overflow-hidden ${gridVisible ? "vision-scan" : ""}`}
              >
                {/* Video frame mock: grid + detection overlays */}
                <div className="aspect-video flex items-center justify-center bg-muted/30 p-4">
                  <div className="relative w-full h-full max-h-[200px] rounded-lg border border-border bg-background overflow-hidden">
                    {/* Subtle grid to suggest video / processing */}
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                          linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                        `,
                        backgroundSize: "16px 16px",
                      }}
                    />
                    {/* Bounding boxes (detected entities) */}
                    <div className="absolute left-[12%] top-[20%] w-[22%] h-[35%] border-2 border-accent/60 rounded-sm bg-accent/5" />
                    <div className="absolute right-[15%] top-[25%] w-[20%] h-[30%] border-2 border-accent/50 rounded-sm bg-accent/5" />
                    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 w-[12%] h-[18%] border-2 border-accent/40 rounded-full bg-accent/10" />
                    {/* Keypoint dots */}
                    <div className="absolute left-[18%] top-[28%] w-2 h-2 rounded-full bg-accent/80" />
                    <div className="absolute right-[20%] top-[32%] w-2 h-2 rounded-full bg-accent/80" />
                    <div className="absolute left-[48%] top-[62%] w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                </div>
                {/* Label bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-t border-border bg-muted/30">
                  <Eye className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Live tracking
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                AI Powered Vision Tracking
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Our proprietary computer vision models extract precise player movements and ball trajectories straight from standard video feeds.
              </p>
            </div>
          </div>

          {/* ── Card 5: Clutch (basketball app) ── */}
          <div
            className={`${cardBase} ${entranceCls(gridVisible)}`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <img
                src={clutchLogo}
                alt="Clutch"
                className="max-h-24 w-auto object-contain"
              />
              <p className="text-sm text-muted-foreground text-center">
                Advanced Analytics Driving Basketball Player Ratings
              </p>
              <a
                href={CLUTCH_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent text-accent-foreground font-semibold py-3 px-6 rounded-xl text-center text-sm hover:opacity-90 transition-opacity"
              >
                Open Clutch
              </a>
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
            Learn More About Our Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
