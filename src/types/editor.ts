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

export interface TextData {
  content: string
}

export interface ImageData {
  url: string
  localFile?: File
  localUrl?: string
}

export type ArtifactType = 'text' | 'image' | 'table' | 'chart'

export interface Artifact {
  id: string
  type: ArtifactType
  data: TextData | ImageData | TableData | ChartData
}

export interface SubsectionData {
  id: string
  title: string
  artifacts: Artifact[]
}

export interface SectionFormData {
  title: string
  thumbnail?: ImageData
  subsections: SubsectionData[]
}
