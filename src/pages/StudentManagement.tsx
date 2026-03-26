import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Trash2, Link as LinkIcon, Users, Plane, CheckCircle2 } from 'lucide-react'

export default function StudentManagement() {
  const { profile } = useAuth()
  const { toast } = useToast()

  const [students, setStudents] = useState<any[]>([])
  const [aircrafts, setAircrafts] = useState<any[]>([])
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedAircraft, setSelectedAircraft] = useState('')
  const [isLinking, setIsLinking] = useState(false)

  useEffect(() => {
    if (profile?.role !== 'admin') return

    const fetchData = async () => {
      setLoading(true)
      try {
        const [studentsRes, aircraftsRes, enrollmentsRes] = await Promise.all([
          supabase
            .from('users')
            .select('*')
            .eq('role', 'student')
            .order('created_at', { ascending: false }),
          supabase.from('aircraft').select('*').order('name'),
          supabase
            .from('enrollments')
            .select(`
            id,
            progress_percentage,
            created_at,
            student:student_id (id, email),
            aircraft:aircraft_id (id, name)
          `)
            .order('created_at', { ascending: false }),
        ])

        if (studentsRes.data) setStudents(studentsRes.data)
        if (aircraftsRes.data) setAircrafts(aircraftsRes.data)
        if (enrollmentsRes.data) setEnrollments(enrollmentsRes.data)
      } catch (error) {
        console.error('Error fetching management data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [profile])

  if (profile && profile.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  const handleLink = async () => {
    if (!selectedStudent || !selectedAircraft) {
      toast({
        title: 'Atenção',
        description: 'Selecione um aluno e uma aeronave para vincular.',
        variant: 'destructive',
      })
      return
    }

    setIsLinking(true)
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          student_id: selectedStudent,
          aircraft_id: selectedAircraft,
          progress_percentage: 0,
          completed_sections: [],
        })
        .select(`
        id,
        progress_percentage,
        created_at,
        student:student_id (id, email),
        aircraft:aircraft_id (id, name)
      `)
        .single()

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Vínculo Existente',
            description: 'Este aluno já está matriculado nesta aeronave.',
            variant: 'destructive',
          })
        } else {
          throw error
        }
      } else if (data) {
        setEnrollments([data, ...enrollments])
        toast({ title: 'Sucesso', description: 'Aluno vinculado à aeronave com sucesso!' })
        setSelectedStudent('')
        setSelectedAircraft('')
      }
    } catch (error) {
      console.error('Error linking student:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível vincular o aluno.',
        variant: 'destructive',
      })
    } finally {
      setIsLinking(false)
    }
  }

  const handleUnlink = async (id: string) => {
    try {
      const { error } = await supabase.from('enrollments').delete().eq('id', id)
      if (error) throw error

      setEnrollments(enrollments.filter((e) => e.id !== id))
      toast({ title: 'Sucesso', description: 'Vinculação removida com sucesso.' })
    } catch (error) {
      console.error('Error unlinking student:', error)
      toast({ title: 'Erro', description: 'Erro ao remover a vinculação.', variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 animate-fade-in">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Carregando dados dos alunos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          Gestão de Alunos
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
          Gerencie as matrículas e o acesso dos alunos aos manuais das aeronaves da frota.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-slate-200 shadow-sm h-fit">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-blue-600" />
              Nova Vinculação
            </CardTitle>
            <CardDescription>Conceda acesso a uma aeronave para um aluno.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" /> Aluno
              </label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione o aluno..." />
                </SelectTrigger>
                <SelectContent>
                  {students.length === 0 ? (
                    <SelectItem value="none" disabled>
                      Nenhum aluno encontrado
                    </SelectItem>
                  ) : (
                    students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.email}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Plane className="w-4 h-4 text-slate-400" /> Aeronave
              </label>
              <Select value={selectedAircraft} onValueChange={setSelectedAircraft}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione a aeronave..." />
                </SelectTrigger>
                <SelectContent>
                  {aircrafts.length === 0 ? (
                    <SelectItem value="none" disabled>
                      Nenhuma aeronave encontrada
                    </SelectItem>
                  ) : (
                    aircrafts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleLink}
              disabled={isLinking || !selectedStudent || !selectedAircraft}
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white mt-2"
            >
              {isLinking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
              Vincular Aluno
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Matrículas Ativas
              </CardTitle>
              <CardDescription>
                Visão geral de todos os alunos e seus manuais acessíveis.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {enrollments.length} Registros
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {enrollments.length === 0 ? (
              <div className="text-center py-12 px-4 flex flex-col items-center">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <Users className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">Nenhuma vinculação encontrada</p>
                <p className="text-sm text-slate-500 mt-1">
                  Utilize o painel ao lado para criar o primeiro vínculo.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700 pl-6">
                      Aluno (E-mail)
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">Aeronave</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-center">
                      Progresso
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right pr-6">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((e) => {
                    const studentData = Array.isArray(e.student) ? e.student[0] : e.student
                    const aircraftData = Array.isArray(e.aircraft) ? e.aircraft[0] : e.aircraft

                    return (
                      <TableRow key={e.id} className="group hover:bg-slate-50/80 transition-colors">
                        <TableCell className="pl-6 font-medium text-slate-700">
                          {studentData?.email || 'Usuário Removido'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-white border-slate-200 text-slate-600 font-medium"
                          >
                            <Plane className="w-3 h-3 mr-1.5 opacity-70" />
                            {aircraftData?.name || 'Aeronave Removida'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-semibold text-slate-700">
                              {e.progress_percentage || 0}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnlink(e.id)}
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                            title="Desvincular aluno desta aeronave"
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" />
                            <span className="hidden sm:inline">Remover</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
