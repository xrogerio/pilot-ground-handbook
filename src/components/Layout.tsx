import { Outlet, useLocation, Link } from 'react-router-dom'
import { Plane, ChevronRight, BookOpen } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppContext, Role } from '@/contexts/AppContext'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { role, setRole, aircrafts } = useAppContext()
  const location = useLocation()

  // Basic breadcrumb generation based on path
  const pathParts = location.pathname.split('/').filter(Boolean)
  const isDetails = pathParts[0] === 'aircraft' && pathParts[1]
  const currentAircraft = isDetails ? aircrafts.find((a) => a.id === pathParts[1]) : null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-100">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 md:px-6 py-3 flex justify-between items-center transition-all">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg md:text-xl text-primary group"
        >
          <div className="bg-primary/5 p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          <span className="hidden sm:inline tracking-tight">Pilot Ground-Handbook</span>
          <span className="sm:hidden tracking-tight">PGH</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <BookOpen className="w-4 h-4" />
            Visão:
          </div>
          <Select value={role} onValueChange={(value) => setRole(value as Role)}>
            <SelectTrigger className="w-[140px] bg-slate-50 border-slate-200 h-9 font-medium">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adm">Administrador</SelectItem>
              <SelectItem value="aluno">Aluno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-2.5">
        <nav className="flex items-center text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          {isDetails && currentAircraft && (
            <>
              <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
              <span className="text-primary">{currentAircraft.name}</span>
            </>
          )}
        </nav>
      </div>

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 md:py-10 animate-fade-in">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-slate-500 text-sm">
        <div className="flex flex-col items-center gap-2">
          <Plane className="w-4 h-4 text-slate-300" />
          <p className="font-medium">
            Voo Seguro. <span className="text-slate-400 font-normal ml-1">v0.0.1</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
