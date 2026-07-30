// Next.js types searchParams values as string | string[] | undefined
// (arrays occur when a query key is repeated, e.g. ?trip=a&trip=b).
// This normalizes to a single string, taking the first value if repeated.
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
