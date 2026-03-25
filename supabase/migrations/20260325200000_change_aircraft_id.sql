-- 1. Create sequence for short IDs
CREATE SEQUENCE IF NOT EXISTS aircraft_short_id_seq START 1;

-- 2. Drop constraints
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_aircraft_id_fkey;
ALTER TABLE public.pdfs DROP CONSTRAINT IF EXISTS pdfs_aircraft_id_fkey;
ALTER TABLE public.sections DROP CONSTRAINT IF EXISTS sections_aircraft_id_fkey;
ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_student_id_aircraft_id_key;

-- 3. Alter columns to TEXT to support short string IDs
ALTER TABLE public.aircraft ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE public.enrollments ALTER COLUMN aircraft_id TYPE TEXT USING aircraft_id::TEXT;
ALTER TABLE public.pdfs ALTER COLUMN aircraft_id TYPE TEXT USING aircraft_id::TEXT;
ALTER TABLE public.sections ALTER COLUMN aircraft_id TYPE TEXT USING aircraft_id::TEXT;

-- 4. Map UUIDs to Short IDs safely and idempotently
DO $BODY$
DECLARE
  r RECORD;
  new_id TEXT;
BEGIN
  FOR r IN SELECT id FROM public.aircraft ORDER BY created_at ASC LOOP
    -- Only map if it's currently a long UUID (length > 10)
    IF length(r.id) > 10 THEN
      new_id := nextval('aircraft_short_id_seq')::TEXT;
      
      UPDATE public.enrollments SET aircraft_id = new_id WHERE aircraft_id = r.id;
      UPDATE public.pdfs SET aircraft_id = new_id WHERE aircraft_id = r.id;
      UPDATE public.sections SET aircraft_id = new_id WHERE aircraft_id = r.id;
      
      UPDATE public.aircraft SET id = new_id WHERE id = r.id;
    END IF;
  END LOOP;
END $BODY$;

-- 5. Set new default value
ALTER TABLE public.aircraft ALTER COLUMN id SET DEFAULT nextval('aircraft_short_id_seq')::TEXT;

-- 6. Restore foreign keys and unique constraints
ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_aircraft_id_fkey FOREIGN KEY (aircraft_id) REFERENCES public.aircraft(id) ON DELETE CASCADE;
ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_student_id_aircraft_id_key UNIQUE (student_id, aircraft_id);

ALTER TABLE public.pdfs ADD CONSTRAINT pdfs_aircraft_id_fkey FOREIGN KEY (aircraft_id) REFERENCES public.aircraft(id) ON DELETE CASCADE;

ALTER TABLE public.sections ADD CONSTRAINT sections_aircraft_id_fkey FOREIGN KEY (aircraft_id) REFERENCES public.aircraft(id) ON DELETE CASCADE;
