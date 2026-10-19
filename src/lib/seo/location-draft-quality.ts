export type QualityDocument = { id: string; city: string; province: string; text: string };

/** Compare actual editorial content, not navigation, page headings or standard delivery disclaimers. */
export function substantiveTokens(document: QualityDocument): string[] {
  let text = document.text.toLowerCase().replace(/https?:\/\/\S+/g, " ");
  for (const name of [document.city, document.province]) {
    const escaped = name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(escaped, "g"), " location ");
  }
  return text.replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
}

function shingles(tokens: string[], width = 5): Set<string> {
  const result = new Set<string>();
  for (let i = 0; i <= tokens.length - width; i++) result.add(tokens.slice(i, i + width).join(" "));
  return result;
}

export function compareSubstance(a: QualityDocument, b: QualityDocument) {
  const left = substantiveTokens(a);
  const right = substantiveTokens(b);
  const l = shingles(left), r = shingles(right);
  const overlap = [...l].filter((word) => r.has(word)).length;
  const union = l.size + r.size - overlap;
  const lt = new Set(left), rt = new Set(right);
  const tokenOverlap = [...lt].filter((word) => rt.has(word)).length;
  const tokenUnion = lt.size + rt.size - tokenOverlap;
  const l3 = shingles(left, 3), r3 = shingles(right, 3);
  const overlap3 = [...l3].filter((word) => r3.has(word)).length;
  const union3 = l3.size + r3.size - overlap3;
  return {
    exactNameSwap: left.join(" ") === right.join(" "),
    jaccard: union ? overlap / union : 1,
    containment: Math.min(l.size, r.size) ? overlap / Math.min(l.size, r.size) : 1,
    tokenJaccard: tokenUnion ? tokenOverlap / tokenUnion : 1,
    trigramJaccard: union3 ? overlap3 / union3 : 1,
  };
}

export function compareDrafts(documents: QualityDocument[]) {
  const pairs = [];
  for (let i = 0; i < documents.length; i++) for (let j = i + 1; j < documents.length; j++) {
    const a = documents[i], b = documents[j];
    if (!a || !b || a.city === b.city) continue;
    pairs.push({ a: a.id, b: b.id, ...compareSubstance(a, b) });
  }
  return pairs;
}