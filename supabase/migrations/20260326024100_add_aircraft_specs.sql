-- Adiciona coluna de especificações para comparativo
ALTER TABLE public.aircraft ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;

-- Preenche com dados iniciais genéricos para as aeronaves já existentes não ficarem vazias no gráfico
DO $BODY$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN SELECT id FROM public.aircraft WHERE specs IS NULL OR specs = '{}'::jsonb LOOP
    UPDATE public.aircraft
    SET specs = jsonb_build_object(
      'maxSpeed', floor(random() * 50 + 100)::int,
      'range', floor(random() * 200 + 400)::int,
      'maxWeight', floor(random() * 1000 + 1500)::int,
      'fuelCapacity', floor(random() * 20 + 40)::int,
      'seating', 4
    )
    WHERE id = rec.id;
  END LOOP;
END $BODY$;
