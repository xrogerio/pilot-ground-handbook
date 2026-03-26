import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'

export type Role = 'adm' | 'aluno'

export interface Aircraft {
  id: string
  name: string
  progress: number
  imageUrl: string
  linked: boolean
  specs?: Record<string, any>
}

interface AppContextData {
  role: Role
  aircrafts: Aircraft[]
  deleteAircraft: (id: string) => Promise<void>
  loadingAircrafts: boolean
  refreshAircrafts: () => Promise<void>
}

const AppContext = createContext<AppContextData | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const { profile, user } = useAuth()
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([])
  const [loadingAircrafts, setLoadingAircrafts] = useState(true)

  const role: Role = profile?.role === 'admin' ? 'adm' : 'aluno'

  const fetchAircrafts = useCallback(async () => {
    if (!user || !profile) {
      setAircrafts([])
      setLoadingAircrafts(false)
      return
    }

    setLoadingAircrafts(true)
    try {
      if (role === 'adm') {
        const { data, error } = await supabase
          .from('aircraft')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data) {
          setAircrafts(
            data.map((a) => ({
              id: a.id,
              name: a.name,
              progress: 0,
              imageUrl: a.image_url || 'https://img.usecurling.com/p/800/500?q=airplane',
              linked: false,
              specs: (a as any).specs || {},
            })),
          )
        }
      } else {
        const { data, error } = await supabase
          .from('enrollments')
          .select(
            `
            progress_percentage,
            aircraft:aircraft_id (
              id,
              name,
              image_url,
              specs
            )
          `,
          )
          .eq('student_id', user.id)

        if (error) throw error

        if (data) {
          setAircrafts(
            data
              .map((e) => {
                const ac = Array.isArray(e.aircraft) ? e.aircraft[0] : e.aircraft
                if (!ac) return null

                return {
                  id: ac.id,
                  name: ac.name,
                  progress: e.progress_percentage || 0,
                  imageUrl: ac.image_url || 'https://img.usecurling.com/p/800/500?q=airplane',
                  linked: true,
                  specs: (ac as any).specs || {},
                }
              })
              .filter(Boolean) as Aircraft[],
          )
        }
      }
    } catch (err) {
      console.error('Error fetching aircrafts:', err)
    } finally {
      setLoadingAircrafts(false)
    }
  }, [user, profile, role])

  useEffect(() => {
    fetchAircrafts()
  }, [fetchAircrafts])

  const deleteAircraft = async (id: string) => {
    if (role !== 'adm') return

    try {
      const { error } = await supabase.from('aircraft').delete().eq('id', id)
      if (error) throw error
      setAircrafts((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error('Error deleting aircraft:', err)
      throw err
    }
  }

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        role,
        aircrafts,
        deleteAircraft,
        loadingAircrafts,
        refreshAircrafts: fetchAircrafts,
      },
    },
    children,
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
