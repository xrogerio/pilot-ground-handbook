import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
import { Plane } from 'lucide-react'
import { toast } from 'sonner'
import { ForgotPasswordDialog } from '@/components/ForgotPasswordDialog'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotDialogOpen, setIsForgotDialogOpen] = useState(false)

  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  // Redirect if already logged in
  if (user) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signIn(email, password)

    setIsLoading(false)

    if (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
    } else {
      toast.success('Login realizado com sucesso!')
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 transition-colors duration-300">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Plane className="w-10 h-10 text-primary" />
          </div>
        </div>

        <Card className="border-border shadow-lg bg-card text-card-foreground">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Faça login no Pilot Ground-Handbook
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
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    onClick={() => setIsForgotDialogOpen(true)}
                    className="text-sm text-primary hover:underline"
                    tabIndex={-1}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  {' '}
                  Registre-se
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>

      <ForgotPasswordDialog
        open={isForgotDialogOpen}
        onOpenChange={setIsForgotDialogOpen}
        defaultEmail={email}
      />
    </div>
  )
}
