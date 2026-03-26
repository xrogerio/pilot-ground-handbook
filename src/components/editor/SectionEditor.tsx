import { SectionFormData, SubsectionData } from '@/types/editor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SubsectionEditor } from './SubsectionEditor'
import { useState } from 'react'

interface SectionEditorProps {
  data: SectionFormData
  onChange: (data: SectionFormData) => void
}

export function SectionEditor({ data, onChange }: SectionEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  if (!data) return null

  const addSubsection = () => {
    const newId = crypto.randomUUID()
    onChange({
      ...data,
      subsections: [
        ...(data.subsections || []),
        {
          id: newId,
          title: `Subseção ${(data.subsections?.length || 0) + 1}`,
          artifacts: [],
        },
      ],
    })

    setTimeout(() => {
      document
        .getElementById(`sub-${newId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const updateSubsection = (index: number, sub: SubsectionData) => {
    const newSubs = [...data.subsections]
    newSubs[index] = sub
    onChange({ ...data, subsections: newSubs })
  }

  const removeSubsection = (index: number) => {
    const newSubs = data.subsections.filter((_, i) => i !== index)
    onChange({ ...data, subsections: newSubs })
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newSubs = [...data.subsections]
    const draggedItem = newSubs[draggedIndex]
    newSubs.splice(draggedIndex, 1)
    newSubs.splice(index, 0, draggedItem)

    setDraggedIndex(index)
    onChange({ ...data, subsections: newSubs })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <Card className="border-blue-100 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end justify-between">
            <div className="space-y-3 flex-1 w-full">
              <Label htmlFor="title" className="text-base text-slate-700 font-semibold">
                Título da Seção
              </Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                className="text-lg font-medium h-12 bg-white"
              />
            </div>
            <Button
              onClick={addSubsection}
              className="gap-2 shrink-0 bg-blue-600 hover:bg-blue-700 text-white h-12 px-6"
            >
              <Plus className="w-5 h-5" /> Adicionar Subseção
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {data.subsections?.map((sub, i) => (
          <div
            key={sub.id}
            id={`sub-${sub.id}`}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragEnter={(e) => handleDragEnter(e, i)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            className={`transition-opacity duration-200 ${draggedIndex === i ? 'opacity-40' : 'opacity-100'}`}
          >
            <SubsectionEditor
              subsection={sub}
              onChange={(s) => updateSubsection(i, s)}
              onRemove={() => removeSubsection(i)}
            />
          </div>
        ))}

        {(!data.subsections || data.subsections.length === 0) && (
          <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center">
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <Plus className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-lg font-medium text-slate-600">Nenhuma subseção criada</p>
            <p className="text-slate-500 mt-1">
              Clique em "Adicionar Subseção" para começar a estruturar seu conteúdo.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
