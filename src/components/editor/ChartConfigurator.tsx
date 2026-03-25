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
  if (!chart) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-3 bg-slate-100 rounded-full">
            <BarChart className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <p className="text-slate-600 font-medium">Nenhum gráfico configurado</p>
            <p className="text-sm text-slate-400 mb-4">
              Adicione um gráfico para representar visualmente os dados de desempenho.
            </p>
          </div>
          <Button
            onClick={() =>
              onChange({
                title: 'Novo Gráfico',
                type: 'line',
                data: [{ label: 'Ponto 1', value: 10 }],
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar Gráfico
          </Button>
        </CardContent>
      </Card>
    )
  }

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" />
          Configuração de Gráfico
        </CardTitle>
        <Button variant="destructive" size="sm" onClick={() => onChange(null)}>
          <Trash2 className="w-4 h-4 mr-2" /> Remover Gráfico
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Título do Gráfico</Label>
            <Input
              value={chart.title}
              onChange={(e) => onChange({ ...chart, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Gráfico</Label>
            <Select
              value={chart.type}
              onValueChange={(val: 'line' | 'bar' | 'pie') => onChange({ ...chart, type: val })}
            >
              <SelectTrigger>
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
            <Button variant="outline" size="sm" onClick={addDataPoint}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar Ponto
            </Button>
          </div>
          <div className="space-y-2">
            {chart.data.map((point, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input
                  value={point.label}
                  onChange={(e) => updateDataPoint(i, 'label', e.target.value)}
                  placeholder="Rótulo"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={point.value}
                  onChange={(e) => updateDataPoint(i, 'value', parseFloat(e.target.value) || 0)}
                  placeholder="Valor"
                  className="w-32"
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
              <p className="text-sm text-slate-500 text-center py-4 border rounded bg-slate-50">
                Nenhum dado adicionado.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
