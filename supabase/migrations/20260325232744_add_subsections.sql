CREATE TABLE IF NOT EXISTS public.subsections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subsections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage subsections" ON public.subsections;
CREATE POLICY "Admins can manage subsections" ON public.subsections
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "Authenticated users can read subsections" ON public.subsections;
CREATE POLICY "Authenticated users can read subsections" ON public.subsections
  FOR SELECT TO authenticated
  USING (true);

ALTER TABLE public.images ADD COLUMN IF NOT EXISTS subsection_id UUID REFERENCES public.subsections(id) ON DELETE CASCADE;
ALTER TABLE public.tables ADD COLUMN IF NOT EXISTS subsection_id UUID REFERENCES public.subsections(id) ON DELETE CASCADE;
ALTER TABLE public.graphs ADD COLUMN IF NOT EXISTS subsection_id UUID REFERENCES public.subsections(id) ON DELETE CASCADE;

DO $$
DECLARE
  sec RECORD;
  sub_id UUID;
BEGIN
  FOR sec IN SELECT * FROM public.sections LOOP
    IF NOT EXISTS (SELECT 1 FROM public.subsections WHERE section_id = sec.id) THEN
      IF sec.content IS NOT NULL OR 
         EXISTS(SELECT 1 FROM public.images WHERE section_id = sec.id) OR
         EXISTS(SELECT 1 FROM public.tables WHERE section_id = sec.id) OR
         EXISTS(SELECT 1 FROM public.graphs WHERE section_id = sec.id) THEN
         
        INSERT INTO public.subsections (section_id, title, description, order_index)
        VALUES (sec.id, 'Visão Geral', sec.content, 0)
        RETURNING id INTO sub_id;
        
        UPDATE public.images SET subsection_id = sub_id WHERE section_id = sec.id;
        UPDATE public.tables SET subsection_id = sub_id WHERE section_id = sec.id;
        UPDATE public.graphs SET subsection_id = sub_id WHERE section_id = sec.id;
      END IF;
    END IF;
  END LOOP;
END $$;
