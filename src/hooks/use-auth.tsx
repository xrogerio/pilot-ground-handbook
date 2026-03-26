import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type BaseProfile = Database['public']['Tables']['users']['Row']
export type Profile = BaseProfile & { name?: string | null; avatar_url?: string | null }

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  isRecoveryMode: boolean
  setRecoveryMode: (val: boolean) => void
  signUp: (email: string, password: string, role: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (currentPassword: string | null, newPassword: string) => Promise<{ error: any }>
  updateProfileData: (data: { name?: string; avatar_url?: string }) => Promise<{ error: any }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRecoveryMode, setRecoveryMode] = useState(false)

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('users').select('*').eq('id', userId).single()
    if (data) {
      setProfile(data as Profile)
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryMode(true)
      }

      if (session?.user) {
        fetchProfile(session.user.id).then(() => setLoading(false))
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id).then(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, role: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    })

    if (data.user && !error) {
      setTimeout(async () => {
        await supabase.from('users').update({ role }).eq('id', data.user!.id)
        fetchProfile(data.user!.id)
      }, 1000)
    }

    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    setProfile(null)
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    })
    return { error }
  }

  const updatePassword = async (currentPassword: string | null, newPassword: string) => {
    if (!user?.email) return { error: { message: 'Usuário não encontrado' } }

    if (!isRecoveryMode && currentPassword) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })

      if (signInError) {
        return { error: { message: 'Senha atual incorreta.' } }
      }
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (!updateError && isRecoveryMode) {
      setRecoveryMode(false)
    }

    return { error: updateError }
  }

  const updateProfileData = async (data: { name?: string; avatar_url?: string }) => {
    if (!user) return { error: { message: 'Usuário não encontrado' } }

    const { error } = await supabase.from('users').update(data).eq('id', user.id)

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, ...data } : null))
    }

    return { error }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isRecoveryMode,
        setRecoveryMode,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateProfileData,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
