ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS completed_sections text[] DEFAULT '{}'::text[];
