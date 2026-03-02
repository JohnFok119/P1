/**
 * GitHub API client.
 * Fetches contribution calendar data via the JAGD Vercel serverless backend,
 * which proxies GitHub's GraphQL API and caches results until midnight PST.
 */

import { validateGitHubUsername } from "./validators";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://jagdnotionapiserver.vercel.app/api";

export interface GitHubContribution {
  date: string;
  count: number;
}

export async function fetchGitHubContributions(
  username: string,
): Promise<GitHubContribution[]> {
  if (!validateGitHubUsername(username)) {
    throw new Error("Invalid GitHub username format");
  }

  const url = `${API_BASE}/github/contributions?username=${encodeURIComponent(username)}`;
  const response = await fetch(url);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch GitHub contributions");
  }

  return result.data;
}
