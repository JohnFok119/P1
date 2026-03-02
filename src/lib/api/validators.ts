/**
 * Input validation utilities for API parameters.
 * Prevents injection and malformed requests before they reach the network.
 */

/** GitHub usernames: alphanumeric + hyphens, 1-39 chars, no leading/trailing/consecutive hyphens. */
export function validateGitHubUsername(username: string): boolean {
  if (!username || typeof username !== "string") return false;
  return (
    /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username) ||
    /^[a-zA-Z0-9]$/.test(username)
  );
}

/** LeetCode usernames: alphanumeric + underscores/hyphens, 1-100 chars. */
export function validateLeetCodeUsername(username: string): boolean {
  if (!username || typeof username !== "string") return false;
  return username.length <= 100 && /^[a-zA-Z0-9_-]+$/.test(username);
}
