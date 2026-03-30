import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const aircraftName = body.aircraft || 'Aeronave'

    // Mock response for the quiz generator
    const mockData = {
      title: `Quiz de Conhecimentos: ${aircraftName}`,
      questions: [
        {
          id: 1,
          question: "Qual é a velocidade de nunca exceder (Vne) desta aeronave?",
          options: ["110 KIAS", "149 KIAS", "163 KIAS", "180 KIAS"],
          correctOptionIndex: 1,
          explanation: "A Vne (Velocidade Nunca Exceder) é o limite máximo estrutural."
        },
        {
          id: 2,
          question: "Qual o peso máximo de decolagem aprovado?",
          options: ["1500 lbs", "1670 lbs", "2100 lbs", "2550 lbs"],
          correctOptionIndex: 1,
          explanation: "Consultar o manual de voo (POH) para os limites de peso e balanceamento atualizados."
        }
      ]
    }

    return new Response(JSON.stringify(mockData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
