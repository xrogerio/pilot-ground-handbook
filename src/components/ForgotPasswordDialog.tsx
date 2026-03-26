import { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultEmail?: string
}

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  defaultEmail = '',
}: ForgotPasswordDialogProps) {
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState(defaultEmail)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Reset state when opened
  const handleOpenChange = (val: boolean) => {
    if (val) {
      setSuccess(false)
      setEmail(defaultEmail)
    }
    onOpenChange(val)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)

    if (error) {
      toast({
        title: 'Erro ao enviar e-mail',
        description: 'Ocorreu um erro. Verifique o endereço e tente novamente.',
        variant: 'destructive',
      })
    } else {
      setSuccess(true)
      toast({
        title: 'E-mail enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Recuperar Senha
          </DialogTitle>
          <DialogDescription>
            {success
              ? 'Enviamos um link de recuperação para o seu e-mail.'
              : 'Digite seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.'}
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recoveryEmail">E-mail</Label>
              <Input
                id="recoveryEmail"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading || !email}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Enviar Link
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-6 flex justify-center">
            <Button onClick={() => handleOpenChange(false)} className="w-full">
              Voltar ao Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
