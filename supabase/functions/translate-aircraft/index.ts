import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { aircraft_id, source_lang, target_lang } = await req.json()
    if (!aircraft_id || !source_lang || !target_lang) {
      throw new Error('Missing required parameters')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY is not configured')
    }

    // Delete existing target language sections to prevent duplicates
    await supabaseAdmin.from('sections').delete()
      .eq('aircraft_id', aircraft_id)
      .eq('language', target_lang)

    // Fetch source sections
    const { data: sourceSections } = await supabaseAdmin
      .from('sections')
      .select('*')
      .eq('aircraft_id', aircraft_id)
      .eq('language', source_lang)

    if (!sourceSections || sourceSections.length === 0) {
      throw new Error('No sections found in source language')
    }

    // Process each section
    for (const section of sourceSections) {
      const { data: subsections } = await supabaseAdmin.from('subsections').select('*').eq('section_id', section.id).order('order_index')
      const { data: texts } = await supabaseAdmin.from('texts').select('*').eq('section_id', section.id)
      const { data: tables } = await supabaseAdmin.from('tables').select('*').eq('section_id', section.id)
      const { data: graphs } = await supabaseAdmin.from('graphs').select('*').eq('section_id', section.id)
      const { data: images } = await supabaseAdmin.from('images').select('*').eq('section_id', section.id)
      const { data: videos } = await supabaseAdmin.from('videos').select('*').eq('section_id', section.id)

      const payloadToTranslate = {
        section_title: section.section_title,
        subsections: subsections?.map(sub => ({
          id: sub.id,
          title: sub.title,
          description: sub.description
        })) || [],
        texts: texts?.map(t => ({ id: t.id, content: t.content })) || [],
        tables: tables?.map(t => ({
          id: t.id,
          table_data: {
            title: t.table_data.title,
            headers: t.table_data.headers,
            rows: t.table_data.rows
          }
        })) || [],
        graphs: graphs?.map(g => ({
          id: g.id,
          graph_data: {
            title: g.graph_data.title,
            config: g.graph_data.config,
            data: g.graph_data.data
          }
        })) || [],
        videos: videos?.map(v => ({ id: v.id, title: v.title })) || []
      }

      const prompt = `Translate the following JSON object from ${source_lang} to ${target_lang}. Keep the exact same JSON structure, keys, and IDs. Only translate the textual values (titles, descriptions, contents, headers, row cells, chart labels). Do NOT wrap in markdown blocks, return ONLY raw valid JSON.
JSON:
${JSON.stringify(payloadToTranslate)}`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo-1106',
          messages: [{ role: 'system', content: prompt }],
          temperature: 0.3,
          response_format: { type: "json_object" }
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${await response.text()}`)
      }

      const aiData = await response.json()
      const content = aiData.choices[0].message.content
      
      let translated
      try {
        translated = JSON.parse(content)
      } catch (e) {
        const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim()
        translated = JSON.parse(jsonStr)
      }

      const { data: newSection, error: secErr } = await supabaseAdmin.from('sections').insert({
        aircraft_id: aircraft_id,
        section_number: section.section_number,
        section_title: translated.section_title || section.section_title,
        content: section.content,
        language: target_lang
      }).select().single()

      if (secErr || !newSection) throw secErr || new Error('Failed to insert section')

      const subIdMap: Record<string, string> = {}

      if (translated.subsections && translated.subsections.length > 0) {
        for (const tSub of translated.subsections) {
          const oldSub = subsections?.find(s => s.id === tSub.id)
          if (oldSub) {
            const { data: newSub } = await supabaseAdmin.from('subsections').insert({
              section_id: newSection.id,
              title: tSub.title || oldSub.title,
              description: tSub.description || oldSub.description,
              order_index: oldSub.order_index
            }).select().single()
            if (newSub) subIdMap[oldSub.id] = newSub.id
          }
        }
      }

      if (translated.texts && translated.texts.length > 0) {
        const newTexts = translated.texts.map((tText: any) => {
          const oldText = texts?.find(t => t.id === tText.id)
          return oldText ? {
            section_id: newSection.id,
            subsection_id: oldText.subsection_id ? subIdMap[oldText.subsection_id] : null,
            content: tText.content || oldText.content,
            order_index: oldText.order_index
          } : null
        }).filter(Boolean)
        if (newTexts.length > 0) await supabaseAdmin.from('texts').insert(newTexts)
      }

      if (translated.tables && translated.tables.length > 0) {
        const newTables = translated.tables.map((tTable: any) => {
          const oldTable = tables?.find(t => t.id === tTable.id)
          return oldTable ? {
            section_id: newSection.id,
            subsection_id: oldTable.subsection_id ? subIdMap[oldTable.subsection_id] : null,
            table_data: tTable.table_data || oldTable.table_data,
            order_index: oldTable.order_index
          } : null
        }).filter(Boolean)
        if (newTables.length > 0) await supabaseAdmin.from('tables').insert(newTables)
      }

      if (translated.graphs && translated.graphs.length > 0) {
        const newGraphs = translated.graphs.map((tGraph: any) => {
          const oldGraph = graphs?.find(g => g.id === tGraph.id)
          return oldGraph ? {
            section_id: newSection.id,
            subsection_id: oldGraph.subsection_id ? subIdMap[oldGraph.subsection_id] : null,
            graph_type: oldGraph.graph_type,
            graph_data: { ...oldGraph.graph_data, ...tGraph.graph_data },
            order_index: oldGraph.order_index
          } : null
        }).filter(Boolean)
        if (newGraphs.length > 0) await supabaseAdmin.from('graphs').insert(newGraphs)
      }

      if (images && images.length > 0) {
        const newImages = images.map(img => ({
          section_id: newSection.id,
          subsection_id: img.subsection_id ? subIdMap[img.subsection_id] : null,
          image_url: img.image_url,
          order_index: img.order_index
        }))
        await supabaseAdmin.from('images').insert(newImages)
      }

      if (translated.videos && translated.videos.length > 0) {
        const newVideos = translated.videos.map((tVid: any) => {
          const oldVid = videos?.find(v => v.id === tVid.id)
          return oldVid ? {
            section_id: newSection.id,
            subsection_id: oldVid.subsection_id ? subIdMap[oldVid.subsection_id] : null,
            title: tVid.title || oldVid.title,
            video_url: oldVid.video_url,
            video_type: oldVid.video_type,
            order_index: oldVid.order_index
          } : null
        }).filter(Boolean)
        if (newVideos.length > 0) await supabaseAdmin.from('videos').insert(newVideos)
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
