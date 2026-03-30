import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
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
    }
  }, [open])

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
          <DialogDescription>Adicione uma nova aeronave à frota manualmente.</DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  )
}
