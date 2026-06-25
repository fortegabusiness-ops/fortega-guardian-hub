ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS faqs jsonb,
  ADD COLUMN IF NOT EXISTS internal_meta jsonb;