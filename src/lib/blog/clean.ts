// Article-body sanitization + governance for the Fortega content engine.
// The stored content_md MUST be the human-readable article only. This module
// extracts engine metadata, strips backstage markers, normalizes collapsed
// markdown tables, and provides the publish-time governance scan.

const META_RE =
  /<!--\s*FORTEGA_CONTENT_ENGINE_META([\s\S]*?)FORTEGA_CONTENT_ENGINE_META\s*-->/g;
const HTML_COMMENT_RE = /<!--[\s\S]*?-->/g;
const SCRIPT_RE = /<script\b[\s\S]*?<\/script\s*>/gi;
const VERIFY_RE = /\s*\[(?:VERIFY|NEEDS REVIEW)(?:[^\]\n]*)\]\s*/gi;

/** Extract the engine metadata block (if present). Returns parsed JSON or null. */
export function extractMetaBlock(md: string): { body: string; meta: any | null } {
  let meta: any = null;
  const body = md.replace(META_RE, (_m, inner: string) => {
    if (!meta) {
      const trimmed = String(inner ?? "").trim();
      try {
        meta = JSON.parse(trimmed);
      } catch {
        // Attempt to extract the first JSON object
        const m = trimmed.match(/\{[\s\S]*\}/);
        if (m) {
          try {
            meta = JSON.parse(m[0]);
          } catch {
            meta = null;
          }
        }
      }
    }
    return "";
  });
  return { body, meta };
}

/**
 * Reflow GFM tables whose rows have been collapsed onto a single line.
 * Detects the `|---|---|` separator pattern and splits surrounding pipe-cells
 * back into header / separator / data rows.
 */
export function normalizeTables(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  for (const raw of lines) {
    // Look for an inline separator: ...|---|---|... on the same line as header/data
    const sepMatch = raw.match(/\|\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?/);
    if (sepMatch && raw.indexOf(sepMatch[0]) > 0) {
      // Collapsed table. Split the whole line into cells on `|`.
      const sepText = sepMatch[0];
      const sepCells = sepText.split("|").map((c) => c.trim()).filter(Boolean);
      const cellCount = sepCells.length;
      // For collapsed tables, adjacent pipes ("| |") produce empty splits we
      // should drop entirely — they are seam artifacts, not real empty cells.
      const allCells = raw
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c !== "");
      // Find the separator cells in the array
      const isSepCell = (c: string) => /^:?-{3,}:?$/.test(c);
      const firstSepIdx = allCells.findIndex(isSepCell);
      if (firstSepIdx > 0 && firstSepIdx + cellCount <= allCells.length) {
        const header = allCells.slice(0, firstSepIdx);
        const sep = allCells.slice(firstSepIdx, firstSepIdx + cellCount);
        const rest = allCells.slice(firstSepIdx + cellCount);
        // Ensure header is same width as separator
        if (header.length === cellCount) {
          const rowOf = (cells: string[]) => `| ${cells.join(" | ")} |`;
          out.push("");
          out.push(rowOf(header));
          out.push(rowOf(sep));
          for (let i = 0; i < rest.length; i += cellCount) {
            const row = rest.slice(i, i + cellCount);
            if (row.length === cellCount && row.some((c) => c !== "")) {
              out.push(rowOf(row));
            }
          }
          out.push("");
          continue;
        }
      }
    }
    out.push(raw);
  }
  return out.join("\n");
}

/**
 * Strip backstage data from an article body so only the human-readable article
 * remains. Safe to call on already-clean content (idempotent).
 */
export function cleanArticleBody(md: string): string {
  let s = String(md ?? "");
  // 1. Remove the engine metadata block (if any remains)
  s = s.replace(META_RE, "");
  // 2. Strip any <script> blocks (especially ld+json)
  s = s.replace(SCRIPT_RE, "");
  // 3. Strip all remaining HTML comments
  s = s.replace(HTML_COMMENT_RE, "");
  // 4. Remove [VERIFY ...] / [NEEDS REVIEW ...] inline markers
  s = s.replace(VERIFY_RE, " ");
  // 5. Tidy whitespace + doubled punctuation left behind
  s = s
    .replace(/[ \t]+\n/g, "\n")
    .replace(/ {2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  // 6. Normalize tables (run AFTER comment stripping)
  s = normalizeTables(s);
  return s + "\n";
}

// ---------- Content governance ----------

/**
 * First-person claim patterns Fortega must never publish. Educational mentions
 * are allowed; possessive/first-person assertions are not. We match both.
 */
const FORBIDDEN_CLAIM_PATTERNS: RegExp[] = [
  /\bULC[-\s]?listed\b/i,
  /\bULC[-\s]?certified\b/i,
  /\bULC[-\s]?monitoring\b/i,
  /\bULC[-\s]?listed central station\b/i,
  /\bour certified technicians\b/i,
  /\bcertified technicians\b/i,
  /\bwe are certified\b/i,
  /\bour certifications?\b/i,
  /\bcertified company\b/i,
  /\blicensed and insured\b/i,
  /\bfully licensed\b/i,
  /\bPSISA[-\s]?licensed\b/i,
  /\baccredited\b/i,
  /\bour accreditation\b/i,
  /\baward[-\s]?winning\b/i,
  /\bindustry[-\s]?certified\b/i,
];

/** Returns the first forbidden phrase found, or null. */
export function scanForbiddenClaims(md: string): string | null {
  const text = String(md ?? "");
  for (const re of FORBIDDEN_CLAIM_PATTERNS) {
    const m = text.match(re);
    if (m) return m[0];
  }
  return null;
}

/**
 * Cannibalization gate: returns the conflicting slug if this candidate
 * duplicates an already-published post's category/topic, else null.
 */
export function findCannibalization(
  candidate: { slug: string; title: string; topic: string | null },
  published: Array<{ slug: string; title: string; topic: string | null }>,
): string | null {
  const cand = (candidate.topic ?? "").toLowerCase().trim();
  const candTitle = candidate.title.toLowerCase();
  // Hard rule: cannabis retail is covered — block any new cannabis post.
  if (/cannabis/.test(candTitle) || /cannabis/.test(cand)) {
    const dup = published.find(
      (p) => /cannabis/i.test(p.title) || /cannabis/i.test(p.topic ?? ""),
    );
    if (dup) return dup.slug;
  }
  if (cand) {
    const dup = published.find(
      (p) => p.slug !== candidate.slug && (p.topic ?? "").toLowerCase().trim() === cand,
    );
    if (dup) return dup.slug;
  }
  return null;
}

/** Validate FAQ array shape from engine metadata. */
export function normalizeFaqs(input: any): { q: string; a: string }[] | null {
  if (!Array.isArray(input)) return null;
  const out: { q: string; a: string }[] = [];
  for (const item of input) {
    if (!item) continue;
    const q = String(item.q ?? item.question ?? "").trim();
    const a = String(item.a ?? item.answer ?? "").trim();
    if (q && a) out.push({ q, a });
  }
  return out.length ? out : null;
}