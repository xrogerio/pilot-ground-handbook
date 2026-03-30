import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { generatePalette } from '@/lib/color-utils'
import { toast } from 'sonner'

export interface MenuSection {
  id: string
  title: string
}

const DEFAULT_SECTIONS: MenuSection[] = [
  { id: '1', title: 'Limitações' },
  { id: '2', title: 'Procedimentos Normais' },
  { id: '3', title: 'Procedimentos de Emergência' },
  { id: '4', title: 'Desempenho' },
  { id: '5', title: 'Peso e Balanceamento' },
  { id: 'docs', title: 'Documentos Originais' },
]

interface ThemeContextData {
  logoUrl: string | null
  setLogoUrl: (url: string | null) => void
  title: string
  setTitle: (title: string) => void
  subtitle: string
  setSubtitle: (subtitle: string) => void
  primaryColor: string
  setPrimaryColor: (color: string) => void
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
  menuSections: MenuSection[]
  setMenuSections: (sections: MenuSection[]) => void
  saveSettings: () => Promise<void>
  isSaving: boolean
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('Pilot Ground-Handbook')
  const [subtitle, setSubtitle] = useState('Voo Seguro')
  const [primaryColor, setPrimaryColor] = useState('#1e293b')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [menuSections, setMenuSections] = useState<MenuSection[]>(DEFAULT_SECTIONS)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    const palette = generatePalette(primaryColor, isDarkMode)
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [primaryColor, isDarkMode])

  const saveSettings = async () => {
    setIsSaving(true)
    // Mock save
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSaving(false)
    toast.success('Configurações do sistema salvas com sucesso!')
  }

  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        logoUrl,
        setLogoUrl,
        title,
        setTitle,
        subtitle,
        setSubtitle,
        primaryColor,
        setPrimaryColor,
        isDarkMode,
        setIsDarkMode,
        menuSections,
        setMenuSections,
        saveSettings,
        isSaving,
      },
    },
    children,
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider')
  return context
}
