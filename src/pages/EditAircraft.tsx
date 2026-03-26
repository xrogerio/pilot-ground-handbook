import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { SectionEditor } from '@/components/editor/SectionEditor'
import { PDFEditor } from '@/components/editor/PDFEditor'
import { HandbookSidebar } from '@/components/HandbookSidebar'
import {
  SectionFormData,
  PDFData,
  Artifact,
  TextData,
  ImageData,
  TableData,
  ChartData,
} from '@/types/editor'
import { supabase } from '@/lib/supabase/client'
import { HANDBOOK_SECTIONS } from '@/data/mockHandbookData'
import { useAppContext } from '@/contexts/AppContext'

export default function EditAircraft() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { toast } = useToast()
  const { aircrafts, role, refreshAircrafts } = useAppContext()

  const sectionQuery = searchParams.get('section')
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sectionQuery || HANDBOOK_SECTIONS[0].id,
  )

  const [formData, setFormData] = useState<SectionFormData>({
    title: '',
    thumbnail: { url: '' },
    subsections: [],
  })
  const [pdfData, setPdfData] = useState<PDFData[]>([])

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const aircraft = aircrafts.find((a) => a.id === id)

  useEffect(() => {
    if (role === 'aluno') {
      navigate('/')
    }
  }, [role, navigate])

  useEffect(() => {
    setSearchParams({ section: activeSectionId }, { replace: true })
  }, [activeSectionId, setSearchParams])

  useEffect(() => {
    if (!id) return
    const fetchSectionData = async () => {
      setLoading(true)
      try {
        if (activeSectionId === 'docs') {
          const { data: pdfsRes } = await supabase
            .from('pdfs')
            .select('*')
            .eq('aircraft_id', id)
            .order('created_at', { ascending: true })
          if (pdfsRes) {
            setPdfData(pdfsRes.map((p: any) => ({ id: p.id, title: p.pdf_title, url: p.pdf_url })))
          } else {
            setPdfData([])
          }
          return
        }

        const [aircraftRes, sectionRes] = await Promise.all([
          supabase.from('aircraft').select('image_url').eq('id', id).single(),
          supabase
            .from('sections')
            .select('*')
            .eq('aircraft_id', id)
            .eq('section_number', parseInt(activeSectionId))
            .maybeSingle(),
        ])

        const aircraftImgUrl = aircraftRes.data?.image_url || ''
        const section = sectionRes.data

        if (section) {
          const { data: subsections } = await (supabase as any)
            .from('subsections')
            .select('*')
            .eq('section_id', section.id)
            .order('order_index', { ascending: true })

          if (subsections && subsections.length > 0) {
            const subIds = subsections.map((s: any) => s.id)
            const [imagesRes, tablesRes, graphsRes, textsRes] = await Promise.all([
              (supabase as any).from('images').select('*').in('subsection_id', subIds),
              (supabase as any).from('tables').select('*').in('subsection_id', subIds),
              (supabase as any).from('graphs').select('*').in('subsection_id', subIds),
              (supabase as any).from('texts').select('*').in('subsection_id', subIds),
            ])

            const formattedSubsections = subsections.map((sub: any) => {
              const artifacts: Artifact[] = []

              const subImages = imagesRes.data?.filter((i: any) => i.subsection_id === sub.id) || []
              const subTables = tablesRes.data?.filter((t: any) => t.subsection_id === sub.id) || []
              const subGraphs = graphsRes.data?.filter((g: any) => g.subsection_id === sub.id) || []
              const subTexts = textsRes.data?.filter((t: any) => t.subsection_id === sub.id) || []

              subTexts.forEach((t: any) =>
                artifacts.push({
                  id: t.id,
                  type: 'text',
                  data: { content: t.content },
                  order: t.order_index || 0,
                } as any),
              )
              subImages.forEach((img: any) =>
                artifacts.push({
                  id: img.id,
                  type: 'image',
                  data: { url: img.image_url },
                  order: img.order_index || 0,
                } as any),
              )
              subTables.forEach((tbl: any) =>
                artifacts.push({
                  id: tbl.id,
                  type: 'table',
                  data: tbl.table_data,
                  order: tbl.order_index || 0,
                } as any),
              )
              subGraphs.forEach((g: any) =>
                artifacts.push({
                  id: g.id,
                  type: 'chart',
                  data: { type: g.graph_type, ...g.graph_data },
                  order: g.order_index || 0,
                } as any),
              )

              if (sub.description && subTexts.length === 0) {
                artifacts.push({
                  id: crypto.randomUUID(),
                  type: 'text',
                  data: { content: sub.description },
                  order: -1,
                } as any)
              }

              artifacts.sort((a: any, b: any) => a.order - b.order)

              return {
                id: sub.id,
                title: sub.title || '',
                artifacts: artifacts.map((a) => ({ id: a.id, type: a.type, data: a.data })),
              }
            })

            setFormData({
              title: section.section_title || '',
              thumbnail: { url: aircraftImgUrl },
              subsections: formattedSubsections,
            })
          } else {
            setFormData({
              title: section.section_title || '',
              thumbnail: { url: aircraftImgUrl },
              subsections: [],
            })
          }
        } else {
          const defaultTitle = HANDBOOK_SECTIONS.find((s) => s.id === activeSectionId)?.title || ''
          setFormData({
            title: defaultTitle,
            thumbnail: { url: aircraftImgUrl },
            subsections: [],
          })
        }
      } catch (err) {
        console.error('Error fetching data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSectionData()
  }, [id, activeSectionId])

  const handleSave = async () => {
    if (!id) return
    setSaving(true)
    try {
      if (activeSectionId === 'docs') {
        const existingPdfs = await supabase.from('pdfs').select('id').eq('aircraft_id', id)
        const existingIds = existingPdfs.data?.map((p) => p.id) || []

        const currentIds = pdfData.filter((p) => p.id).map((p) => p.id)
        const idsToDelete = existingIds.filter((eid) => !currentIds.includes(eid))

        if (idsToDelete.length > 0) {
          await supabase.from('pdfs').delete().in('id', idsToDelete)
        }

        for (const pdf of pdfData) {
          let finalUrl = pdf.url

          if (!finalUrl && pdf.localFile) {
            const fileExt = pdf.localFile.name.split('.').pop()
            const fileName = `aircrafts/${id}-pdf-${crypto.randomUUID()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
              .from('pdfs')
              .upload(fileName, pdf.localFile)

            if (!uploadError) {
              const { data } = supabase.storage.from('pdfs').getPublicUrl(fileName)
              finalUrl = data.publicUrl
            }
          }

          if (finalUrl) {
            if (pdf.id) {
              await supabase
                .from('pdfs')
                .update({ pdf_title: pdf.title, pdf_url: finalUrl })
                .eq('id', pdf.id)
            } else {
              await supabase
                .from('pdfs')
                .insert({ aircraft_id: id, pdf_title: pdf.title, pdf_url: finalUrl })
            }
          }
        }

        toast({ title: 'Sucesso', description: 'Documentos salvos com sucesso na base de dados.' })

        const { data: pdfsRes } = await supabase
          .from('pdfs')
          .select('*')
          .eq('aircraft_id', id)
          .order('created_at', { ascending: true })
        if (pdfsRes) {
          setPdfData(pdfsRes.map((p: any) => ({ id: p.id, title: p.pdf_title, url: p.pdf_url })))
        }
        return
      }

      // Save aircraft thumbnail
      if (formData.thumbnail) {
        let finalThumbUrl = formData.thumbnail.url

        if (!finalThumbUrl && formData.thumbnail.localFile) {
          const fileExt = formData.thumbnail.localFile.name.split('.').pop()
          const fileName = `aircrafts/${id}-thumb-${crypto.randomUUID()}.${fileExt}`

          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, formData.thumbnail.localFile)

          if (!uploadError) {
            const { data } = supabase.storage.from('images').getPublicUrl(fileName)
            finalThumbUrl = data.publicUrl
          }
        }

        if (finalThumbUrl !== undefined) {
          await supabase
            .from('aircraft')
            .update({ image_url: finalThumbUrl || null })
            .eq('id', id)
          await refreshAircrafts()
        }
      }

      let { data: section } = await supabase
        .from('sections')
        .select('id')
        .eq('aircraft_id', id)
        .eq('section_number', parseInt(activeSectionId))
        .maybeSingle()

      if (!section) {
        const res = await supabase
          .from('sections')
          .insert({
            aircraft_id: id,
            section_number: parseInt(activeSectionId),
            section_title: formData.title || '',
            content: '',
          })
          .select()
          .single()
        if (res.error) throw res.error
        section = res.data
      } else {
        const res = await supabase
          .from('sections')
          .update({
            section_title: formData.title || '',
          })
          .eq('id', section.id)
          .select()
          .single()
        if (res.error) throw res.error
      }

      await (supabase as any).from('texts').delete().eq('section_id', section.id)
      await (supabase as any).from('images').delete().eq('section_id', section.id)
      await (supabase as any).from('tables').delete().eq('section_id', section.id)
      await (supabase as any).from('graphs').delete().eq('section_id', section.id)
      await (supabase as any).from('subsections').delete().eq('section_id', section.id)

      for (let i = 0; i < formData.subsections.length; i++) {
        const sub = formData.subsections[i]
        const { data: newSub, error: subErr } = await (supabase as any)
          .from('subsections')
          .insert({
            section_id: section.id,
            title: sub.title,
            order_index: i,
          })
          .select()
          .single()

        if (subErr) throw subErr

        if (sub.artifacts) {
          for (let j = 0; j < sub.artifacts.length; j++) {
            const artifact = sub.artifacts[j]

            if (artifact.type === 'text') {
              await (supabase as any).from('texts').insert({
                section_id: section.id,
                subsection_id: newSub.id,
                content: (artifact.data as TextData).content,
                order_index: j,
              })
            } else if (artifact.type === 'image') {
              const imgData = artifact.data as ImageData
              let finalUrl = imgData.url

              if (!finalUrl && imgData.localFile) {
                const fileExt = imgData.localFile.name.split('.').pop()
                const fileName = `${crypto.randomUUID()}.${fileExt}`
                const filePath = `aircrafts/${fileName}`

                const { error: uploadError } = await supabase.storage
                  .from('images')
                  .upload(filePath, imgData.localFile)

                if (!uploadError) {
                  const { data } = supabase.storage.from('images').getPublicUrl(filePath)
                  finalUrl = data.publicUrl
                }
              }

              if (finalUrl) {
                await (supabase as any).from('images').insert({
                  section_id: section.id,
                  subsection_id: newSub.id,
                  image_url: finalUrl,
                  order_index: j,
                })
              }
            } else if (artifact.type === 'table') {
              await (supabase as any).from('tables').insert({
                section_id: section.id,
                subsection_id: newSub.id,
                table_data: artifact.data as TableData,
                order_index: j,
              })
            } else if (artifact.type === 'chart') {
              await (supabase as any).from('graphs').insert({
                section_id: section.id,
                subsection_id: newSub.id,
                graph_type: (artifact.data as ChartData).type,
                graph_data: artifact.data as ChartData,
                order_index: j,
              })
            }
          }
        }
      }

      toast({ title: 'Sucesso', description: 'Seção salva com sucesso na base de dados.' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Erro', description: 'Erro ao salvar alterações.', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  if (!aircraft && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-4">Aeronave não encontrada</h2>
        <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-6 border-b border-slate-200">
        <div>
          <Button variant="ghost" className="mb-4 -ml-4" asChild>
            <Link to={`/aircraft/${id}?section=${activeSectionId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para {aircraft?.name || 'Aeronave'}
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Modo de Edição
          </h1>
          <p className="text-muted-foreground mt-1">
            Seção atual:{' '}
            {activeSectionId === 'docs'
              ? 'Documentos Originais'
              : HANDBOOK_SECTIONS.find((s) => s.id === activeSectionId)?.title}
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 shrink-0 bg-blue-600 hover:bg-blue-700"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Salvar Alterações
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <HandbookSidebar activeSectionId={activeSectionId} onSelect={setActiveSectionId} />

        <div className="flex-1 w-full min-w-0">
          {loading ? (
            <div className="flex h-64 items-center justify-center bg-white rounded-2xl border border-slate-200">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex flex-col">
              {activeSectionId === 'docs' ? (
                <PDFEditor data={pdfData} onChange={setPdfData} />
              ) : (
                <SectionEditor data={formData} onChange={setFormData} />
              )}

              <div className="flex justify-end -mt-4 pb-10">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="gap-2 shrink-0 bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
