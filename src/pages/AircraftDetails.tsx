import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pencil, Settings2 } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { HandbookSidebar } from '@/components/HandbookSidebar'
import { HandbookContent } from '@/components/HandbookContent'
import { HANDBOOK_SECTIONS, getMockHandbookContent } from '@/data/mockHandbookData'

export default function AircraftDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { role, aircrafts } = useAppContext()
  const [activeSectionId, setActiveSectionId] = useState<string>(HANDBOOK_SECTIONS[0].id)

  const aircraft = aircrafts.find((a) => a.id === id)

  if (!aircraft) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <Settings2 className="w-10 h-10 text-red-400 animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-4">Aeronave não encontrada</h2>
        <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Início
        </Button>
      </div>
    )
  }

  const activeSection = HANDBOOK_SECTIONS.find((s) => s.id === activeSectionId)
  const blocks = getMockHandbookContent(aircraft.id, activeSectionId)

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
      {/* Header Breadcrumb & Status */}
      <div>
        <Button
          variant="ghost"
          className="mb-4 -ml-4 text-muted-foreground hover:text-primary transition-colors"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Frota
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant="secondary"
                className={
                  aircraft.linked
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              >
                {aircraft.linked ? 'Vinculada' : 'Não Vinculada'}
              </Badge>
              <span className="text-sm font-medium text-slate-500">ID: #{aircraft.id}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              {aircraft.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <HandbookSidebar activeSectionId={activeSectionId} onSelect={setActiveSectionId} />

        <div className="flex-1 w-full min-w-0">
          <Card className="min-h-[500px] border-slate-200 shadow-sm p-5 md:p-8 rounded-2xl bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {activeSection && (
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <activeSection.icon className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-primary leading-none">
                    {activeSection?.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    Seção {activeSection?.id}
                  </p>
                </div>
              </div>

              {role === 'adm' && (
                <Button
                  variant="outline"
                  className="gap-2 shrink-0 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                  asChild
                >
                  <Link to={`/aircraft/${aircraft.id}/edit?section=${activeSectionId}`}>
                    <Pencil className="w-4 h-4" />
                    Editar Seção
                  </Link>
                </Button>
              )}
            </div>

            {/* Content Wrapper with Key for animation re-triggering */}
            <div key={activeSectionId} className="animate-fade-in">
              <HandbookContent blocks={blocks} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
