import { useState, useEffect } from 'react'
import { Loader2, Settings2 } from 'lucide-react'
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
import { useToast } from '@/hooks/use-toast'
import { useAppContext } from '@/contexts/AppContext'

interface EditSpecsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  aircraftId: string | null
}

export function EditSpecsDialog({ open, onOpenChange, aircraftId }: EditSpecsDialogProps) {
  const { aircrafts, refreshAircrafts } = useAppContext()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    maxSpeed: '',
    range: '',
    maxWeight: '',
    fuelCapacity: '',
    seating: '',
  })

  const aircraft = aircrafts.find((a) => a.id === aircraftId)

  useEffect(() => {
    if (open && aircraft) {
      setFormData({
        maxSpeed: aircraft.specs?.maxSpeed?.toString() || '',
        range: aircraft.specs?.range?.toString() || '',
        maxWeight: aircraft.specs?.maxWeight?.toString() || '',
        fuelCapacity: aircraft.specs?.fuelCapacity?.toString() || '',
        seating: aircraft.specs?.seating?.toString() || '',
      })
    }
  }, [open, aircraft])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!aircraftId) return

    setLoading(true)
    try {
      const specs = {
        maxSpeed: Number(formData.maxSpeed) || 0,
        range: Number(formData.range) || 0,
        maxWeight: Number(formData.maxWeight) || 0,
        fuelCapacity: Number(formData.fuelCapacity) || 0,
        seating: Number(formData.seating) || 0,
      }

      const { error } = await supabase
        .from('aircraft')
        .update({ specs } as any)
        .eq('id', aircraftId)

      if (error) throw error

      toast({
        title: 'Especificações atualizadas',
        description: 'Os dados comparativos foram salvos com sucesso.',
      })
      await refreshAircrafts()
      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível atualizar as especificações.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            Editar Especificações
          </DialogTitle>
          <DialogDescription>
            Ajuste os dados de performance para {aircraft?.name}. Estes dados serão usados no
            dashboard comparativo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Velocidade Máxima (KIAS)</Label>
              <Input
                type="number"
                placeholder="Ex: 145"
                value={formData.maxSpeed}
                onChange={(e) => setFormData({ ...formData, maxSpeed: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Autonomia (NM)</Label>
              <Input
                type="number"
                placeholder="Ex: 600"
                value={formData.range}
                onChange={(e) => setFormData({ ...formData, range: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Peso Máximo (lbs)</Label>
              <Input
                type="number"
                placeholder="Ex: 2400"
                value={formData.maxWeight}
                onChange={(e) => setFormData({ ...formData, maxWeight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Capac. Combustível (Gal)</Label>
              <Input
                type="number"
                placeholder="Ex: 50"
                value={formData.fuelCapacity}
                onChange={(e) => setFormData({ ...formData, fuelCapacity: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Assentos</Label>
              <Input
                type="number"
                placeholder="Ex: 4"
                value={formData.seating}
                onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
              />
            </div>
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
              Salvar Dados
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
