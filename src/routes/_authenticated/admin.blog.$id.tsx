import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getPostById, updatePost, publishPost } from "@/lib/blog/posts.functions";
import { renderMarkdown } from "@/lib/blog/markdown";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/blog/$id")({
  head: () => ({ meta: [{ title: "Edit post — Fortega" }, { name: "robots", content: "noindex" }] }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const get = useServerFn(getPostById);
  const upd = useServerFn(updatePost);
  const pub = useServerFn(publishPost);

  const q = useQuery({ queryKey: ["admin-post", id], queryFn: () => get({ data: { id } }) });

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content_md: "",
    hero_image_url: "",
    seo_title: "",
    seo_description: "",
    topic: "",
  });
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    if (q.data) {
      setForm({
        title: q.data.title ?? "",
        slug: q.data.slug ?? "",
        excerpt: q.data.excerpt ?? "",
        content_md: q.data.content_md ?? "",
        hero_image_url: q.data.hero_image_url ?? "",
        seo_title: q.data.seo_title ?? "",
        seo_description: q.data.seo_description ?? "",
        topic: q.data.topic ?? "",
      });
    }
  }, [q.data]);

  const save = useMutation({
    mutationFn: () => upd({ data: { id, ...form } }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-post", id] });
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });

  const publish = useMutation({
    mutationFn: async () => {
      await upd({ data: { id, ...form } });
      await pub({ data: { id } });
    },
    onSuccess: () => {
      toast.success("Published");
      qc.invalidateQueries();
      navigate({ to: "/admin/blog" });
    },
    onError: (e: any) => toast.error(e?.message ?? "Publish failed"),
  });

  if (q.isLoading) return <div className="px-4 pt-32 text-center text-muted-foreground">Loading…</div>;
  if (q.error) return <div className="px-4 pt-32 text-center text-destructive">{(q.error as any)?.message}</div>;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28">
      <Link to="/admin/blog" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{q.data?.status === "published" ? "Edit published post" : "Review draft"}</h1>
        <div className="flex gap-2">
          <button onClick={() => save.mutate()} disabled={save.isPending} className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-50">
            {save.isPending ? "Saving…" : "Save"}
          </button>
          <button onClick={() => publish.mutate()} disabled={publish.isPending} className="rounded-md bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-50">
            {publish.isPending ? "Publishing…" : q.data?.status === "published" ? "Save & republish" : "Approve & publish"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Field label="Title">
            <input value={form.title} onChange={update("title")} className={inp} />
          </Field>
          <Field label="Slug (URL)">
            <input value={form.slug} onChange={update("slug")} className={inp} />
          </Field>
          <Field label="Excerpt">
            <textarea value={form.excerpt} onChange={update("excerpt")} rows={2} className={inp} />
          </Field>

          <div className="flex items-center gap-2 border-b border-border">
            <button onClick={() => setTab("edit")} className={`px-3 py-2 text-sm ${tab === "edit" ? "border-b-2 border-brand text-foreground" : "text-muted-foreground"}`}>Edit</button>
            <button onClick={() => setTab("preview")} className={`px-3 py-2 text-sm ${tab === "preview" ? "border-b-2 border-brand text-foreground" : "text-muted-foreground"}`}>Preview</button>
          </div>
          {tab === "edit" ? (
            <textarea
              value={form.content_md}
              onChange={update("content_md")}
              rows={28}
              className={inp + " font-mono text-sm leading-relaxed"}
              placeholder="# Heading\n\nWrite in Markdown…"
            />
          ) : (
            <article
              className="prose-fortega rounded-md border border-border bg-card p-6"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content_md) }}
            />
          )}
        </div>

        <aside className="space-y-4">
          <Field label="Topic"><input value={form.topic} onChange={update("topic")} className={inp} /></Field>
          <Field label="Hero image URL"><input value={form.hero_image_url} onChange={update("hero_image_url")} className={inp} placeholder="https://…" /></Field>
          <Field label="SEO title"><input value={form.seo_title} onChange={update("seo_title")} className={inp} maxLength={70} /></Field>
          <Field label="SEO description"><textarea value={form.seo_description} onChange={update("seo_description")} rows={3} className={inp} maxLength={200} /></Field>
          <div className="rounded-md border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
            <div><strong>Status:</strong> {q.data?.status}</div>
            {q.data?.ai_generated && <div className="mt-1">AI-generated draft.</div>}
            {q.data?.auto_publish_at && q.data.status === "draft" && !q.data.reviewed_at && (
              <div className="mt-1">Auto-publishes: {new Date(q.data.auto_publish_at).toLocaleString()}</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

const inp = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-foreground">{label}</div>
      {children}
    </label>
  );
}