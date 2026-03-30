import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { generatePalette } from '@/lib/color-utils'
import { toast } from 'sonner'

export interface MenuSection {
  id: string
  title: string
}

const DEFAULT_SECTIONS: MenuSection[] = [
  { id: '1', title: 'Geral' },
  { id: '2', title: 'Limitações' },
  { id: '3', title: 'Procedimentos de Emergência' },
  { id: '4', title: 'Procedimentos Normais' },
  { id: '5', title: 'Desempenho' },
  { id: '6', title: 'Peso e Balanceamento' },
  { id: '7', title: 'Descrição do Avião e Sistemas' },
  { id: '8', title: 'Manuseio, Serviço e Manutenção' },
  { id: '9', title: 'Suplementos' },
  { id: 'docs', title: 'Documentos Originais' },
]

const DEFAULT_SETTINGS = {
  title: 'Pilot Ground-Handbook',
  subtitle: 'Voo Seguro',
  primaryColor: '#1e293b',
}

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
  resetDefaults: () => void
  isSaving: boolean
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [title, setTitle] = useState(DEFAULT_SETTINGS.title)
  const [subtitle, setSubtitle] = useState(DEFAULT_SETTINGS.subtitle)
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_SETTINGS.primaryColor)
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
    toast.success('Configurações salvas com sucesso!')
  }

  const resetDefaults = () => {
    setLogoUrl(null)
    setTitle(DEFAULT_SETTINGS.title)
    setSubtitle(DEFAULT_SETTINGS.subtitle)
    setPrimaryColor(DEFAULT_SETTINGS.primaryColor)
    setMenuSections(DEFAULT_SECTIONS)
    toast.success('Configurações restauradas para o padrão.')
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
        resetDefaults,
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
