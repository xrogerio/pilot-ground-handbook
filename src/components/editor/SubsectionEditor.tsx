import { useState } from 'react'
import {
  SubsectionData,
  ArtifactType,
  TextData,
  ImageData,
  TableData,
  ChartData,
} from '@/types/editor'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  GripVertical,
  ImageIcon,
  Trash2,
  AlignLeft,
  BarChart,
  Table as TableIcon,
} from 'lucide-react'
import { TableBuilder } from './TableBuilder'
import { ChartConfigurator } from './ChartConfigurator'

interface SubsectionEditorProps {
  subsection: SubsectionData
  onChange: (sub: SubsectionData) => void
  onRemove: () => void
}

export function SubsectionEditor({ subsection, onChange, onRemove }: SubsectionEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const addArtifact = (type: ArtifactType) => {
    let data: any
    if (type === 'text') data = { content: '' }
    else if (type === 'image') data = { url: '' }
    else if (type === 'table')
      data = { title: 'Nova Tabela', headers: ['Coluna 1', 'Coluna 2'], rows: [['', '']] }
    else if (type === 'chart')
      data = { title: 'Novo Gráfico', type: 'line', data: [{ label: 'Ponto 1', value: 10 }] }

    onChange({
      ...subsection,
      artifacts: [...(subsection.artifacts || []), { id: crypto.randomUUID(), type, data }],
    })
  }

  const updateArtifact = (index: number, data: any) => {
    const newArtifacts = [...subsection.artifacts]
    newArtifacts[index] = { ...newArtifacts[index], data }
    onChange({ ...subsection, artifacts: newArtifacts })
  }

  const removeArtifact = (index: number) => {
    const newArtifacts = subsection.artifacts.filter((_, i) => i !== index)
    onChange({ ...subsection, artifacts: newArtifacts })
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation()
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (draggedIndex === null || draggedIndex === index) return

    const newArtifacts = [...subsection.artifacts]
    const draggedItem = newArtifacts[draggedIndex]
    newArtifacts.splice(draggedIndex, 1)
    newArtifacts.splice(index, 0, draggedItem)

    setDraggedIndex(index)
    onChange({ ...subsection, artifacts: newArtifacts })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, artifactIndex: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const localUrl = URL.createObjectURL(file)
      updateArtifact(artifactIndex, { url: '', localFile: file, localUrl })
    }
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

      <CardContent className="space-y-6 pl-12 pr-6 pt-6 pb-6">
        <div className="space-y-4">
          {(subsection.artifacts || []).map((artifact, i) => (
            <div
              key={artifact.id}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnter={(e) => handleDragEnter(e, i)}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDragEnd={(e) => {
                e.stopPropagation()
                setDraggedIndex(null)
              }}
              className={`transition-opacity duration-200 relative bg-slate-50 border border-slate-200 rounded-xl p-4 pr-12 group/artifact ${draggedIndex === i ? 'opacity-40' : 'opacity-100'}`}
            >
              <div className="absolute right-2 top-4 cursor-grab active:cursor-grabbing p-2 text-slate-400 hover:text-slate-600 z-10">
                <GripVertical className="w-5 h-5" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 bottom-4 text-slate-400 hover:text-red-500 z-10"
                onClick={() => removeArtifact(i)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="w-full">
                {artifact.type === 'text' && (
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600 flex items-center gap-2">
                      <AlignLeft className="w-4 h-4" /> Descrição Técnica
                    </Label>
                    <Textarea
                      value={(artifact.data as TextData).content}
                      onChange={(e) => updateArtifact(i, { content: e.target.value })}
                      className="min-h-[100px] bg-white"
                      placeholder="Descreva os detalhes desta subseção..."
                    />
                  </div>
                )}
                {artifact.type === 'image' && (
                  <div className="space-y-3">
                    <Label className="text-sm text-slate-600 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Imagem da Subseção
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="flex-1 space-y-3 w-full">
                        <Input
                          value={(artifact.data as ImageData).url}
                          onChange={(e) =>
                            updateArtifact(i, { ...artifact.data, url: e.target.value })
                          }
                          placeholder="URL da imagem (web)... (Prioridade)"
                          className="bg-white"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`file-${artifact.id}`}
                          onChange={(e) => handleFileChange(e, i)}
                        />
                        <Button
                          variant="outline"
                          className="w-full gap-2 bg-white hover:bg-slate-100"
                          onClick={() => document.getElementById(`file-${artifact.id}`)?.click()}
                        >
                          <ImageIcon className="w-4 h-4" /> Escolher Arquivo Local
                        </Button>
                      </div>
                      {((artifact.data as ImageData).url ||
                        (artifact.data as ImageData).localUrl) && (
                        <div className="w-full sm:w-36 h-28 rounded-lg border border-slate-200 overflow-hidden bg-white shrink-0 shadow-sm">
                          <img
                            src={
                              (artifact.data as ImageData).url ||
                              (artifact.data as ImageData).localUrl
                            }
                            alt="Preview"
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {artifact.type === 'table' && (
                  <TableBuilder
                    table={artifact.data as TableData}
                    onChange={(t) => (t ? updateArtifact(i, t) : removeArtifact(i))}
                  />
                )}
                {artifact.type === 'chart' && (
                  <ChartConfigurator
                    chart={artifact.data as ChartData}
                    onChange={(c) => (c ? updateArtifact(i, c) : removeArtifact(i))}
                  />
                )}
              </div>
            </div>
          ))}

          {(subsection.artifacts?.length === 0 || !subsection.artifacts) && (
            <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
              <p className="text-sm text-slate-500">
                Nenhum artefato adicionado. Escolha uma opção abaixo.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArtifact('text')}
            className="gap-2 text-slate-600"
          >
            <AlignLeft className="w-4 h-4" /> + Texto
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArtifact('image')}
            className="gap-2 text-slate-600"
          >
            <ImageIcon className="w-4 h-4" /> + Imagem
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArtifact('table')}
            className="gap-2 text-slate-600"
          >
            <TableIcon className="w-4 h-4" /> + Tabela
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArtifact('chart')}
            className="gap-2 text-slate-600"
          >
            <BarChart className="w-4 h-4" /> + Gráfico
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
