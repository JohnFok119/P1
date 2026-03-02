/**
 * LeetCode API client.
 * Fetches solve stats and recent submission calendar via the JAGD Vercel
 * serverless backend, which caches results until midnight PST.
 */

import { validateLeetCodeUsername } from "./validators";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://jagdnotionapiserver.vercel.app/api";

export interface LeetCodeSubmission {
  date: string;
  count: number;
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  recentSubmissions: LeetCodeSubmission[];
}

export async function fetchLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  if (!username) return null;
  if (!validateLeetCodeUsername(username)) return null;

  try {
    const url = `${API_BASE}/leetcode/stats?username=${encodeURIComponent(username)}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch LeetCode stats");
    }

    return result.data;
  } catch {
    return null;
  }
}
