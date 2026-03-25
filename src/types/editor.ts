export interface TableData {
  id?: string
  title: string
  headers: string[]
  rows: string[][]
}

export interface ChartData {
  id?: string
  title: string
  type: 'line' | 'bar' | 'pie'
  data: Array<{ label: string; value: number }>
}

export interface ImageData {
  id?: string
  url: string
}

export interface SubsectionData {
  id: string
  title: string
  description: string
  images: ImageData[]
  tables: TableData[]
  charts: ChartData[]
}

export interface SectionFormData {
  title: string
  subsections: SubsectionData[]
}
