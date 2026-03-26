import { ChartData } from '@/types/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BarChart, Plus, Trash2 } from 'lucide-react'

interface ChartConfiguratorProps {
  chart: ChartData | null
  onChange: (chart: ChartData | null) => void
}

export function ChartConfigurator({ chart, onChange }: ChartConfiguratorProps) {
  if (!chart) return null

  const addDataPoint = () => {
    onChange({
      ...chart,
      data: [...chart.data, { label: `Ponto ${chart.data.length + 1}`, value: 0 }],
    })
  }

  const removeDataPoint = (index: number) => {
    onChange({
      ...chart,
      data: chart.data.filter((_, i) => i !== index),
    })
  }

  const updateDataPoint = (index: number, field: 'label' | 'value', val: string | number) => {
    const newData = [...chart.data]
    newData[index] = { ...newData[index], [field]: val }
    onChange({ ...chart, data: newData })
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-600">
          <BarChart className="w-4 h-4" />
          Configuração de Gráfico
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Título do Gráfico</Label>
            <Input
              value={chart.title}
              onChange={(e) => onChange({ ...chart, title: e.target.value })}
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Gráfico</Label>
            <Select
              value={chart.type}
              onValueChange={(val: 'line' | 'bar' | 'pie') => onChange({ ...chart, type: val })}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Linhas</SelectItem>
                <SelectItem value="bar">Barras</SelectItem>
                <SelectItem value="pie">Pizza</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Dados do Gráfico (Rótulo / Valor)</Label>
            <Button variant="outline" size="sm" onClick={addDataPoint} className="bg-white">
              <Plus className="w-4 h-4 mr-1" /> Adicionar Ponto
            </Button>
          </div>
          <div className="space-y-2">
            {chart.data.map((point, i) => (
              <div
                key={i}
                className="flex gap-2 items-center bg-white p-2 rounded-lg border border-slate-200"
              >
                <Input
                  value={point.label}
                  onChange={(e) => updateDataPoint(i, 'label', e.target.value)}
                  placeholder="Rótulo"
                  className="flex-1 border-transparent focus-visible:ring-0"
                />
                <div className="w-px h-6 bg-slate-200"></div>
                <Input
                  type="number"
                  value={point.value}
                  onChange={(e) => updateDataPoint(i, 'value', parseFloat(e.target.value) || 0)}
                  placeholder="Valor"
                  className="w-32 border-transparent focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-500 shrink-0"
                  onClick={() => removeDataPoint(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {chart.data.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4 border rounded bg-white">
                Nenhum dado adicionado.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
