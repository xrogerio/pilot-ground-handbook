import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { aircraft_id, difficulty } = await req.json()

    if (!aircraft_id) {
      throw new Error('aircraft_id is required')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const authHeader = req.headers.get('Authorization')

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader || '' } },
    })

    const { data: sections } = await supabase
      .from('sections')
      .select('id, section_title')
      .eq('aircraft_id', aircraft_id)

    let fullText = ''
    if (sections && sections.length > 0) {
      for (const section of sections) {
        const { data: texts } = await supabase
          .from('texts')
          .select('content')
          .eq('section_id', section.id)
        if (texts && texts.length > 0) {
          fullText += `\nSeção: ${section.section_title}\n`
          fullText += texts.map((t: any) => t.content).join('\n')
        }
      }
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey || fullText.trim() === '') {
      const mockQuestions = Array.from({ length: 20 }).map((_, i) => ({
        id: i.toString(),
        question: `[MOCK] Questão simulada ${i + 1} sobre a aeronave (Dificuldade: ${difficulty}). Em um ambiente real, esta questão seria gerada por IA com base no conteúdo da aeronave. Qual é a correta?`,
        options: [
          'Alternativa A (Incorreta)',
          'Alternativa B (Correta)',
          'Alternativa C (Incorreta)',
          'Alternativa D (Incorreta)',
        ],
        correctAnswer: 1,
        explanation:
          'Esta é uma explicação simulada pois a chave da API da OpenAI não foi configurada ou a aeronave não possui conteúdo em texto cadastrado.',
      }))

      return new Response(JSON.stringify({ questions: mockQuestions }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const prompt = `Gere um quiz de 20 questões de múltipla escolha sobre uma aeronave. O nível de dificuldade deve ser "${difficulty}". Baseie-se no seguinte conteúdo do manual da aeronave:\n\n${fullText.substring(0, 8000)}\n\nRetorne APENAS um JSON estrito no seguinte formato, sem formatação markdown extra:\n{\n  "questions": [\n    {\n      "id": "1",\n      "question": "Texto da pergunta",\n      "options": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],\n      "correctAnswer": 0,\n      "explanation": "Explicação da resposta correta"\n    }\n  ]\n}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-1106',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`OpenAI API error: ${err}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    let quizData
    try {
      quizData = JSON.parse(content)
    } catch (e) {
      const jsonStr = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
      quizData = JSON.parse(jsonStr)
    }

    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error('Invalid AI response format')
    }

    return new Response(JSON.stringify(quizData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
