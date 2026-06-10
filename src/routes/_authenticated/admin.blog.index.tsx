import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listAllPosts,
  generateDraftNow,
  publishPost,
  unpublishPost,
  deletePost,
} from "@/lib/blog/posts.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/blog/")({
  head: () => ({ meta: [{ title: "Blog Admin — Fortega" }, { name: "robots", content: "noindex" }] }),
  component: AdminBlog,
});

function AdminBlog() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listAllPosts);
  const gen = useServerFn(generateDraftNow);
  const pub = useServerFn(publishPost);
  const unpub = useServerFn(unpublishPost);
  const del = useServerFn(deletePost);

  const posts = useQuery({ queryKey: ["admin-posts"], queryFn: () => list() });

  const generate = useMutation({
    mutationFn: () => gen(),
    onSuccess: ({ id }) => {
      toast.success("Draft generated");
      navigate({ to: "/admin/blog/$id", params: { id } });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to generate draft"),
  });

  const publish = useMutation({
    mutationFn: (id: string) => pub({ data: { id } }),
    onSuccess: () => {
      toast.success("Published");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
    },
  });
  const unpublish = useMutation({
    mutationFn: (id: string) => unpub({ data: { id } }),
    onSuccess: () => {
      toast.success("Moved to draft");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (posts.error) {
    const msg = (posts.error as any)?.message ?? "Error";
    if (msg.includes("Forbidden")) {
      return (
        <div className="mx-auto max-w-2xl px-4 pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground">Access denied</h1>
          <p className="mt-2 text-muted-foreground">
            Your account doesn't have admin access. Sign in with the admin email.
          </p>
          <button onClick={signOut} className="mt-4 rounded-md border border-border px-4 py-2 text-sm">Sign out</button>
        </div>
      );
    }
    return <div className="px-4 pt-32 text-center text-destructive">{msg}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review AI-generated drafts. Unreviewed drafts auto-publish 24h after creation.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => generate.mutate()}
            disabled={generate.isPending}
            className="rounded-md bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-50"
          >
            {generate.isPending ? "Generating…" : "Generate draft now"}
          </button>
          <button onClick={signOut} className="rounded-md border border-border px-4 py-2 text-sm text-foreground">
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Auto-publish</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.isLoading && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {posts.data?.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                No posts yet. Click "Generate draft now" to create one.
              </td></tr>
            )}
            {posts.data?.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link to="/admin/blog/$id" params={{ id: p.id }} className="font-medium text-foreground hover:text-brand">
                    {p.title}
                  </Link>
                  {p.topic && <div className="text-xs text-muted-foreground">{p.topic}</div>}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.status === "published" ? "bg-green-500/15 text-green-500"
                    : p.status === "draft" ? "bg-amber-500/15 text-amber-500"
                    : "bg-muted text-muted-foreground"
                  }`}>{p.status}</span>
                  {p.ai_generated && <span className="ml-2 text-xs text-muted-foreground">AI</span>}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleString()}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.status === "draft" && p.auto_publish_at && !p.reviewed_at
                    ? new Date(p.auto_publish_at).toLocaleString()
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    {p.status === "draft" ? (
                      <button
                        onClick={() => publish.mutate(p.id)}
                        className="rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground"
                      >Publish</button>
                    ) : (
                      <button
                        onClick={() => unpublish.mutate(p.id)}
                        className="rounded-md border border-border px-3 py-1.5 text-xs"
                      >Unpublish</button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id);
                      }}
                      className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive"
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}