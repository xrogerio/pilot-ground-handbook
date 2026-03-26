import { useState, useRef, useEffect } from 'react'
import { Loader2, User as UserIcon, Camera } from 'lucide-react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { user, profile, updateProfileData } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && profile) {
      setName(profile.name || '')
      setAvatarUrl(profile.avatar_url || '')
    }
  }, [open, profile])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

      setAvatarUrl(data.publicUrl)
      await updateProfileData({ avatar_url: data.publicUrl })

      toast({
        title: 'Avatar atualizado',
        description: 'Sua foto de perfil foi atualizada com sucesso.',
      })
    } catch (err: any) {
      toast({
        title: 'Erro ao enviar imagem',
        description: err.message || 'Tente novamente com uma imagem menor.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await updateProfileData({ name })

    setLoading(false)

    if (error) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: 'Não foi possível salvar suas alterações.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Perfil salvo',
        description: 'Suas informações foram atualizadas com sucesso.',
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            Meu Perfil
          </DialogTitle>
          <DialogDescription>
            Atualize suas informações pessoais e foto de perfil.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="relative group">
            <Avatar className="w-24 h-24 border-4 border-white shadow-sm bg-slate-100">
              <AvatarImage src={avatarUrl} className="object-cover" />
              <AvatarFallback className="text-2xl text-slate-400">
                {name ? name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Como você quer ser chamado?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail (Acesso)</Label>
            <Input
              id="email"
              value={user?.email || ''}
              disabled
              className="bg-slate-50 text-slate-500 cursor-not-allowed"
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || uploading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Salvar Perfil
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
