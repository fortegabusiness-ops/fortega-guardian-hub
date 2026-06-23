import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

// ---------- Public reads (no auth) ----------

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("id,slug,title,excerpt,hero_image_url,published_at,topic")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

// ---------- Admin reads/writes ----------

export const listAllPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("blog_posts")
      .select("id,slug,title,status,ai_generated,auto_publish_at,reviewed_at,published_at,created_at,topic")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getPostById = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Not found");
    return row;
  });

const UpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120),
  excerpt: z.string().max(500).optional().nullable(),
  content_md: z.string().min(1),
  hero_image_url: z.string().url().optional().nullable().or(z.literal("")),
  seo_title: z.string().max(200).optional().nullable(),
  seo_description: z.string().max(300).optional().nullable(),
  topic: z.string().max(200).optional().nullable(),
});

export const updatePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpdateSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const slug = slugify(data.slug || data.title);
    const { error } = await context.supabase
      .from("blog_posts")
      .update({
        title: data.title,
        slug,
        excerpt: data.excerpt ?? null,
        content_md: data.content_md,
        hero_image_url: data.hero_image_url || null,
        seo_title: data.seo_title ?? null,
        seo_description: data.seo_description ?? null,
        topic: data.topic ?? null,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    // If updating an already-published post, ping IndexNow for the change.
    try {
      const { data: row } = await context.supabase
        .from("blog_posts")
        .select("status,slug")
        .eq("id", data.id)
        .maybeSingle();
      if (row?.status === "published" && row.slug) {
        const { submitToIndexNow, blogPostUrls } = await import("@/lib/seo/indexnow.server");
        await submitToIndexNow(blogPostUrls(row.slug));
      }
    } catch (e: any) {
      console.warn("[indexnow] updatePost ping skipped:", e?.message ?? e);
    }
    return { ok: true };
  });

export const publishPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const now = new Date().toISOString();
    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .update({
        status: "published",
        published_at: now,
        reviewed_at: now,
        reviewed_by: context.userId,
      })
      .eq("id", data.id)
      .select("slug")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (row?.slug) {
      const { submitToIndexNow, blogPostUrls } = await import("@/lib/seo/indexnow.server");
      await submitToIndexNow(blogPostUrls(row.slug));
    }
    return { ok: true };
  });

