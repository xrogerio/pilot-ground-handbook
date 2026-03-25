import { Outlet, useLocation, Link, Navigate } from 'react-router-dom'
import { Plane, ChevronRight, LogOut, User as UserIcon } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const { user, loading, signOut } = useAuth()
  const { aircrafts } = useAppContext()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

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
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200">
            <UserIcon className="w-4 h-4 text-slate-400" />
            {user.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Sair</span>
          </Button>
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
