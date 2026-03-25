import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { SectionEditor } from '@/components/editor/SectionEditor'
import { HandbookSidebar } from '@/components/HandbookSidebar'
import { SectionFormData } from '@/types/editor'
import { supabase } from '@/lib/supabase/client'
import { HANDBOOK_SECTIONS } from '@/data/mockHandbookData'
import { useAppContext } from '@/contexts/AppContext'

export default function EditAircraft() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { toast } = useToast()
  const { aircrafts, role } = useAppContext()

  const sectionQuery = searchParams.get('section')
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sectionQuery || HANDBOOK_SECTIONS[0].id,
  )

  const [formData, setFormData] = useState<SectionFormData>({
    title: '',
    subsections: [],
  })
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
        const { data: section } = await supabase
          .from('sections')
          .select('*')
          .eq('aircraft_id', id)
          .eq('section_number', parseInt(activeSectionId))
          .maybeSingle()

        if (section) {
          const { data: subsections } = await (supabase as any)
            .from('subsections')
            .select('*')
            .eq('section_id', section.id)
            .order('order_index', { ascending: true })

          if (subsections && subsections.length > 0) {
            const subIds = subsections.map((s: any) => s.id)
            const [imagesRes, tablesRes, graphsRes] = await Promise.all([
              (supabase as any).from('images').select('*').in('subsection_id', subIds),
              (supabase as any).from('tables').select('*').in('subsection_id', subIds),
              (supabase as any).from('graphs').select('*').in('subsection_id', subIds),
            ])

            const formattedSubsections = subsections.map((sub: any) => ({
              id: sub.id,
              title: sub.title || '',
              description: sub.description || '',
              images:
                imagesRes.data
                  ?.filter((img: any) => img.subsection_id === sub.id)
                  .map((img: any) => ({ id: img.id, url: img.image_url })) || [],
              tables:
                tablesRes.data
                  ?.filter((tbl: any) => tbl.subsection_id === sub.id)
                  .map((tbl: any) => ({ id: tbl.id, ...(tbl.table_data as any) })) || [],
              charts:
                graphsRes.data
                  ?.filter((g: any) => g.subsection_id === sub.id)
                  .map((g: any) => ({ id: g.id, type: g.graph_type, ...(g.graph_data as any) })) ||
                [],
            }))

            setFormData({
              title: section.section_title || '',
              subsections: formattedSubsections,
            })
          } else {
            // Legacy fetch
            const [imagesRes, tablesRes, graphsRes] = await Promise.all([
              supabase.from('images').select('*').eq('section_id', section.id),
              supabase.from('tables').select('*').eq('section_id', section.id),
              supabase.from('graphs').select('*').eq('section_id', section.id),
            ])

            if (
              section.content ||
              imagesRes.data?.length ||
              tablesRes.data?.length ||
              graphsRes.data?.length
            ) {
              setFormData({
                title: section.section_title || '',
                subsections: [
                  {
                    id: crypto.randomUUID(),
                    title: 'Visão Geral',
                    description: section.content || '',
                    images:
                      imagesRes.data?.map((img) => ({ id: img.id, url: img.image_url })) || [],
                    tables:
                      tablesRes.data?.map((tbl) => ({ id: tbl.id, ...(tbl.table_data as any) })) ||
                      [],
                    charts:
                      graphsRes.data?.map((g) => ({
                        id: g.id,
                        type: g.graph_type,
                        ...(g.graph_data as any),
                      })) || [],
                  },
                ],
              })
            } else {
              setFormData({
                title: section.section_title || '',
                subsections: [],
              })
            }
          }
        } else {
          const defaultTitle = HANDBOOK_SECTIONS.find((s) => s.id === activeSectionId)?.title || ''
          setFormData({
            title: defaultTitle,
            subsections: [],
          })
        }
      } catch (err) {
        console.error('Error fetching section', err)
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
            description: sub.description,
            order_index: i,
          })
          .select()
          .single()

        if (subErr) throw subErr

        const validImages = sub.images.filter((img) => img.url.trim() !== '')
        if (validImages.length > 0) {
          await (supabase as any).from('images').insert(
            validImages.map((img) => ({
              section_id: section.id,
              subsection_id: newSub.id,
              image_url: img.url,
            })),
          )
        }

        if (sub.tables.length > 0) {
          await (supabase as any).from('tables').insert(
            sub.tables.map((tbl) => ({
              section_id: section.id,
              subsection_id: newSub.id,
              table_data: tbl as any,
            })),
          )
        }

        if (sub.charts.length > 0) {
          await (supabase as any).from('graphs').insert(
            sub.charts.map((chart) => ({
              section_id: section.id,
              subsection_id: newSub.id,
              graph_type: chart.type,
              graph_data: chart as any,
            })),
          )
        }
      }

      toast({ title: 'Sucesso', description: 'Seção salva com sucesso na base de dados.' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Erro', description: 'Erro ao salvar seção.', variant: 'destructive' })
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
            Seção atual: {HANDBOOK_SECTIONS.find((s) => s.id === activeSectionId)?.title}
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
            <SectionEditor data={formData} onChange={setFormData} />
          )}
        </div>
      </div>
    </div>
  )
}
