import { Outlet, useLocation, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Plane,
  ChevronRight,
  LogOut,
  User as UserIcon,
  Users,
  BrainCircuit,
  KeyRound,
  Settings,
  BarChart2,
} from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChangePasswordDialog } from '@/components/ChangePasswordDialog'
import { ProfileDialog } from '@/components/ProfileDialog'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function Layout() {
  const { user, profile, isRecoveryMode, loading, signOut } = useAuth()
  const { aircrafts } = useAppContext()
  const location = useLocation()

  const [newStudentsCount, setNewStudentsCount] = useState(0)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const isAdmin = profile?.role === 'admin'

  // Trigger password change dialog automatically if user enters from a recovery link
  useEffect(() => {
    if (isRecoveryMode) {
      setIsPasswordDialogOpen(true)
    }
  }, [isRecoveryMode])

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
  const isQuiz = pathParts[0] === 'quiz'
  const isCompare = pathParts[0] === 'compare'
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
          {!isAdmin && (
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
            >
              <BrainCircuit className="w-4 h-4 text-purple-500" />
              <span className="hidden md:inline">Quiz IA</span>
            </Link>
          )}

          <Link
            to="/compare"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
          >
            <BarChart2 className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">Comparativo</span>
          </Link>

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 py-1 px-1.5 pl-3 rounded-full border border-slate-200 hover:bg-slate-100 h-10"
              >
                <span className="hidden lg:inline truncate max-w-[200px]">
                  {profile?.name || user.email?.split('@')[0]}
                </span>
                <Avatar className="h-7 w-7 bg-white">
                  <AvatarImage src={profile?.avatar_url || ''} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {(profile?.name || user.email || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate">
                    {profile?.name || 'Usuário'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsProfileDialogOpen(true)}
                className="cursor-pointer"
              >
                <Settings className="w-4 h-4 mr-2" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsPasswordDialogOpen(true)}
                className="cursor-pointer"
              >
                <KeyRound className="w-4 h-4 mr-2" />
                Alterar Senha
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          {isQuiz && (
            <>
              <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
              <span className="text-primary">Gerador de Quiz IA</span>
            </>
          )}
          {isCompare && (
            <>
              <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
              <span className="text-primary">Comparativo de Aeronaves</span>
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

      <ChangePasswordDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen} />
      <ProfileDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
    </div>
  )
}
