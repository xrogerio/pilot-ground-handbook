import { SectionFormData } from '@/types/editor'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { TableBuilder } from './TableBuilder'
import { ChartConfigurator } from './ChartConfigurator'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'

interface SectionEditorProps {
  data: SectionFormData
  onChange: (data: SectionFormData) => void
}

export function SectionEditor({ data, onChange }: SectionEditorProps) {
  if (!data) return null

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Seção</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição Técnica</Label>
            <Textarea
              id="description"
              className="min-h-[150px]"
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem da Seção</Label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1 space-y-2 w-full">
                <Input
                  value={data.imageUrl}
                  onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
                  placeholder="URL da imagem..."
                />
                <Button variant="outline" className="w-full gap-2">
                  <ImageIcon className="w-4 h-4" /> Escolher Arquivo (Mock)
                </Button>
              </div>
              {data.imageUrl && (
                <div className="w-full sm:w-40 h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                  <img
                    src={data.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <TableBuilder table={data.table} onChange={(table) => onChange({ ...data, table })} />

      <ChartConfigurator chart={data.chart} onChange={(chart) => onChange({ ...data, chart })} />
    </div>
  )
}
