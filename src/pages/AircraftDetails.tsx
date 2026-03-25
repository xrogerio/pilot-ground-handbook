import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  Activity,
  Settings,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const MOCK_SECTIONS = [
  { id: 1, title: 'Limitações', icon: Settings, completed: true },
  { id: 2, title: 'Procedimentos Normais', icon: BookOpen, completed: true },
  { id: 3, title: 'Procedimentos de Emergência', icon: AlertTriangle, completed: true },
  { id: 4, title: 'Performance', icon: Activity, completed: true },
  { id: 5, title: 'Peso e Balanceamento', icon: Settings, completed: true },
  { id: 6, title: 'Sistemas da Aeronave', icon: Settings, completed: false },
  { id: 7, title: 'Manuseio e Serviços', icon: Settings, completed: false },
]

export default function AircraftDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { aircrafts } = useAppContext()

  const aircraft = aircrafts.find((a) => a.id === id)

  if (!aircraft) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-primary mb-4">Aeronave não encontrada</h2>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Início
        </Button>
      </div>
    )
  }

  const progress = (aircraft.completedSections / aircraft.totalSections) * 100
  const isComplete = aircraft.completedSections === aircraft.totalSections

  // Dynamic status for sections based on mock completed sections count
  const sections = MOCK_SECTIONS.map((section, index) => ({
    ...section,
    completed: index < aircraft.completedSections,
  }))

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Button
        variant="ghost"
        className="mb-2 -ml-4 text-muted-foreground hover:text-primary"
        asChild
      >
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Frota
        </Link>
      </Button>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-primary shadow-lg group">
        <div className="absolute inset-0">
          <img
            src={aircraft.imageUrl}
            alt={aircraft.name}
            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative p-6 md:p-10 flex flex-col justify-end min-h-[300px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <Badge
                variant="outline"
                className="text-white border-white/30 bg-white/10 backdrop-blur-sm mb-3"
              >
                {aircraft.linked ? 'Vinculada' : 'Não Vinculada'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
                {aircraft.name}
              </h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 w-full md:w-72">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm font-medium">Progresso do Manual</span>
                <span className="text-white font-bold">
                  {aircraft.completedSections}/{aircraft.totalSections}
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20 [&>div]:bg-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Seções do Handbook
        </h2>

        <div className="grid gap-3">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'p-2.5 rounded-lg transition-colors',
                      section.completed
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500',
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={cn(
                      'font-semibold text-lg transition-colors',
                      section.completed
                        ? 'text-primary'
                        : 'text-slate-600 group-hover:text-primary',
                    )}
                  >
                    {section.title}
                  </span>
                </div>
                <div>
                  {section.completed ? (
                    <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm bg-emerald-50 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Concluído</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                      <Circle className="w-4 h-4" />
                      <span className="hidden sm:inline">Pendente</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
