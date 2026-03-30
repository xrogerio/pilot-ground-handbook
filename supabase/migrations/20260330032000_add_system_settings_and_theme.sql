-- Add columns to app_settings table
ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT 'Pilot Ground-Handbook',
  ADD COLUMN IF NOT EXISTS subtitle TEXT NOT NULL DEFAULT 'Voo Seguro',
  ADD COLUMN IF NOT EXISTS primary_color TEXT NOT NULL DEFAULT '#1e293b',
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS menu_sections JSONB NOT NULL DEFAULT '[
    {"id": "1", "title": "Geral"},
    {"id": "2", "title": "Limitações"},
    {"id": "3", "title": "Procedimentos de Emergência"},
    {"id": "4", "title": "Procedimentos Normais"},
    {"id": "5", "title": "Desempenho"},
    {"id": "6", "title": "Peso e Balanceamento"},
    {"id": "7", "title": "Descrição do Avião e Sistemas"},
    {"id": "8", "title": "Manuseio, Serviço e Manutenção"},
    {"id": "9", "title": "Suplementos"},
    {"id": "docs", "title": "Documentos Originais"}
  ]'::jsonb;

-- Ensure app_settings has at least one row
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.app_settings) THEN
    INSERT INTO public.app_settings (ai_enabled, openai_api_key) VALUES (false, '');
  END IF;
END $$;

-- Add theme_preference to users table
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS theme_preference TEXT NOT NULL DEFAULT 'system';

-- Fix RLS for app_settings so anyone can read global settings
DROP POLICY IF EXISTS "Anyone can read app_settings" ON public.app_settings;
CREATE POLICY "Anyone can read app_settings" ON public.app_settings FOR SELECT USING (true);

-- Create Storage bucket for assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('system_assets', 'system_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for system_assets bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'system_assets');

DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
CREATE POLICY "Admin Upload Access" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'system_assets' AND
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
CREATE POLICY "Admin Update Access" ON storage.objects FOR UPDATE TO authenticated USING (
  bucket_id = 'system_assets' AND
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;
CREATE POLICY "Admin Delete Access" ON storage.objects FOR DELETE TO authenticated USING (
  bucket_id = 'system_assets' AND
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
