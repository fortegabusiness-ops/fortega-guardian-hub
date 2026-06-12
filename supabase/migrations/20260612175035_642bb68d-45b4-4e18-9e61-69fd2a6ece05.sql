CREATE OR REPLACE FUNCTION public.verify_cron_secret(_provided text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = private, extensions, pg_catalog
AS $$
DECLARE
  v text;
BEGIN
  SELECT value INTO v FROM private.webhook_secrets WHERE name = 'cron';
  IF v IS NULL OR _provided IS NULL OR length(_provided) <> length(v) THEN
    RETURN false;
  END IF;
  RETURN encode(extensions.digest(v, 'sha256'), 'hex') = encode(extensions.digest(_provided, 'sha256'), 'hex');
END;
$$;
REVOKE EXECUTE ON FUNCTION public.verify_cron_secret(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_cron_secret(text) TO service_role;

DO $$
BEGIN
  PERFORM cron.unschedule('blog-generate-daily-draft');
EXCEPTION WHEN OTHERS THEN NULL;
END;
$$;

DO $$
BEGIN
  PERFORM cron.unschedule('blog-auto-publish-stale');
EXCEPTION WHEN OTHERS THEN NULL;
END;
$$;

DO $$
BEGIN
  PERFORM cron.unschedule('fortega-auto-publish-stale');
EXCEPTION WHEN OTHERS THEN NULL;
END;
$$;

SELECT cron.schedule(
  'fortega-auto-publish-stale',
  '*/15 * * * *',
  $$
    UPDATE public.blog_posts
    SET status = 'published', published_at = now()
    WHERE status = 'draft'
      AND reviewed_at IS NULL
      AND auto_publish_at IS NOT NULL
      AND auto_publish_at <= now();
  $$
);