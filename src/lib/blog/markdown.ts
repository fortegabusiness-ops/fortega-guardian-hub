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
  let table: { headers: string[]; aligns: ("left" | "right" | "center" | null)[]; rows: string[][] } | null = null;

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
  const flushTable = () => {
    if (!table) return;
    const alignStyle = (a: "left" | "right" | "center" | null) =>
      a ? ` style="text-align:${a}"` : "";
    const head =
      `<thead><tr>${table.headers
        .map((h, i) => `<th class="border-b border-border px-3 py-2 text-left font-semibold"${alignStyle(table!.aligns[i] ?? null)}>${inline(h)}</th>`)
        .join("")}</tr></thead>`;
    const body =
      `<tbody>${table.rows
        .map(
          (row) =>
            `<tr>${row
              .map(
                (cell, i) =>
                  `<td class="border-b border-border/60 px-3 py-2 align-top"${alignStyle(table!.aligns[i] ?? null)}>${inline(cell)}</td>`,
              )
              .join("")}</tr>`,
        )
        .join("")}</tbody>`;
    out.push(
      `<div class="mt-6 overflow-x-auto"><table class="w-full border-collapse text-sm text-foreground/90">${head}${body}</table></div>`,
    );
    table = null;
  };

  const parseRow = (s: string): string[] => {
    let line = s.trim();
    if (line.startsWith("|")) line = line.slice(1);
    if (line.endsWith("|")) line = line.slice(0, -1);
    return line.split("|").map((c) => c.trim());
  };
  const parseAligns = (cells: string[]) =>
    cells.map((c) => {
      const left = c.startsWith(":");
      const right = c.endsWith(":");
      if (left && right) return "center" as const;
      if (right) return "right" as const;
      if (left) return "left" as const;
      return null;
    });
  const isSepRow = (cells: string[]) => cells.length > 0 && cells.every((c) => /^:?-{3,}:?$/.test(c));

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
      flushTable();
      continue;
    }
    // Table detection: header row immediately followed by separator row
    if (!table && /^\s*\|?.*\|.*\|?\s*$/.test(line)) {
      // peek: is this the header? we need the *next* line, but we're streaming.
      // Trick: stash into `para` only if next line is a sep. Simpler: detect when
      // a row that looks like sep arrives and we have a previous para line that
      // also looks like a row — convert.
    }
    // Detect start of table by sep row
    const cellsMaybe = /\|/.test(line) ? parseRow(line) : null;
    if (!table && cellsMaybe && isSepRow(cellsMaybe) && para.length === 1 && /\|/.test(para[0])) {
      const headerCells = parseRow(para[0]);
      if (headerCells.length === cellsMaybe.length) {
        para = [];
        table = { headers: headerCells, aligns: parseAligns(cellsMaybe), rows: [] };
        continue;
      }
    }
    if (table) {
      if (cellsMaybe && /\|/.test(line)) {
        // Pad/truncate row to header width
        const row = cellsMaybe.slice(0, table.headers.length);
        while (row.length < table.headers.length) row.push("");
        table.rows.push(row);
        continue;
      } else {
        flushTable();
        // fall through to normal handling
      }
    }
    let m;
    if ((m = line.match(/^###\s+(.*)$/))) {
      flushPara();
      flushList();
      flushTable();
      out.push(`<h3 class="mt-8 text-xl font-semibold text-foreground">${inline(m[1])}</h3>`);
    } else if ((m = line.match(/^##\s+(.*)$/))) {
      flushPara();
      flushList();
      flushTable();
      out.push(`<h2 class="mt-10 text-2xl font-bold tracking-tight text-foreground">${inline(m[1])}</h2>`);
    } else if ((m = line.match(/^#\s+(.*)$/))) {
      flushPara();
      flushList();
      flushTable();
      out.push(`<h2 class="mt-10 text-2xl font-bold tracking-tight text-foreground">${inline(m[1])}</h2>`);
    } else if ((m = line.match(/^>\s+(.*)$/))) {
      flushPara();
      flushList();
      flushTable();
      out.push(
        `<blockquote class="mt-4 border-l-4 border-brand/60 bg-secondary/30 px-4 py-2 italic text-foreground/80">${inline(
          m[1]
        )}</blockquote>`
      );
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      flushTable();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      flushTable();
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
  flushTable();
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