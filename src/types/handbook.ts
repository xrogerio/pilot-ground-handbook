import { LucideIcon } from 'lucide-react'

export interface HandbookSection {
  id: string
  title: string
  icon: LucideIcon
}

export type ContentBlock =
  | {
      type: 'text'
      content: string
    }
  | {
      type: 'image'
      url: string
      caption?: string
    }
  | {
      type: 'table'
      title: string
      headers: string[]
      rows: string[][]
    }
  | {
      type: 'chart'
      title: string
      data: any[]
      config: Record<string, { label: string; color: string }>
      xKey: string
      lines: { key: string; color: string }[]
    }
