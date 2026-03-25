import { SubsectionData } from '@/types/editor'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GripVertical, ImageIcon, Plus, Trash2 } from 'lucide-react'
import { TableBuilder } from './TableBuilder'
import { ChartConfigurator } from './ChartConfigurator'

interface SubsectionEditorProps {
  subsection: SubsectionData
  onChange: (sub: SubsectionData) => void
  onRemove: () => void
}

export function SubsectionEditor({ subsection, onChange, onRemove }: SubsectionEditorProps) {
  const addImage = () => {
    onChange({
      ...subsection,
      images: [...subsection.images, { id: crypto.randomUUID(), url: '' }],
    })
  }

  const updateImage = (index: number, url: string) => {
    const newImages = [...subsection.images]
    newImages[index] = { ...newImages[index], url }
    onChange({ ...subsection, images: newImages })
  }

  const removeImage = (index: number) => {
    const newImages = subsection.images.filter((_, i) => i !== index)
    onChange({ ...subsection, images: newImages })
  }

  const addTable = () => {
    onChange({
      ...subsection,
      tables: [
        ...subsection.tables,
        { title: 'Nova Tabela', headers: ['Coluna 1', 'Coluna 2'], rows: [['', '']] },
      ],
    })
  }

  const updateTable = (index: number, table: any) => {
    if (!table) {
      const newTables = subsection.tables.filter((_, i) => i !== index)
      onChange({ ...subsection, tables: newTables })
      return
    }
    const newTables = [...subsection.tables]
    newTables[index] = table
    onChange({ ...subsection, tables: newTables })
  }

  const addChart = () => {
    onChange({
      ...subsection,
      charts: [
        ...subsection.charts,
        { title: 'Novo Gráfico', type: 'line', data: [{ label: 'Ponto 1', value: 10 }] },
      ],
    })
  }

  const updateChart = (index: number, chart: any) => {
    if (!chart) {
      const newCharts = subsection.charts.filter((_, i) => i !== index)
      onChange({ ...subsection, charts: newCharts })
      return
    }
    const newCharts = [...subsection.charts]
    newCharts[index] = chart
    onChange({ ...subsection, charts: newCharts })
  }

  return (
    <Card className="border-slate-300 shadow-sm relative group bg-white">
      <div className="absolute left-2 top-6 cursor-grab active:cursor-grabbing p-2 text-slate-400 hover:text-slate-600 z-10">
        <GripVertical className="w-5 h-5" />
      </div>

      <CardHeader className="flex flex-row items-center justify-between pb-4 pl-12 pr-6 border-b border-slate-100">
        <Input
          value={subsection.title}
          onChange={(e) => onChange({ ...subsection, title: e.target.value })}
          className="text-xl font-semibold bg-transparent border-transparent hover:border-input focus:border-input px-2 max-w-sm h-10"
          placeholder="Título da Subseção"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-red-500 shrink-0"
          onClick={onRemove}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-8 pl-12 pr-6 pt-6 pb-6">
        <div className="space-y-2">
          <Label className="text-base text-slate-700 font-medium">Descrição Técnica</Label>
          <Textarea
            value={subsection.description}
            onChange={(e) => onChange({ ...subsection, description: e.target.value })}
            className="min-h-[100px] bg-slate-50/50"
            placeholder="Descreva os detalhes desta subseção..."
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base text-slate-700 font-medium border-b border-slate-100 pb-2 block">
            Imagens da Subseção
          </Label>
          <div className="space-y-4">
            {subsection.images.map((img, i) => (
              <div
                key={img.id || i}
                className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200"
              >
                <div className="flex-1 space-y-3 w-full">
                  <Input
                    value={img.url}
                    onChange={(e) => updateImage(i, e.target.value)}
                    placeholder="URL da imagem (web)..."
                    className="bg-white"
                  />
                  <Button variant="outline" className="w-full gap-2 bg-white hover:bg-slate-100">
                    <ImageIcon className="w-4 h-4" /> Escolher Arquivo Local
                  </Button>
                </div>
                {img.url && (
                  <div className="w-full sm:w-36 h-28 rounded-lg border border-slate-200 overflow-hidden bg-white shrink-0 shadow-sm">
                    <img
                      src={img.url}
                      alt="Preview"
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-500 shrink-0 sm:mt-1"
                  onClick={() => removeImage(i)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={addImage}
              className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Plus className="w-4 h-4" /> Adicionar Imagem
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <Label className="text-base text-slate-700 font-medium">Tabelas</Label>
            <Button
              variant="secondary"
              size="sm"
              onClick={addTable}
              className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Plus className="w-4 h-4" /> Adicionar Tabela
            </Button>
          </div>
          <div className="space-y-6">
            {subsection.tables.map((table, i) => (
              <TableBuilder key={i} table={table} onChange={(t) => updateTable(i, t)} />
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <Label className="text-base text-slate-700 font-medium">Gráficos</Label>
            <Button
              variant="secondary"
              size="sm"
              onClick={addChart}
              className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Plus className="w-4 h-4" /> Adicionar Gráfico
            </Button>
          </div>
          <div className="space-y-6">
            {subsection.charts.map((chart, i) => (
              <ChartConfigurator key={i} chart={chart} onChange={(c) => updateChart(i, c)} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
