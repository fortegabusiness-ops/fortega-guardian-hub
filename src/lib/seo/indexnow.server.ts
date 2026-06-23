// Server-only IndexNow submission helper.
// Notifies IndexNow-participating engines (Bing, Yandex, Seznam, Naver) of
// new/updated URLs. No-ops outside production. Never throws.

const PROD_HOST = "fortega.ca";
const PROD_ORIGIN = "https://fortega.ca";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const FALLBACK_KEY = "aa433c6149f442afa25143f19cb6949d";

function getKey(): string | null {
  const k = process.env.INDEXNOW_KEY || FALLBACK_KEY;
  return k && /^[a-f0-9]{8,128}$/i.test(k) ? k : null;
}

function normalizeUrl(u: string): string | null {
  try {
    const url = new URL(u, PROD_ORIGIN);
    if (url.hostname !== PROD_HOST) return null;
    url.protocol = "https:";
    // Re-serialize so each path segment is RFC-3986 encoded.
    return url.toString();
  } catch {
    return null;
  }
}

export async function submitToIndexNow(urls: string[]): Promise<void> {
  try {
    const key = getKey();
    if (!key) return;

    // Only submit from real production. Skip preview/localhost/lovable.app.
    let currentHost = (process.env.PUBLIC_SITE_HOST || "").toLowerCase();
    if (!currentHost) {
      try {
        const { getRequestHost } = await import("@tanstack/react-start/server");
        currentHost = (getRequestHost() || "").toLowerCase();
      } catch {
        // no request context — be conservative and skip
        return;
      }
    }
    if (currentHost !== PROD_HOST) return;

    const cleaned = Array.from(
      new Set(
        urls
          .map((u) => (typeof u === "string" ? u.trim() : ""))
          .filter(Boolean)
          .map(normalizeUrl)
          .filter((u): u is string => !!u),
      ),
    );
    if (cleaned.length === 0) return;

    const body = {
      host: PROD_HOST,
      key,
      keyLocation: `${PROD_ORIGIN}/${key}.txt`,
      urlList: cleaned,
    };

    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (res.status !== 200 && res.status !== 202) {
        const text = await res.text().catch(() => "");
        console.warn("[indexnow] non-success", res.status, text.slice(0, 500));
      }
    } finally {
      clearTimeout(t);
    }
  } catch (e: any) {
    console.warn("[indexnow] submit failed:", e?.message ?? e);
  }
}

export function blogPostUrls(slug: string): string[] {
  return [`${PROD_ORIGIN}/blog/${slug}`, `${PROD_ORIGIN}/blog`];
}