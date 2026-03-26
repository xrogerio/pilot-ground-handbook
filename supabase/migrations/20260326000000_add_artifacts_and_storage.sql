-- Add order_index to existing tables
ALTER TABLE public.images ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
ALTER TABLE public.tables ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
ALTER TABLE public.graphs ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create texts table
CREATE TABLE IF NOT EXISTS public.texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  subsection_id UUID REFERENCES public.subsections(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.texts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage texts" ON public.texts;
CREATE POLICY "Admins can manage texts" ON public.texts
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "Authenticated users can read texts" ON public.texts;
CREATE POLICY "Authenticated users can read texts" ON public.texts
  FOR SELECT TO authenticated
  USING (true);

-- Storage setup
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects 
  FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects 
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
  
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects 
  FOR DELETE TO authenticated USING (bucket_id = 'images');

-- Migrate existing subsection descriptions to texts
DO $$
DECLARE
  sub RECORD;
BEGIN
  FOR sub IN SELECT * FROM public.subsections WHERE description IS NOT NULL AND description != '' LOOP
    INSERT INTO public.texts (section_id, subsection_id, content, order_index)
    VALUES (sub.section_id, sub.id, sub.description, 0);
  END LOOP;
END $$;
