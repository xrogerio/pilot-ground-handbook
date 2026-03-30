import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { generatePalette } from '@/lib/color-utils'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'

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

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') === 'dark'
  }
  return false
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [title, setTitle] = useState(DEFAULT_SETTINGS.title)
  const [subtitle, setSubtitle] = useState(DEFAULT_SETTINGS.subtitle)
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_SETTINGS.primaryColor)
  const [isDarkMode, setIsDarkModeState] = useState<boolean>(getInitialTheme())
  const [menuSections, setMenuSections] = useState<MenuSection[]>(DEFAULT_SECTIONS)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch global settings
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const { data, error } = await supabase.from('app_settings').select('*').limit(1).single()
        if (error && error.code !== 'PGRST116') throw error
        if (data) {
          if (data.title) setTitle(data.title)
          if (data.subtitle) setSubtitle(data.subtitle)
          if (data.primary_color) setPrimaryColor(data.primary_color)
          if (data.logo_url) setLogoUrl(data.logo_url)
          if (data.menu_sections) setMenuSections(data.menu_sections as unknown as MenuSection[])
        }
      } catch (err) {
        console.error('Error fetching global settings:', err)
      }
    }
    fetchGlobalSettings()
  }, [])

  // Fetch user theme preference
  useEffect(() => {
    const fetchThemePref = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('theme_preference')
            .eq('id', user.id)
            .single()
          if (error) throw error
          if (data && data.theme_preference && data.theme_preference !== 'system') {
            const isDark = data.theme_preference === 'dark'
            setIsDarkModeState(isDark)
            localStorage.setItem('theme', isDark ? 'dark' : 'light')
          }
        } catch (err) {
          console.error('Error fetching theme preference:', err)
        }
      }
    }
    fetchThemePref()
  }, [user])

  // Apply theme to document
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

  const setIsDarkMode = async (isDark: boolean) => {
    setIsDarkModeState(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (user) {
      try {
        await supabase
          .from('users')
          .update({ theme_preference: isDark ? 'dark' : 'light' })
          .eq('id', user.id)
      } catch (err) {
        console.error('Error saving theme preference:', err)
      }
    }
  }

  const saveSettings = async () => {
    setIsSaving(true)
    try {
      const { data: existing } = await supabase.from('app_settings').select('id').limit(1).single()

      const payload = {
        title,
        subtitle,
        primary_color: primaryColor,
        logo_url: logoUrl,
        menu_sections: menuSections as any,
      }

      if (existing) {
        await supabase.from('app_settings').update(payload).eq('id', existing.id)
      } else {
        await supabase.from('app_settings').insert(payload)
      }
      toast.success('Configurações globais salvas com sucesso!')
    } catch (err) {
      console.error('Error saving settings:', err)
      toast.error('Erro ao salvar configurações.')
    } finally {
      setIsSaving(false)
    }
  }

  const resetDefaults = async () => {
    setLogoUrl(null)
    setTitle(DEFAULT_SETTINGS.title)
    setSubtitle(DEFAULT_SETTINGS.subtitle)
    setPrimaryColor(DEFAULT_SETTINGS.primaryColor)
    setMenuSections(DEFAULT_SECTIONS)

    setIsSaving(true)
    try {
      const { data: existing } = await supabase.from('app_settings').select('id').limit(1).single()
      const payload = {
        title: DEFAULT_SETTINGS.title,
        subtitle: DEFAULT_SETTINGS.subtitle,
        primary_color: DEFAULT_SETTINGS.primaryColor,
        logo_url: null,
        menu_sections: DEFAULT_SECTIONS as any,
      }
      if (existing) {
        await supabase.from('app_settings').update(payload).eq('id', existing.id)
      } else {
        await supabase.from('app_settings').insert(payload)
      }
      toast.success('Configurações restauradas para o padrão globalmente.')
    } catch (err) {
      console.error('Error resetting settings:', err)
      toast.error('Erro ao restaurar configurações.')
    } finally {
      setIsSaving(false)
    }
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