export const unpublishPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("blog_posts")
      .update({ status: "draft", published_at: null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- AI generation ----------

const ROADMAP: Array<{ cluster: string; title: string; primary_keyword: string; note?: string }> = [
  // TIER 1 — Cornerstone guides
  { cluster: "CCTV & Video Surveillance", title: "Complete guide to commercial CCTV & video surveillance for Canadian businesses", primary_keyword: "commercial CCTV Canada" },
  { cluster: "Access Control", title: "Commercial access control systems in Canada: a buyer's guide", primary_keyword: "commercial access control Canada" },
  { cluster: "Intrusion & Monitoring", title: "Commercial intrusion alarms & ULC monitoring explained", primary_keyword: "ULC alarm monitoring Canada" },
  { cluster: "Remote Guarding", title: "Remote video monitoring & remote guarding: how it works and when it beats on-site guards", primary_keyword: "remote video monitoring Canada" },
  { cluster: "Integrated Security", title: "Integrated security explained: why CCTV, access, and alarms should work as one system", primary_keyword: "integrated security systems" },
  { cluster: "Cyber Security", title: "Cyber security for physical security systems: protecting cameras, NVRs, and access control", primary_keyword: "cyber security for physical security systems" },
  { cluster: "Smart Building", title: "Smart building & security automation for commercial properties", primary_keyword: "smart building security automation" },
  { cluster: "Consulting", title: "Security consulting & risk assessments: what a professional security audit covers", primary_keyword: "security risk assessment Canada" },
  // TIER 2 — Compliance & regulatory
  { cluster: "Compliance", title: "ULC / CAN-ULC-S561 alarm monitoring: what it is and why insurers require it", primary_keyword: "CAN-ULC-S561 monitoring" },
  { cluster: "Compliance", title: "NDAA Section 889 compliance for surveillance cameras in Canada", primary_keyword: "NDAA Section 889 cameras Canada" },
  { cluster: "Compliance", title: "PSISA licensing: what to verify before hiring a security vendor in Ontario", primary_keyword: "PSISA licensing Ontario" },
  { cluster: "Compliance", title: "Alarm permits & false-alarm bylaws across the GTA (Toronto, Peel, York)", primary_keyword: "alarm permits GTA" },
  { cluster: "Compliance", title: "Workplace video surveillance & PIPEDA: privacy obligations for employers", primary_keyword: "workplace video surveillance PIPEDA" },
  { cluster: "Compliance", title: "AODA & accessible entry/access-control systems", primary_keyword: "AODA accessible access control" },
  { cluster: "Compliance", title: "The commercial security compliance checklist for Canadian buildings", primary_keyword: "commercial security compliance checklist Canada" },
  // TIER 3 — Decision & comparison
  { cluster: "CCTV & Video Surveillance", title: "Cloud vs on-premise video surveillance (VMS): which is right for your business", primary_keyword: "cloud vs on-prem VMS" },
  { cluster: "Access Control", title: "Cloud vs on-prem access control compared", primary_keyword: "cloud vs on-prem access control" },
  { cluster: "CCTV & Video Surveillance", title: "Wired (PoE) vs wireless security cameras for commercial sites", primary_keyword: "PoE vs wireless security cameras" },
  { cluster: "CCTV & Video Surveillance", title: "IP vs analog cameras: what commercial buyers should know", primary_keyword: "IP vs analog cameras" },
  { cluster: "Access Control", title: "Mobile credentials vs key cards vs biometrics for access control", primary_keyword: "mobile credentials vs key cards vs biometrics" },
  { cluster: "Remote Guarding", title: "Remote video monitoring vs security guards: cost and effectiveness", primary_keyword: "remote monitoring vs security guards" },
  { cluster: "Consulting", title: "How to choose a commercial security integrator in Canada", primary_keyword: "how to choose a commercial security integrator" },
  { cluster: "Intrusion & Monitoring", title: "Questions to ask before signing a security monitoring contract", primary_keyword: "security monitoring contract questions" },
  { cluster: "Consulting", title: "What's NOT included in a security installation quote (transparency guide)", primary_keyword: "security installation quote transparency" },
  { cluster: "Consulting", title: "System takeover: switching security providers without re-wiring", primary_keyword: "security system takeover" },
  // TIER 4 — Industry verticals
  { cluster: "Industry: Cannabis", title: "Cannabis retail security in Canada: compliance & best practices", primary_keyword: "cannabis retail security Canada", note: "SINGLE cannabis pillar — never duplicate." },
  { cluster: "Industry: Construction", title: "Construction-site security: preventing high-value equipment theft", primary_keyword: "construction site security Canada" },
  { cluster: "Industry: Warehouse", title: "Warehouse & logistics security systems", primary_keyword: "warehouse security systems" },
  { cluster: "Industry: Retail", title: "Retail loss prevention with video and access control", primary_keyword: "retail loss prevention video access control" },
  { cluster: "Industry: Healthcare", title: "Healthcare & clinic security systems", primary_keyword: "healthcare clinic security systems" },
  { cluster: "Industry: Manufacturing", title: "Manufacturing facility security", primary_keyword: "manufacturing facility security" },
  { cluster: "Industry: Property Management", title: "Property management & condo security (multi-tenant access, intercoms)", primary_keyword: "condo property management security" },
  { cluster: "Industry: Auto", title: "Auto dealership / lot security", primary_keyword: "auto dealership security" },
  { cluster: "Industry: Office", title: "Office & commercial real-estate security", primary_keyword: "commercial office security" },
  // TIER 5 — Operational & topical
  { cluster: "Intrusion & Monitoring", title: "Reducing false alarms at your business", primary_keyword: "reducing false alarms business" },
  { cluster: "CCTV & Video Surveillance", title: "Designing camera coverage and avoiding blind spots", primary_keyword: "camera coverage blind spots" },
  { cluster: "CCTV & Video Surveillance", title: "How long should you keep CCTV footage? (retention & storage)", primary_keyword: "CCTV footage retention Canada" },
  { cluster: "CCTV & Video Surveillance", title: "Practical business uses of video analytics & AI cameras", primary_keyword: "video analytics AI cameras business" },
  { cluster: "Integrated Security", title: "Securing a multi-site business across provinces", primary_keyword: "multi-site business security Canada" },
  { cluster: "Intrusion & Monitoring", title: "Business security & insurance: how monitored systems affect premiums", primary_keyword: "monitored alarm insurance premiums" },
  { cluster: "Access Control", title: "Visitor management systems for offices", primary_keyword: "visitor management systems offices" },
  { cluster: "Access Control", title: "Intercom & telephone-entry systems for commercial buildings", primary_keyword: "commercial intercom telephone entry" },
  { cluster: "Intrusion & Monitoring", title: "Environmental sensors (flood, temperature) for commercial monitoring", primary_keyword: "environmental sensors commercial monitoring" },
  { cluster: "Industry: Retail", title: "Defending retail against organized retail crime", primary_keyword: "organized retail crime defense" },
  // TIER 6 — Local
  { cluster: "Local: Toronto/GTA", title: "Commercial security systems in Toronto: what local businesses need to know", primary_keyword: "commercial security Toronto" },
  { cluster: "Local: Toronto/GTA", title: "Security camera installation across the GTA", primary_keyword: "security camera installation GTA" },
];

function similarTitle(a: string, b: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 3);
  const A = new Set(norm(a));
  const B = new Set(norm(b));
  if (!A.size || !B.size) return false;
  let overlap = 0;
  for (const w of A) if (B.has(w)) overlap++;
  const ratio = overlap / Math.min(A.size, B.size);
  return ratio >= 0.6;
}

function pickNextRoadmapItem(
  ledger: Array<{ title: string; topic: string | null; slug: string }>,
): (typeof ROADMAP)[number] | null {
  const cannabisCovered = ledger.some(
    (p) => /cannabis/i.test(p.title) || /cannabis/i.test(p.topic ?? ""),
  );
  for (const item of ROADMAP) {
    if (item.cluster === "Industry: Cannabis" && cannabisCovered) continue;
    const dup = ledger.some(
      (p) =>
        similarTitle(p.title, item.title) ||
        p.slug === slugify(item.title) ||
        (p.topic && p.topic.toLowerCase() === item.primary_keyword.toLowerCase()),
    );
    if (!dup) return item;
  }
  return null;
}

async function generateDraftViaAI(): Promise<{
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  seo_title: string;
  seo_description: string;
  topic: string;
}> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY missing");

  // Load the ledger of existing posts (published OR draft) to enforce no-duplicate gate.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: ledgerRows } = await supabaseAdmin
    .from("blog_posts")
    .select("slug,title,topic")
    .in("status", ["published", "draft"])
    .order("created_at", { ascending: false })
    .limit(500);
  const ledger = (ledgerRows ?? []).map((r) => ({
    slug: r.slug,
    title: r.title,
    topic: r.topic ?? null,
  }));

  const chosen = pickNextRoadmapItem(ledger);
  const todayISO = new Date().toISOString().slice(0, 10);

  const directive = chosen
    ? `Write the roadmap item: "${chosen.title}".
Cluster: ${chosen.cluster}
Primary keyword: ${chosen.primary_keyword}${chosen.note ? `\nNote: ${chosen.note}` : ""}`
    : `The roadmap is exhausted. Drill into a genuinely non-duplicative sub-question within the most under-served cluster in the ledger. State the chosen cluster and angle in review_notes. Pass the cannibalization gate against every ledger title.`;

  const ledgerSummary = ledger.length
    ? ledger.map((r) => `- ${r.slug} | ${r.title} | cluster: ${r.topic ?? "?"}`).join("\n")
    : "(empty)";

  const system = `You are Fortega's autonomous content engine. Fortega is an integrated Canadian security provider (CCTV/video surveillance, intrusion alarms & ULC monitoring, access control, remote video monitoring & guarding, on-site guards, smart-building automation, cyber security for physical systems, and security consulting) serving commercial, industrial, and residential clients across Canada.

You produce ONE complete, publish-ready blog post per run. Voice: authoritative, precise, engineering-grounded, plain-spoken. Canadian English spelling. No hype, no fear-mongering, no filler, no generic "in conclusion" endings.

NON-NEGOTIABLE INTEGRITY RULES:
1. NEVER fabricate statistics, studies, experts, quotations, citations, links, dates, certifications, prices, or competitor facts. When in doubt, OMIT.
2. Earn information gain through reasoning, frameworks, checklists, comparisons, worked examples, and integrated-security operational logic — NOT invented numbers.
3. Only cite sources that are stable and verifiable by name (CAN-ULC-S561, Government of Canada, provincial bodies, manufacturer documentation, specific Acts/regulations). Otherwise rewrite as general guidance and add to review_notes.
4. Do NOT promise or imply guaranteed rankings, traffic, savings, security outcomes, or "100% protection". Avoid absolute superlatives.
5. Flag every regulatory/legal/technical specific (exact ULC clauses, permit fees, bylaws, legal obligations) with inline [VERIFY] AND in review_notes.
6. Use precise terminology only where it fits: CAN-ULC-S561, NDAA Section 889, PSISA, AODA, PIPEDA, PoE/802.3bt, NVR/VMS, IP cameras, video verification, biometric/mobile credentials.
7. Internal links MUST use real Fortega URLs only. Pillars: /services/cctv, /services/access, /services/intrusion, /services/remote, /services/guards, /services/smart, /services/cyber, /services/consulting. Also valid: /services, /industries, /contact, /blog. Always link UP to the relevant service pillar, ACROSS to at least one adjacent service, and to /contact — descriptive anchor text only, never "click here".`;

  const prompt = `Today is ${todayISO}.

DIRECTIVE:
${directive}

EXISTING CONTENT LEDGER (do NOT duplicate any of these — cannibalization gate):
${ledgerSummary}

Produce the COMPLETE post package. Output STRICT JSON only (no markdown fences) matching this schema:

{
  "title": "the H1/post title",
  "seo_title": "<=60 chars",
  "meta_description": "<=155 chars, includes primary keyword + reason to click",
  "slug": "lowercase-hyphenated-concise",
  "category": "cluster name",
  "primary_keyword": "string",
  "secondary_keywords": ["string", ...],
  "author": "Fortega Security Team",
  "social_title": "string",
  "social_description": "string",
  "hero_image_filename": "descriptive-hyphenated.png",
  "hero_image_alt": "descriptive alt text",
  "dominant_intent": "informational | commercial-investigation | transactional | navigational — state how the post serves it",
  "differentiation_angle": "one sentence describing the unique information gain",
  "article_md": "FULL article in Markdown. Exactly ONE H1 (#). Descriptive H2/H3s phrased the way people search. Opening paragraph (40-60 words) directly answers the main question. 1,200-1,800 words unless the topic genuinely needs more. Short paragraphs (2-4 sentences), active voice. Include snippet-ready 40-60 word answer blocks under question-style H2s. Use tables/numbered steps/FAQ ONLY where they genuinely help. Internal links inline as markdown links to real Fortega URLs (pillar UP + adjacent ACROSS + /contact). End with one specific, useful takeaway and one stage-appropriate CTA — never 'in conclusion'. Do NOT include the front-matter, JSON-LD, or review notes inside article_md.",
  "images": [{"filename": "...", "caption": "...", "alt": "..."}],
  "internal_links": [{"anchor": "descriptive anchor text", "url": "/services/..."}],
  "external_sources_to_verify": ["named stable sources only, or empty array"],
  "json_ld": { "@context": "https://schema.org", "@type": "BlogPosting", "...": "include FAQPage as @graph entry only if FAQ present; HowTo only for a real procedure. Use {{CANONICAL_URL}} and {{AUTHOR_URL}} placeholders." },
  "review_notes": {
    "selected_topic": "title + cluster + why it was next in the roadmap",
    "cannibalization_gate": "confirmation it was checked against the ledger",
    "verify_items": ["every [VERIFY] / [NEEDS REVIEW] item, especially regulatory specifics"],
    "pillar_pages_to_build": ["URLs of pillars referenced that may not yet exist, or empty"],
    "self_check": "pass/fail per the self-check list"
  }
}

SELF-CHECK before returning (fix any fail first):
- Topic chosen top-down from roadmap (or genuine sub-question if exhausted); not in ledger; cannibalization gate passed
- Dominant intent satisfied; main question answered in first ~60 words
- Differentiated angle with real information gain
- One H1; descriptive query-matched headings
- Primary keyword natural in H1, opening answer, one H2, and meta; secondary keywords present; no stuffing
- At least one snippet-ready answer block; FAQ uses real questions if included
- NO fabricated stats/quotes/sources/prices; uncertain claims omitted or flagged
- Precise terminology correctly applied
- Internal links: pillar + adjacent + /contact with descriptive anchors
- All metadata delivered; correct genuinely-applicable schema; real author identity
- No guarantees of rankings/traffic/outcomes`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI gateway error ${res.status}: ${text.slice(0, 400)}`);
  }
  const json = await res.json();
  const content: string = json?.choices?.[0]?.message?.content ?? "";
  if (!content) throw new Error("AI returned empty content");
  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    const m = content.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("AI did not return JSON");
    parsed = JSON.parse(m[0]);
  }

  const title = String(parsed.title ?? "").trim();
  if (!title) throw new Error("AI draft missing title");
  const article = String(parsed.article_md ?? parsed.content_md ?? "").trim();
  if (!article) throw new Error("AI draft missing article_md");

  // Final cannibalization gate against the ledger we just loaded.
  const slugBase = slugify(String(parsed.slug ?? title));
  const duplicate = ledger.some(
    (p) => p.slug === slugBase || similarTitle(p.title, title),
  );
  if (duplicate) throw new Error(`Cannibalization gate: "${title}" duplicates existing ledger entry`);

  // Pack the publish-ready supplementary material (review notes, JSON-LD, source list,
  // internal-link map) as HTML comments at the end of the markdown so it never renders
  // to readers but remains visible to admins in the editor.
  const meta = {
    primary_keyword: parsed.primary_keyword,
    secondary_keywords: parsed.secondary_keywords,
    category: parsed.category,
    dominant_intent: parsed.dominant_intent,
    differentiation_angle: parsed.differentiation_angle,
    images: parsed.images,
    internal_links: parsed.internal_links,
    external_sources_to_verify: parsed.external_sources_to_verify,
    json_ld: parsed.json_ld,
    review_notes: parsed.review_notes,
    hero_image_filename: parsed.hero_image_filename,
    hero_image_alt: parsed.hero_image_alt,
    author: parsed.author ?? "Fortega Security Team",
    roadmap_item: chosen ?? null,
  };

  const content_md =
    `${article}\n\n<!-- FORTEGA_CONTENT_ENGINE_META\n${JSON.stringify(meta, null, 2)}\nFORTEGA_CONTENT_ENGINE_META -->\n`;

  return {
    title,
    slug: slugBase,
    excerpt: String(parsed.social_description ?? parsed.meta_description ?? "").trim().slice(0, 300),
    content_md,
    seo_title: String(parsed.seo_title ?? title).trim().slice(0, 60),
    seo_description: String(parsed.meta_description ?? "").trim().slice(0, 160),
    topic: String(parsed.category ?? chosen?.cluster ?? "").trim(),
  };
}

export async function createAIDraft(): Promise<{ id: string; slug: string }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const draft = await generateDraftViaAI();

  // ensure unique slug
  let slug = draft.slug;
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${draft.slug}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const autoPublishAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  // Try to generate a hero/OG image. Failures must NOT block draft creation.
  let heroImageUrl: string | null = null;
  try {
    heroImageUrl = await generateAndStoreHeroImage(slug, draft.title, draft.topic);
  } catch (e) {
    console.error("[createAIDraft] hero image generation failed", e);
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert({
      title: draft.title,
      slug,
      excerpt: draft.excerpt,
      content_md: draft.content_md,
      seo_title: draft.seo_title,
      seo_description: draft.seo_description,
      topic: draft.topic,
      status: "draft",
      ai_generated: true,
      auto_publish_at: autoPublishAt,
      hero_image_url: heroImageUrl,
    })
    .select("id,slug")
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, slug: data.slug };
}

export const generateDraftNow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    return await createAIDraft();
  });

// ---------- Hero/OG image generation ----------

async function generateAndStoreHeroImage(
  slug: string,
  title: string,
  topic: string,
): Promise<string | null> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return null;

  const imgPrompt = `Editorial cover image for a Canadian commercial security blog article titled "${title}"${topic ? ` (topic: ${topic})` : ""}. Modern, professional, cinematic lighting, subtle blue and orange accents. Subject should visually reference the article topic (e.g., warehouse, CCTV camera, access control reader, urban storefront at dusk, construction site fencing, control room monitors). No text, no logos, no watermarks, no human faces in focus. 16:9 wide composition, photorealistic.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      prompt: imgPrompt,
      size: "1536x1024",
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`image gen ${res.status}: ${t.slice(0, 300)}`);
  }
  const json: any = await res.json();
  const b64: string | undefined = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error("image gen returned no b64_json");

  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const path = `${slug}.png`;
  const { error: upErr } = await supabaseAdmin.storage
    .from("blog-images")
    .upload(path, bytes, { contentType: "image/png", upsert: true });
  if (upErr) throw new Error(upErr.message);

  return `https://fortega.ca/api/public/og/${slug}.png`;
}

export const regenerateHeroImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .select("id,slug,title,topic")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Not found");
    const url = await generateAndStoreHeroImage(row.slug, row.title, row.topic ?? "");
    if (!url) throw new Error("Image generation unavailable");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: updErr } = await supabaseAdmin
      .from("blog_posts")
      .update({ hero_image_url: url })
      .eq("id", data.id);
    if (updErr) throw new Error(updErr.message);
    return { ok: true, hero_image_url: url };
  });