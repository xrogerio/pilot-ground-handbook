import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'

export type Role = 'adm' | 'aluno'

export interface Aircraft {
  id: string
  name: string
  completedSections: number
  totalSections: number
  imageUrl: string
  linked: boolean
}

const INITIAL_AIRCRAFTS: Aircraft[] = [
  {
    id: '1',
    name: 'Tecnam P-Mentor',
    completedSections: 8,
    totalSections: 10,
    imageUrl: 'https://img.usecurling.com/p/800/500?q=small%20airplane',
    linked: true,
  },
  {
    id: '2',
    name: 'Inpaer Colt',
    completedSections: 5,
    totalSections: 10,
    imageUrl: 'https://img.usecurling.com/p/800/500?q=light%20sport%20aircraft',
    linked: false,
  },
  {
    id: '3',
    name: 'Cessna 172',
    completedSections: 10,
    totalSections: 10,
    imageUrl: 'https://img.usecurling.com/p/800/500?q=cessna%20172',
    linked: true,
  },
]

interface AppContextData {
  role: Role
  aircrafts: Aircraft[]
  deleteAircraft: (id: string) => void
}

const AppContext = createContext<AppContextData | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth()
  const [aircrafts, setAircrafts] = useState<Aircraft[]>(INITIAL_AIRCRAFTS)

  const role: Role = profile?.role === 'admin' ? 'adm' : 'aluno'

  const deleteAircraft = (id: string) => {
    setAircrafts((prev) => prev.filter((a) => a.id !== id))
  }

  return React.createElement(
    AppContext.Provider,
    { value: { role, aircrafts, deleteAircraft } },
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
