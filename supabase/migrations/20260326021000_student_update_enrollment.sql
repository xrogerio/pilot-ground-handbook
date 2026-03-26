DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;
CREATE POLICY "Users can update their own enrollments" ON public.enrollments
  FOR UPDATE TO authenticated USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
