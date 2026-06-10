// Tiny safe-ish markdown renderer for trusted (admin-reviewed) content.
// Supports: H1-H3, paragraphs, bold/italic, links, ordered/unordered lists, blockquotes, code spans.

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(s: string) {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, '<code class="rounded bg-secondary px-1.5 py-0.5 text-sm">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" class="text-brand underline underline-offset-2 hover:text-brand-glow" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return out;
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      out.push(`<p class="mt-4 leading-relaxed text-foreground/90">${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const tag = list.type;
      const cls = tag === "ul" ? "list-disc" : "list-decimal";
      out.push(
        `<${tag} class="mt-4 ${cls} space-y-1.5 pl-6 text-foreground/90">${list.items
          .map((it) => `<li>${inline(it)}</li>`)
          .join("")}</${tag}>`
      );
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    let m;
    if ((m = line.match(/^###\s+(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<h3 class="mt-8 text-xl font-semibold text-foreground">${inline(m[1])}</h3>`);
    } else if ((m = line.match(/^##\s+(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<h2 class="mt-10 text-2xl font-bold tracking-tight text-foreground">${inline(m[1])}</h2>`);
    } else if ((m = line.match(/^#\s+(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<h2 class="mt-10 text-2xl font-bold tracking-tight text-foreground">${inline(m[1])}</h2>`);
    } else if ((m = line.match(/^>\s+(.*)$/))) {
      flushPara();
      flushList();
      out.push(
        `<blockquote class="mt-4 border-l-4 border-brand/60 bg-secondary/30 px-4 py-2 italic text-foreground/80">${inline(
          m[1]
        )}</blockquote>`
      );
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(m[1]);
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();
  return out.join("\n");
}

export function plainTextFromMarkdown(md: string, max = 200): string {
  const stripped = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`]/g, "")
    .replace(/\[(.+?)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > max ? stripped.slice(0, max - 1).trimEnd() + "…" : stripped;
}