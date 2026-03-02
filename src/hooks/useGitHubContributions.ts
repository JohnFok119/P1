import { useEffect, useState } from "react";
import {
  fetchGitHubContributions,
  type GitHubContribution,
} from "@/lib/api/github";

export function useGitHubContributions(username: string) {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchGitHubContributions(username)
      .then((data) => {
        if (!cancelled) setContributions(data);
      })
      .catch(() => {
        if (!cancelled) setContributions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { contributions, loading };
}
