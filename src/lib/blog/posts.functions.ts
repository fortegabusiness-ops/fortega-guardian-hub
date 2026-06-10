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
    return { ok: true };
  });

export const publishPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const now = new Date().toISOString();
    const { error } = await context.supabase
      .from("blog_posts")
      .update({
        status: "published",
        published_at: now,
        reviewed_at: now,
        reviewed_by: context.userId,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
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

  const system = `You are a senior content writer for Fortega, a Canadian commercial security company offering CCTV, alarm monitoring, access control, intrusion detection, remote guarding, and integrated security systems across Canada. Write practical, factual, helpful articles for business owners, facility managers, and property managers. Avoid fluff. Use a confident, professional tone. Canadian English spelling.`;

  const today = new Date().toISOString().slice(0, 10);
  const prompt = `Pick ONE fresh, specific blog topic relevant to Canadian commercial security today (${today}). Avoid generic "5 tips" lists. Prefer angles like: a specific industry (warehouses, cannabis retail, construction sites, multi-tenant office, healthcare, dealerships), a specific threat (porch piracy at depots, tailgating, after-hours break-ins), a technology comparison (cloud vs on-prem VMS, IP vs analog CCTV), regulatory/insurance angles (ULC monitoring requirements, insurance discounts for monitored alarms), or seasonal (winter storm preparation, summer construction site security).

Output STRICT JSON only, no markdown fences. Schema:
{
  "topic": "short topic label",
  "title": "compelling SEO title under 65 chars",
  "slug": "kebab-case-slug",
  "excerpt": "1-2 sentence summary, 140-180 chars",
  "seo_title": "SEO title under 60 chars (can match title)",
  "seo_description": "meta description 140-160 chars",
  "content_md": "Full article in Markdown, 800-1200 words. Use H2/H3 headings. Include an intro, 3-5 sections, and a short conclusion with a soft CTA to contact Fortega for a consultation. Use bullet lists where useful. No images. No frontmatter."
}`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
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
  const slugBase = slugify(String(parsed.slug ?? title));
  return {
    title,
    slug: slugBase,
    excerpt: String(parsed.excerpt ?? "").trim(),
    content_md: String(parsed.content_md ?? "").trim(),
    seo_title: String(parsed.seo_title ?? title).trim(),
    seo_description: String(parsed.seo_description ?? parsed.excerpt ?? "").trim(),
    topic: String(parsed.topic ?? "").trim(),
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