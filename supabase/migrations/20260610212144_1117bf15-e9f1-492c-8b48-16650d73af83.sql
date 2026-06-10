
CREATE OR REPLACE FUNCTION public.verify_cron_secret(_provided text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = private, pg_catalog
AS $$
DECLARE v text;
BEGIN
  SELECT value INTO v FROM private.webhook_secrets WHERE name = 'cron';
  IF v IS NULL OR _provided IS NULL OR length(_provided) <> length(v) THEN
    RETURN false;
  END IF;
  -- constant-time-ish equality via hashing
  RETURN encode(digest(v, 'sha256'), 'hex') = encode(digest(_provided, 'sha256'), 'hex');
END;
$$;
REVOKE EXECUTE ON FUNCTION public.verify_cron_secret(text) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.verify_cron_secret(text) TO service_role;

-- Tidy up sandbox grant from earlier step
REVOKE EXECUTE ON FUNCTION public.setup_blog_cron() FROM sandbox_exec;
