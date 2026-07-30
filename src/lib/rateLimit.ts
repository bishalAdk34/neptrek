// In-memory fixed-window rate limiter, keyed by string (e.g. IP).
//
// Limitation: state resets on process restart and is not shared across
// multiple server instances. Sufficient for this app's scale/hosting model
// (single instance); swap for a shared store (e.g. Redis) if scaling out.

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || now >= existing.resetAt) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= limit) {
    return { allowed: false, retryAfterSec: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}
