import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Aircraft, useAppContext } from '@/contexts/AppContext'
import { useToast } from '@/hooks/use-toast'

interface AircraftCardProps {
  aircraft: Aircraft
}

export function AircraftCard({ aircraft }: AircraftCardProps) {
  const { role, deleteAircraft } = useAppContext()
  const { toast } = useToast()

  const progress = aircraft.progress
  const isComplete = progress === 100

  const handleDelete = async () => {
    try {
      await deleteAircraft(aircraft.id)
      toast({
        title: 'Aeronave excluída',
        description: `${aircraft.name} foi removida com sucesso.`,
      })
    } catch (error) {
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a aeronave.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group animate-fade-in flex flex-col h-full">
      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
        <img
          src={aircraft.imageUrl}
          alt={aircraft.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </AspectRatio>
      <CardHeader className="p-5 pb-2 flex-grow">
        <CardTitle className="text-xl font-bold text-primary">{aircraft.name}</CardTitle>
      </CardHeader>

      {role === 'aluno' && (
        <CardContent className="p-5 pt-0 pb-5">
          <div className="flex items-center justify-between mt-2 mb-3">
            <span className="text-sm font-medium text-muted-foreground">Progresso</span>
            <Badge
              variant={isComplete ? 'default' : 'secondary'}
              className={
                isComplete
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-none'
              }
            >
              {progress}%
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      )}

      <CardFooter className="p-5 pt-0 flex gap-2 mt-auto">
        <Button className="flex-1 active:scale-95 transition-transform font-semibold" asChild>
          <Link to={`/aircraft/${aircraft.id}`}>Visualizar Detalhes</Link>
        </Button>
        {role === 'adm' && (
          <>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="active:scale-95 transition-transform hover:bg-accent hover:text-accent-foreground"
                    asChild
                  >
                    <Link to={`/aircraft/${aircraft.id}/edit`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Editar Aeronave</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 active:scale-95 transition-transform"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Excluir Aeronave</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
