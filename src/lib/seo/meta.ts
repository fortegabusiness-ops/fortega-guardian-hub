/**
 * Small helpers for keeping titles and descriptions inside the length search
 * engines actually display, and for deterministic copy variation so that
 * templated location pages do not read identically across 1,700+ URLs.
 */

export const TITLE_MAX = 60;
export const DESC_MAX = 155;

/** Return the first candidate that fits, else a clean truncation of the last. */
export function clampTitle(candidates: string[], max = TITLE_MAX): string {
  const list = candidates.filter(Boolean);
  const fit = list.find((c) => c.length <= max);
  if (fit) return fit;
  const last = list[list.length - 1] ?? "";
  if (last.length <= max) return last;
  return `${last.slice(0, max - 1).trimEnd().replace(/[,\-–—|]$/, "").trim()}…`;
}

/** Trim a description to a whole word inside the limit. */
export function clampDescription(text: string, max = DESC_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
  return `${cut.slice(0, stop > 60 ? stop : cut.length).replace(/[,;:\-–—]$/, "").trim()}…`;
}

/** Stable, deterministic 32-bit hash so variation never changes between builds. */
export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Deterministically pick one item from a list for a given seed. */
export function pickVariant<T>(items: T[], seed: string, offset = 0): T {
  return items[(hashSeed(seed) + offset) % items.length]!;
}

/** Deterministically rotate a list (keeps all content, changes the order). */
export function rotate<T>(items: T[], seed: string, offset = 0): T[] {
  if (items.length < 2) return items;
  const start = (hashSeed(seed) + offset) % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}
