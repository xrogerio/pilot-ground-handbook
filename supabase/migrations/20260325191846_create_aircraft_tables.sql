-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'student')) DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create aircraft table
CREATE TABLE IF NOT EXISTS public.aircraft (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT,
  image_url TEXT,
  language TEXT CHECK (language IN ('pt-BR', 'en-US')) DEFAULT 'pt-BR',
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS public.sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aircraft_id UUID REFERENCES public.aircraft(id) ON DELETE CASCADE NOT NULL,
  section_number INT NOT NULL,
  section_title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create images table
CREATE TABLE IF NOT EXISTS public.images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.sections(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tables table
CREATE TABLE IF NOT EXISTS public.tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.sections(id) ON DELETE CASCADE NOT NULL,
  table_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create graphs table
CREATE TABLE IF NOT EXISTS public.graphs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.sections(id) ON DELETE CASCADE NOT NULL,
  graph_type TEXT NOT NULL,
  graph_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  aircraft_id UUID REFERENCES public.aircraft(id) ON DELETE CASCADE NOT NULL,
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, aircraft_id)
);

-- Create pdfs table
CREATE TABLE IF NOT EXISTS public.pdfs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aircraft_id UUID REFERENCES public.aircraft(id) ON DELETE CASCADE NOT NULL,
  pdf_url TEXT NOT NULL,
  pdf_title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Enable
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.graphs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdfs ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
-- Users
DROP POLICY IF EXISTS "Users can read all users" ON public.users;
CREATE POLICY "Users can read all users" ON public.users FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
CREATE POLICY "Users can update their own data" ON public.users FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Aircraft
DROP POLICY IF EXISTS "Authenticated users can read aircraft" ON public.aircraft;
CREATE POLICY "Authenticated users can read aircraft" ON public.aircraft FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage aircraft" ON public.aircraft;
CREATE POLICY "Admins can manage aircraft" ON public.aircraft FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Sections
DROP POLICY IF EXISTS "Authenticated users can read sections" ON public.sections;
CREATE POLICY "Authenticated users can read sections" ON public.sections FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage sections" ON public.sections;
CREATE POLICY "Admins can manage sections" ON public.sections FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Images
DROP POLICY IF EXISTS "Authenticated users can read images" ON public.images;
CREATE POLICY "Authenticated users can read images" ON public.images FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage images" ON public.images;
CREATE POLICY "Admins can manage images" ON public.images FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Tables
DROP POLICY IF EXISTS "Authenticated users can read tables" ON public.tables;
CREATE POLICY "Authenticated users can read tables" ON public.tables FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage tables" ON public.tables;
CREATE POLICY "Admins can manage tables" ON public.tables FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Graphs
DROP POLICY IF EXISTS "Authenticated users can read graphs" ON public.graphs;
CREATE POLICY "Authenticated users can read graphs" ON public.graphs FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage graphs" ON public.graphs;
CREATE POLICY "Admins can manage graphs" ON public.graphs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Enrollments
DROP POLICY IF EXISTS "Users can read their own enrollments or admins all" ON public.enrollments;
CREATE POLICY "Users can read their own enrollments or admins all" ON public.enrollments FOR SELECT TO authenticated USING (
  student_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can manage enrollments" ON public.enrollments;
CREATE POLICY "Admins can manage enrollments" ON public.enrollments FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Pdfs
DROP POLICY IF EXISTS "Authenticated users can read pdfs" ON public.pdfs;
CREATE POLICY "Authenticated users can read pdfs" ON public.pdfs FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage pdfs" ON public.pdfs;
CREATE POLICY "Admins can manage pdfs" ON public.pdfs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Seed user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $BODY$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'student');
  RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed admin user
DO $BODY$
DECLARE
  admin_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'lacerdarogerio1@gmail.com') THEN
    admin_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      admin_id,
      '00000000-0000-0000-0000-000000000000',
      'lacerdarogerio1@gmail.com',
      crypt('securepassword123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.users (id, email, role)
    VALUES (admin_id, 'lacerdarogerio1@gmail.com', 'admin')
    ON CONFLICT (id) DO UPDATE SET role = 'admin';
  END IF;
END $BODY$;
