import { useEffect, useState } from "react";
import { fetchLeetCodeStats, type LeetCodeStats } from "@/lib/api/leetcode";

export function useLeetCodeStats(username: string) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchLeetCodeStats(username)
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { stats, loading };
}
