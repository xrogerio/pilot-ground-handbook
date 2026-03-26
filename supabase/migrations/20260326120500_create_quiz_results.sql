CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  aircraft_id TEXT REFERENCES public.aircraft(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own quiz results" ON public.quiz_results;
CREATE POLICY "Users can read their own quiz results" ON public.quiz_results
  FOR SELECT TO authenticated USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "Users can insert their own quiz results" ON public.quiz_results;
CREATE POLICY "Users can insert their own quiz results" ON public.quiz_results
  FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
