
-- 1. Lock down storage.objects for the private blog-images bucket
-- Admins can manage (insert/update/delete/read); reads otherwise go through signed URLs.
DROP POLICY IF EXISTS "blog-images admin read"   ON storage.objects;
DROP POLICY IF EXISTS "blog-images admin insert" ON storage.objects;
DROP POLICY IF EXISTS "blog-images admin update" ON storage.objects;
DROP POLICY IF EXISTS "blog-images admin delete" ON storage.objects;

CREATE POLICY "blog-images admin read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "blog-images admin insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "blog-images admin update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "blog-images admin delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- 2. Revoke EXECUTE on pgmq wrapper functions from signed-in users.
-- These SECURITY DEFINER functions should only be callable by service_role (server code),
-- not by every authenticated user.
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)               FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)               FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   FROM PUBLIC, authenticated, anon;

GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint)               TO service_role;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)               TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   TO service_role;
