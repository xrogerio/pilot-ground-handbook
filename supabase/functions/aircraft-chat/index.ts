import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { aircraft_id, messages } = await req.json()
    if (!aircraft_id || !messages) throw new Error('aircraft_id and messages are required')

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Unauthorized - Missing Authorization header')

    const supabaseUser = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: { headers: { Authorization: authHeader } },
    })
    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser()
    if (userError || !user) throw new Error('Unauthorized')

    const { data: settings } = await supabaseAdmin.from('app_settings').select('*').single()
    const apiKey = settings?.openai_api_key || Deno.env.get('OPENAI_API_KEY')

    if (!settings?.ai_enabled || !apiKey) {
      throw new Error('AI Chat is not enabled or API key is missing.')
    }

    const { data: aircraft } = await supabaseAdmin
      .from('aircraft')
      .select('*')
      .eq('id', aircraft_id)
      .single()
    if (!aircraft) throw new Error('Aircraft not found')

    const { data: sections } = await supabaseAdmin
      .from('sections')
      .select('*')
      .eq('aircraft_id', aircraft_id)

    let contextText = `Aeronave: ${aircraft.name} (${aircraft.model})\n`
    if (aircraft.specs) {
      contextText += `Especificações Gerais: ${JSON.stringify(aircraft.specs)}\n\n`
    }

    if (sections) {
      for (const sec of sections) {
        contextText += `Seção: ${sec.section_number} - ${sec.section_title}\n`
        const { data: texts } = await supabaseAdmin
          .from('texts')
          .select('*')
          .eq('section_id', sec.id)
        if (texts) texts.forEach((t: any) => (contextText += `${t.content}\n`))

        const { data: tables } = await supabaseAdmin
          .from('tables')
          .select('*')
          .eq('section_id', sec.id)
        if (tables) {
          tables.forEach((t: any) => {
            const td = t.table_data
            contextText += `Tabela ${td.title}: Colunas [${td.headers?.join(', ')}] Linhas: ${JSON.stringify(td.rows)}\n`
          })
        }
      }
    }

    contextText = contextText.substring(0, 12000)

    const systemMessage = {
      role: 'system',
      content: `Você é um instrutor especialista de Ground School (aeronave ${aircraft.name}).
Sua função é responder a perguntas dos alunos baseando-se EXCLUSIVAMENTE no conteúdo do manual abaixo.
Sejam claros, didáticos e sempre citem valores com precisão. Se a resposta não estiver no contexto abaixo, informe: "Não tenho essa informação no manual cadastrado."

### MANUAL E CONTEXTO ###
${contextText}`,
    }

    const openAiMessages = [systemMessage, ...messages]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-1106',
        messages: openAiMessages,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`OpenAI API error: ${err}`)
    }

    const data = await response.json()

    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
