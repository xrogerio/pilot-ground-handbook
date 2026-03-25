import { useState, useMemo } from 'react'
import { Search, PlaneTakeoff, Loader2 } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { AircraftCard } from '@/components/AircraftCard'
import { Input } from '@/components/ui/input'

export default function Index() {
  const { role, aircrafts, loadingAircrafts } = useAppContext()
  const [search, setSearch] = useState('')

  const filteredAircrafts = useMemo(() => {
    return aircrafts.filter((aircraft) => {
      // Role filtering
      if (role === 'aluno' && !aircraft.linked) return false
      // Text filtering
      if (search && !aircraft.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [aircrafts, role, search])

  if (loadingAircrafts) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 animate-fade-in">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Carregando frota...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            Frota de Aeronaves
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            {role === 'adm'
              ? 'Gerencie os manuais e documentações de toda a frota.'
              : 'Acesse os manuais das aeronaves vinculadas a você.'}
          </p>
        </div>
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Buscar aeronave..."
            className="pl-9 bg-white border-slate-200 shadow-sm focus-visible:ring-blue-500 transition-all h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredAircrafts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredAircrafts.map((aircraft) => (
            <AircraftCard key={aircraft.id} aircraft={aircraft} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <PlaneTakeoff className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">Nenhuma aeronave encontrada</h3>
          <p className="text-muted-foreground max-w-sm">
            Tente ajustar os termos da sua busca ou verifique se há aeronaves vinculadas ao seu
            perfil.
          </p>
        </div>
      )}
    </div>
  )
}
