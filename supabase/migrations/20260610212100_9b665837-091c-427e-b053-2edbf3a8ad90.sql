
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

CREATE TABLE IF NOT EXISTS private.webhook_secrets (
  name text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON private.webhook_secrets FROM PUBLIC, anon, authenticated;
GRANT  ALL ON private.webhook_secrets TO service_role;

CREATE OR REPLACE FUNCTION private.get_or_create_cron_secret()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, extensions, pg_catalog
AS $$
DECLARE v text;
BEGIN
  SELECT value INTO v FROM private.webhook_secrets WHERE name = 'cron';
  IF v IS NULL THEN
    v := encode(extensions.gen_random_bytes(48), 'base64');
    INSERT INTO private.webhook_secrets(name, value) VALUES ('cron', v);
  END IF;
  RETURN v;
END;
$$;
REVOKE EXECUTE ON FUNCTION private.get_or_create_cron_secret() FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION private.get_or_create_cron_secret() TO service_role;

DROP FUNCTION IF EXISTS public.setup_blog_cron(text);
DROP FUNCTION IF EXISTS public.setup_blog_cron();

CREATE OR REPLACE FUNCTION public.setup_blog_cron()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, cron, net, private, extensions
AS $$
DECLARE
  base_url text := 'https://fortega.ca';
  secret text;
  auth_header text;
BEGIN
  secret := private.get_or_create_cron_secret();
  auth_header := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || secret
  )::text;

  BEGIN PERFORM cron.unschedule('fortega-generate-daily-draft'); EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN PERFORM cron.unschedule('fortega-auto-publish-stale');   EXCEPTION WHEN OTHERS THEN NULL; END;

  PERFORM cron.schedule(
    'fortega-generate-daily-draft',
    '0 9 * * *',
    format($cron$
      SELECT net.http_post(url := %L, headers := %L::jsonb, body := '{}'::jsonb);
    $cron$, base_url || '/api/public/hooks/generate-daily-draft', auth_header)
  );

  PERFORM cron.schedule(
    'fortega-auto-publish-stale',
    '*/15 * * * *',
    format($cron$
      SELECT net.http_post(url := %L, headers := %L::jsonb, body := '{}'::jsonb);
    $cron$, base_url || '/api/public/hooks/auto-publish-stale', auth_header)
  );

  RETURN 'scheduled';
END;
$$;
REVOKE EXECUTE ON FUNCTION public.setup_blog_cron() FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.setup_blog_cron() TO service_role, sandbox_exec;

SELECT public.setup_blog_cron();
