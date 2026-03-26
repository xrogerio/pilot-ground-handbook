import { Outlet, useLocation, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Plane, ChevronRight, LogOut, User as UserIcon, Users } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function Layout() {
  const { user, profile, loading, signOut } = useAuth()
  const { aircrafts } = useAppContext()
  const location = useLocation()

  const [newStudentsCount, setNewStudentsCount] = useState(0)
  const isAdmin = profile?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) return

    let mounted = true
    const lastViewed =
      localStorage.getItem('lastViewedStudents') ||
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const fetchNewStudentsCount = async () => {
      try {
        const { count } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'student')
          .gt('created_at', lastViewed)

        if (mounted && count !== null) {
          setNewStudentsCount(count)
        }
      } catch (error) {
        console.error('Error fetching new students count:', error)
      }
    }

    fetchNewStudentsCount()

    // Realtime listener for new registrations
    const channel = supabase
      .channel('public:users')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, (payload) => {
        if (payload.new.role === 'student') {
          setNewStudentsCount((prev) => prev + 1)
          toast.info('Novo Cadastro!', {
            description: `Aluno ${payload.new.email} acabou de se registrar.`,
          })
        }
      })
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [isAdmin])

  const handleStudentsClick = () => {
    localStorage.setItem('lastViewedStudents', new Date().toISOString())
    setNewStudentsCount(0)
  }

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
  const isStudents = pathParts[0] === 'students'
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
        <div className="flex items-center gap-3 sm:gap-4">
          {isAdmin && (
            <Link
              to="/students"
              onClick={handleStudentsClick}
              className="relative flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Alunos</span>
              {newStudentsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in shadow-sm">
                  {newStudentsCount}
                </span>
              )}
            </Link>
          )}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200">
            <UserIcon className="w-4 h-4 text-slate-400" />
            {user.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors px-2 sm:px-3"
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-2.5">
        <nav className="flex items-center text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          {isStudents && (
            <>
              <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
              <span className="text-primary">Gestão de Alunos</span>
            </>
          )}
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
