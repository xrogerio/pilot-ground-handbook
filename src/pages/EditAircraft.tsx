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
    description: '',
    imageUrl: '',
    table: null,
    chart: null,
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
          const [imagesRes, tablesRes, graphsRes] = await Promise.all([
            supabase.from('images').select('*').eq('section_id', section.id).limit(1),
            supabase.from('tables').select('*').eq('section_id', section.id).limit(1),
            supabase.from('graphs').select('*').eq('section_id', section.id).limit(1),
          ])

          setFormData({
            title: section.section_title || '',
            description: section.content || '',
            imageUrl: imagesRes.data?.[0]?.image_url || '',
            table: (tablesRes.data?.[0]?.table_data as any) || null,
            chart: (graphsRes.data?.[0]?.graph_data as any) || null,
          })
        } else {
          const defaultTitle = HANDBOOK_SECTIONS.find((s) => s.id === activeSectionId)?.title || ''
          setFormData({
            title: defaultTitle,
            description: '',
            imageUrl: '',
            table: null,
            chart: null,
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
            content: formData.description || '',
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
            content: formData.description || '',
          })
          .eq('id', section.id)
          .select()
          .single()
        if (res.error) throw res.error
      }

      await supabase.from('images').delete().eq('section_id', section.id)
      if (formData.imageUrl) {
        await supabase
          .from('images')
          .insert({ section_id: section.id, image_url: formData.imageUrl })
      }

      await supabase.from('tables').delete().eq('section_id', section.id)
      if (formData.table) {
        await supabase
          .from('tables')
          .insert({ section_id: section.id, table_data: formData.table as any })
      }

      await supabase.from('graphs').delete().eq('section_id', section.id)
      if (formData.chart) {
        await supabase.from('graphs').insert({
          section_id: section.id,
          graph_type: formData.chart.type,
          graph_data: formData.chart as any,
        })
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
