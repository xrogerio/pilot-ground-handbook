import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Save, X } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { HANDBOOK_SECTIONS, getMockHandbookContent } from '@/data/mockHandbookData'
import { SectionEditor } from '@/components/editor/SectionEditor'
import { SectionFormData } from '@/types/editor'

export default function EditAircraft() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { role, aircrafts } = useAppContext()

  const aircraft = useMemo(() => aircrafts.find((a) => a.id === id), [aircrafts, id])
  const [formData, setFormData] = useState<Record<string, SectionFormData>>({})
  const [activeTab, setActiveTab] = useState(searchParams.get('section') || HANDBOOK_SECTIONS[0].id)

  useEffect(() => {
    if (role !== 'adm') {
      toast.error('Acesso negado. Apenas administradores podem editar.')
      navigate(`/aircraft/${id}`)
      return
    }

    if (aircraft) {
      const initialData: Record<string, SectionFormData> = {}
      HANDBOOK_SECTIONS.forEach((section) => {
        const blocks = getMockHandbookContent(aircraft.id, section.id)
        const description = blocks
          .filter((b) => b.type === 'text')
          .map((b) => b.content)
          .join('\n\n')
        const imageUrl = blocks.find((b) => b.type === 'image')?.url || ''
        const table = (blocks.find((b) => b.type === 'table') as any) || null
        const chartBlock = (blocks.find((b) => b.type === 'chart') as any) || null

        let chart = null
        if (chartBlock) {
          chart = {
            title: chartBlock.title,
            type: 'line' as const,
            data: chartBlock.data.map((d: any) => ({
              label: d[chartBlock.xKey]?.toString() || '',
              value: d[chartBlock.lines?.[0]?.key] || 0,
            })),
          }
        }

        initialData[section.id] = {
          title: section.title,
          description,
          imageUrl,
          table: table
            ? {
                title: table.title,
                headers: [...table.headers],
                rows: table.rows.map((r: any[]) => [...r]),
              }
            : null,
          chart,
        }
      })
      setFormData(initialData)
    }
  }, [id, aircraft, role, navigate])

  if (!aircraft || Object.keys(formData).length === 0) return null

  const handleSave = () => {
    toast.success('Alterações salvas com sucesso!')
    navigate(`/aircraft/${id}`)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Editar Manual</h1>
          <p className="text-muted-foreground">{aircraft.name}</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => navigate(`/aircraft/${id}`)}
            className="flex-1 sm:flex-none"
          >
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1 sm:flex-none">
            <Save className="w-4 h-4 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollArea className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-1 mb-6">
          <TabsList className="flex w-max min-w-full justify-start bg-transparent h-auto p-1 gap-1">
            {HANDBOOK_SECTIONS.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {HANDBOOK_SECTIONS.map((section) => (
          <TabsContent
            key={section.id}
            value={section.id}
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <SectionEditor
              data={formData[section.id]}
              onChange={(newData) => setFormData((prev) => ({ ...prev, [section.id]: newData }))}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
