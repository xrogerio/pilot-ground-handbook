-- Storage setup for PDFs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pdfs', 'pdfs', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects 
  FOR SELECT USING (bucket_id IN ('images', 'pdfs'));

DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects 
  FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('images', 'pdfs'));
  
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects 
  FOR DELETE TO authenticated USING (bucket_id IN ('images', 'pdfs'));

-- Ensure RLS on pdfs table
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage pdfs" ON public.pdfs;
CREATE POLICY "Admins can manage pdfs" ON public.pdfs
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "Authenticated users can read pdfs" ON public.pdfs;
CREATE POLICY "Authenticated users can read pdfs" ON public.pdfs
  FOR SELECT TO authenticated
  USING (true);
