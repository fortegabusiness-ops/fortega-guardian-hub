SELECT net.http_post(
  url := 'https://fortega.ca/api/public/hooks/generate-daily-draft',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || private.get_or_create_cron_secret()
  ),
  body := '{}'::jsonb
);