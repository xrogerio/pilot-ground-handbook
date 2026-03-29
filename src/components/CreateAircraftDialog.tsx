import { useState, useEffect } from 'react'
import { Loader2, Wand2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

interface CreateAircraftDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateAircraftDialog({ open, onOpenChange, onSuccess }: CreateAircraftDialogProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('manual')
  const [region, setRegion] = useState('brasil')
  const [suggesting, setSuggesting] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    imageUrl: '',
    language: 'pt-BR',
    specs: null as any,
  })

  useEffect(() => {
    if (open) {
      setFormData({ name: '', model: '', imageUrl: '', language: 'pt-BR', specs: null })
      setActiveTab('manual')
      setSuggestions([])
    }
  }, [open])

  const handleSuggest = async () => {
    setSuggesting(true)
    setSuggestions([])
    try {
      const { data, error } = await supabase.functions.invoke('suggest-aircraft', {
        body: { region },
      })

      if (error) throw error
      if (data?.error) throw new Error(data.error)

      if (data?.suggestions) {
        setSuggestions(data.suggestions)
      } else {
        throw new Error('Formato inválido retornado pela IA')
      }
    } catch (error: any) {
      toast({
        title: 'Erro na busca',
        description: error.message || 'Não foi possível buscar sugestões. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setSuggesting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'O nome da aeronave não pode estar vazio.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('aircraft').insert({
        name: formData.name.trim(),
        model: formData.model.trim() || null,
        image_url: formData.imageUrl.trim() || null,
        language: formData.language,
        specs: formData.specs,
        created_by: user?.id,
      })

      if (error) throw error

      toast({
        title: 'Aeronave criada',
        description: 'A nova aeronave foi adicionada com sucesso à frota.',
      })
      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: 'Erro ao criar',
        description: 'Ocorreu um problema ao tentar salvar a aeronave. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Aeronave</DialogTitle>
          <DialogDescription>
            Adicione uma nova aeronave à frota manualmente ou use sugestões da IA.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="ai">Sugestões IA</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Aeronave *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Cessna 172"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  placeholder="Ex: C172S"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma Base</Label>
                <select
                  id="language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="pt-BR">Português (BR)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Salvar Aeronave
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Região de Busca</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="brasil">Brasil</option>
                    <option value="mundo">Mundo</option>
                  </select>
                </div>
                <Button type="button" onClick={handleSuggest} disabled={suggesting}>
                  {suggesting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  Buscar
                </Button>
              </div>

              {suggestions.length > 0 && (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {suggestions.map((sug, idx) => (
                      <Card key={idx}>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">{sug.name}</CardTitle>
                          <CardDescription>{sug.model}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                          <p className="line-clamp-2">{sug.summary}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => {
                              setFormData({
                                name: sug.name,
                                model: sug.model || '',
                                imageUrl: sug.image_url || '',
                                language: 'pt-BR',
                                specs: {
                                  summary: sug.summary,
                                  performance_table: sug.performance_table,
                                  performance_graph: sug.performance_graph,
                                },
                              })
                              setActiveTab('manual')
                            }}
                          >
                            Usar esta sugestão
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
