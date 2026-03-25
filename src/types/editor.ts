export interface TableData {
  title: string
  headers: string[]
  rows: string[][]
}

export interface ChartData {
  title: string
  type: 'line' | 'bar' | 'pie'
  data: Array<{ label: string; value: number }>
}

export interface SectionFormData {
  title: string
  description: string
  imageUrl: string
  table: TableData | null
  chart: ChartData | null
}
