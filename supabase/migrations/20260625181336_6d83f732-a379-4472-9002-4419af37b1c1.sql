
DO $$
BEGIN
  BEGIN PERFORM cron.unschedule('fortega-generate-daily-draft'); EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN PERFORM cron.unschedule('fortega-auto-publish-stale');   EXCEPTION WHEN OTHERS THEN NULL; END;
END $$;

DROP FUNCTION IF EXISTS public.setup_blog_cron();
DROP TABLE IF EXISTS public.blog_posts CASCADE;
