/**
 * Renders GitHub + LeetCode contribution calendar graphs for a team member.
 * Data is fetched from the JAGD Vercel backend which caches until midnight PST.
 *
 * The graph layout mirrors GitHub's contribution calendar: a grid of weeks (columns)
 * × 7 days (rows), with colour intensity proportional to activity count. Only the
 * most recent 5 months are shown to keep the widget compact.
 */

import { useGitHubContributions } from "@/hooks/useGitHubContributions";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

interface TeamMemberActivityProps {
  github: string;
  leetcode?: string;
}

const GITHUB_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const LEETCODE_COLORS = ["#1a1a1a", "#0e4429", "#006d32", "#26a641", "#39d353"];

function getColor(count: number, max: number, colors: string[]) {
  if (count === 0) return colors[0];
  const intensity = Math.ceil((count / max) * 4);
  return colors[intensity];
}

/** Build a 5-month calendar grid: weeks × 7 days. */
function buildCalendarGrid(data: { date: string; count: number }[]) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 4);
  startDate.setDate(1);

  const dataMap = new Map(data.map((d) => [d.date, d.count]));

  const weeks: Array<Array<{ date: string; count: number } | null>> = [];
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  let currentWeek: Array<{ date: string; count: number } | null> = [];

  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split("T")[0];
    currentWeek.push({ date: dateStr, count: dataMap.get(dateStr) || 0 });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return weeks;
}

/** Derive month label positions from the week grid. */
function buildMonthSpans(
  weeks: Array<Array<{ date: string; count: number } | null>>,
) {
  const spans: Array<{ month: string; startWeek: number; endWeek: number }> =
    [];
  let currentMonthStart = 0;
  let lastMonth = -1;

  weeks.forEach((week, idx) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) return;
    const monthNum = new Date(firstDay.date).getMonth();

    if (lastMonth !== -1 && monthNum !== lastMonth) {
      const monthDate = new Date(
        weeks[currentMonthStart].find((d) => d !== null)!.date,
      );
      spans.push({
        month: monthDate.toLocaleDateString("en-US", { month: "short" }),
        startWeek: currentMonthStart,
        endWeek: idx - 1,
      });
      currentMonthStart = idx;
    }
    lastMonth = monthNum;
  });

  if (lastMonth !== -1 && weeks[currentMonthStart]) {
    const firstDay = weeks[currentMonthStart].find((d) => d !== null);
    if (firstDay) {
      spans.push({
        month: new Date(firstDay.date).toLocaleDateString("en-US", {
          month: "short",
        }),
        startWeek: currentMonthStart,
        endWeek: weeks.length - 1,
      });
    }
  }

  return spans;
}

function ContributionGraph({
  type,
  data,
  loading,
  leetcodeStats,
}: {
  type: "github" | "leetcode";
  data: { date: string; count: number }[];
  loading: boolean;
  leetcodeStats?: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
  } | null;
}) {
  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent" />
      </div>
    );
  }

  if (data.length === 0) return null;

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const colors = type === "github" ? GITHUB_COLORS : LEETCODE_COLORS;
  const weeks = buildCalendarGrid(data);
  const monthSpans = buildMonthSpans(weeks);
  const weekWidth = 13; // 10px cell + 3px gap

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        {type === "github" ? <GitHubIcon /> : <LeetCodeIcon />}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {type === "github"
            ? "GitHub Activity (5 months)"
            : "LeetCode Activity (5 months)"}
        </span>
      </div>

      {/* LeetCode summary */}
      {type === "leetcode" && leetcodeStats && (
        <div className="mb-4 p-4 rounded-lg bg-background border border-border">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-2xl font-bold text-foreground">
                {leetcodeStats.totalSolved}
              </span>
              <span className="text-sm text-muted-foreground ml-1">Solved</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span>
                <span className="text-green-400">Easy </span>
                <span className="text-foreground font-medium">
                  {leetcodeStats.easySolved}
                </span>
              </span>
              <span>
                <span className="text-yellow-400">Med. </span>
                <span className="text-foreground font-medium">
                  {leetcodeStats.mediumSolved}
                </span>
              </span>
              <span>
                <span className="text-red-400">Hard </span>
                <span className="text-foreground font-medium">
                  {leetcodeStats.hardSolved}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="relative">
        {/* Month labels */}
        <div className="flex gap-1 mb-1">
          <div className="flex flex-col gap-[3px] justify-start text-[10px] pr-1 invisible">
            <div style={{ height: "10px" }}>Mon</div>
          </div>
          <div
            className="relative"
            style={{
              width: `${weeks.length * weekWidth - 3}px`,
              height: "14px",
            }}
          >
            {monthSpans.map((span, idx) => {
              const center = (span.startWeek + span.endWeek) / 2;
              return (
                <span
                  key={idx}
                  className="text-[10px] text-muted-foreground absolute whitespace-nowrap"
                  style={{
                    left: `${center * weekWidth + 5}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {span.month}
                </span>
              );
            })}
          </div>
        </div>

        {/* Day labels + grid */}
        <div className="flex gap-1 mt-4">
          <div className="flex flex-col gap-[3px] justify-start text-[10px] text-muted-foreground pr-1">
            {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
              <div key={i} style={{ height: "10px" }}>
                {label}
              </div>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="w-[10px] h-[10px] rounded-sm hover:ring-1 hover:ring-accent/50 transition-all cursor-pointer"
                    style={{
                      backgroundColor: day
                        ? getColor(day.count, maxCount, colors)
                        : "transparent",
                      opacity: day ? 1 : 0,
                    }}
                    title={
                      day
                        ? `${day.date}: ${day.count} ${type === "github" ? "contributions" : "problems"}`
                        : ""
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons (keeps the component self-contained) ── */

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

/* ── Legend shared between both graphs ── */

function ActivityLegend() {
  return (
    <div className="flex items-center justify-center gap-1 mt-4 text-[10px] text-muted-foreground">
      <span>Less</span>
      {GITHUB_COLORS.map((color, idx) => (
        <div
          key={idx}
          className="w-[10px] h-[10px] rounded-sm"
          style={{ backgroundColor: color }}
        />
      ))}
      <span>More</span>
    </div>
  );
}

/* ── Main export ── */

export const TeamMemberActivity = ({
  github,
  leetcode,
}: TeamMemberActivityProps) => {
  const { contributions: githubContributions, loading: githubLoading } =
    useGitHubContributions(github);
  const { stats: leetcodeStats, loading: leetcodeLoading } = useLeetCodeStats(
    leetcode || "",
  );

  return (
    <>
      <ContributionGraph
        type="github"
        data={githubContributions}
        loading={githubLoading}
      />
      {leetcode && (
        <ContributionGraph
          type="leetcode"
          data={leetcodeStats?.recentSubmissions || []}
          loading={leetcodeLoading}
          leetcodeStats={leetcodeStats}
        />
      )}
      <ActivityLegend />
    </>
  );
};
