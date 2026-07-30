// Reads/validates required env vars at call time. Throws a clear error
// listing any missing vars instead of failing silently later.
export function getEnv<K extends string>(keys: readonly K[]): Record<K, string> {
  const missing: string[] = [];
  const values = {} as Record<K, string>;

  for (const key of keys) {
    const value = process.env[key];
    if (!value) {
      missing.push(key);
    } else {
      values[key] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missing.join(", ")}`);
  }

  return values;
}

export function getOptionalEnv(key: string): string | undefined {
  return process.env[key] || undefined;
}
