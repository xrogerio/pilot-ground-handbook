import { useState, useEffect } from 'react'
import { Loader2, KeyRound } from 'lucide-react'
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

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { updatePassword, isRecoveryMode, setRecoveryMode } = useAuth()
  const { toast } = useToast()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Block closing if in recovery mode unless successful
  const handleOpenChange = (val: boolean) => {
    if (isRecoveryMode && !val) {
      toast({
        title: 'Ação necessária',
        description: 'Você precisa definir uma nova senha para continuar.',
        variant: 'destructive',
      })
      return
    }
    if (!val) resetForm()
    onOpenChange(val)
  }

  const resetForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Senhas não coincidem',
        description: 'A nova senha e a confirmação devem ser iguais.',
        variant: 'destructive',
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A nova senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    const { error } = await updatePassword(isRecoveryMode ? null : currentPassword, newPassword)
    setLoading(false)

    if (error) {
      toast({
        title: 'Erro ao alterar senha',
        description: error.message || 'Verifique sua senha atual e tente novamente.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi alterada com sucesso.',
      })
      resetForm()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-primary" />
            {isRecoveryMode ? 'Definir Nova Senha' : 'Alterar Senha'}
          </DialogTitle>
          <DialogDescription>
            {isRecoveryMode
              ? 'Por favor, digite sua nova senha abaixo para recuperar o acesso.'
              : 'Digite sua senha atual e a nova senha para atualizar seu acesso.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {!isRecoveryMode && (
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required={!isRecoveryMode}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter className="mt-6">
            {!isRecoveryMode && (
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={loading} className={isRecoveryMode ? 'w-full' : ''}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isRecoveryMode ? 'Salvar Nova Senha' : 'Salvar Alteração'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
