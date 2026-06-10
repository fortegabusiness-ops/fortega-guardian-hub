import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/og/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const raw = params.slug;
        // Strip optional .png/.jpg extension so og:image URLs can end in .png
        const slug = raw.replace(/\.(png|jpg|jpeg|webp)$/i, "");
        if (!/^[a-z0-9-]+$/i.test(slug)) {
          return new Response("Bad slug", { status: 400 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage
          .from("blog-images")
          .download(`${slug}.png`);
        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }
        const buf = await data.arrayBuffer();
        return new Response(buf, {
          status: 200,
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});