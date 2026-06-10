
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.setup_blog_cron(_secret text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, cron, net
AS $$
DECLARE
  base_url text := 'https://fortega.ca';
  auth_header jsonb := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || _secret
  );
BEGIN
  -- Unschedule if exists (ignore errors)
  BEGIN PERFORM cron.unschedule('fortega-generate-daily-draft'); EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN PERFORM cron.unschedule('fortega-auto-publish-stale');   EXCEPTION WHEN OTHERS THEN NULL; END;

  PERFORM cron.schedule(
    'fortega-generate-daily-draft',
    '0 9 * * *',
    format($cron$
      SELECT net.http_post(
        url := %L,
        headers := %L::jsonb,
        body := '{}'::jsonb
      );
    $cron$, base_url || '/api/public/hooks/generate-daily-draft', auth_header::text)
  );

  PERFORM cron.schedule(
    'fortega-auto-publish-stale',
    '*/15 * * * *',
    format($cron$
      SELECT net.http_post(
        url := %L,
        headers := %L::jsonb,
        body := '{}'::jsonb
      );
    $cron$, base_url || '/api/public/hooks/auto-publish-stale', auth_header::text)
  );

  RETURN 'scheduled';
END;
$$;

REVOKE EXECUTE ON FUNCTION public.setup_blog_cron(text) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.setup_blog_cron(text) TO service_role;
