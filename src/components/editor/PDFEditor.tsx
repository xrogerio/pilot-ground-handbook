import { PDFData } from '@/types/editor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Trash2, Upload } from 'lucide-react'

interface PDFEditorProps {
  data: PDFData[]
  onChange: (data: PDFData[]) => void
}

export function PDFEditor({ data, onChange }: PDFEditorProps) {
  const addPDF = () => {
    onChange([...data, { title: 'Novo Documento', url: '' }])
  }

  const updatePDF = (index: number, pdf: PDFData) => {
    const newData = [...data]
    newData[index] = pdf
    onChange(newData)
  }

  const removePDF = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    onChange(newData)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <Card className="border-blue-100 shadow-md bg-white">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Documentos Originais</h2>
            <p className="text-sm text-slate-500 mt-1">
              Faça upload de manuais, checklists e outros PDFs importantes.
            </p>
          </div>
          <Button
            onClick={addPDF}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shrink-0"
          >
            <Plus className="w-5 h-5" /> Adicionar PDF
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {data.map((pdf, i) => (
          <Card key={i} className="border-slate-200 bg-white group">
            <CardContent className="p-5 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-sm font-semibold text-slate-700">Título do Documento</Label>
                <Input
                  value={pdf.title}
                  onChange={(e) => updatePDF(i, { ...pdf, title: e.target.value })}
                  placeholder="Ex: Manual de Operações (POH)"
                  className="bg-white h-11"
                />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Label className="text-sm font-semibold text-slate-700">Arquivo ou URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={pdf.url}
                    onChange={(e) => updatePDF(i, { ...pdf, url: e.target.value })}
                    placeholder="Cole a URL do PDF..."
                    className="bg-white h-11"
                  />
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id={`pdf-upload-${i}`}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const localUrl = URL.createObjectURL(file)
                        updatePDF(i, { ...pdf, url: '', localFile: file, localUrl })
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="bg-slate-50 hover:bg-slate-100 h-11 shrink-0 px-4"
                    onClick={() => document.getElementById(`pdf-upload-${i}`)?.click()}
                    title="Fazer upload de arquivo local"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Local
                  </Button>
                </div>
                {(pdf.localFile || pdf.url) && (
                  <p className="text-xs font-medium mt-1 truncate max-w-[300px] sm:max-w-full text-emerald-600">
                    {pdf.localFile ? `Arquivo pronto: ${pdf.localFile.name}` : 'Link preenchido'}
                  </p>
                )}
              </div>
              <div className="pt-0 lg:pt-7 shrink-0 w-full lg:w-auto flex justify-end">
                <Button
                  variant="ghost"
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-11 w-11 p-0 rounded-full"
                  onClick={() => removePDF(i)}
                  title="Remover documento"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center">
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <FileText className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-lg font-medium text-slate-600">Nenhum documento adicionado</p>
            <p className="text-slate-500 mt-1">
              Clique em "Adicionar PDF" para começar a anexar manuais.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
