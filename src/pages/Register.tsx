import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Plane } from 'lucide-react'
import { toast } from 'sonner'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('student')
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  if (user) {
    navigate('/', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setIsLoading(true)

    const { error } = await signUp(email, password, role)

    setIsLoading(false)

    if (error) {
      toast.error(`Erro ao criar conta: ${error.message || 'Verifique seus dados.'}`)
    } else {
      toast.success('Conta criada com sucesso! Faça login para continuar.')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Plane className="w-10 h-10 text-primary" />
          </div>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-slate-500">
              Junte-se ao Pilot Ground-Handbook
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-3 pt-2">
                <Label>Tipo de Perfil</Label>
                <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
                  <div
                    className="flex items-center space-x-2 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setRole('student')}
                  >
                    <RadioGroupItem value="student" id="r1" />
                    <Label htmlFor="r1" className="cursor-pointer flex-1">
                      Aluno
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setRole('admin')}
                  >
                    <RadioGroupItem value="admin" id="r2" />
                    <Label htmlFor="r2" className="cursor-pointer flex-1">
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Registrar'}
              </Button>
              <div className="text-sm text-center text-slate-500">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Faça login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
