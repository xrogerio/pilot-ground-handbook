DO $$
DECLARE
  admin_id uuid;
  aircraft_1_id uuid := '11111111-1111-1111-1111-111111111111'::uuid;
  aircraft_2_id uuid := '22222222-2222-2222-2222-222222222222'::uuid;
  aircraft_3_id uuid := '33333333-3333-3333-3333-333333333333'::uuid;
BEGIN
  -- Fetch existing admin
  SELECT id INTO admin_id FROM auth.users WHERE email = 'lacerdarogerio1@gmail.com' LIMIT 1;
  
  IF admin_id IS NOT NULL THEN
    INSERT INTO public.aircraft (id, name, model, image_url, created_by)
    VALUES
      (aircraft_1_id, 'Tecnam P-Mentor', 'P-Mentor', 'https://img.usecurling.com/p/800/500?q=small%20airplane', admin_id),
      (aircraft_2_id, 'Inpaer Colt', 'Colt 100', 'https://img.usecurling.com/p/800/500?q=light%20sport%20aircraft', admin_id),
      (aircraft_3_id, 'Cessna 172', '172 Skyhawk', 'https://img.usecurling.com/p/800/500?q=cessna%20172', admin_id)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
