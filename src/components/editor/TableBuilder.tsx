import { TableData } from '@/types/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash2, Table as TableIcon } from 'lucide-react'

interface TableBuilderProps {
  table: TableData | null
  onChange: (table: TableData | null) => void
}

export function TableBuilder({ table, onChange }: TableBuilderProps) {
  if (!table) return null

  // Safely normalize the table data, as raw JSON with {nome, colunas, linhas}
  // or objects inside rows might be passed from direct DB seeds.
  const safeTitle = table.title || (table as any).nome || ''
  const safeHeaders = Array.isArray(table.headers)
    ? table.headers
    : Array.isArray((table as any).colunas)
      ? (table as any).colunas
      : ['Coluna 1']

  const rawRows = Array.isArray(table.rows)
    ? table.rows
    : Array.isArray((table as any).linhas)
      ? (table as any).linhas
      : [['']]

  const safeRows = rawRows
    .map((row) => {
      if (Array.isArray(row)) return row
      if (typeof row === 'object' && row !== null) {
        const valsByHeader = safeHeaders.map((h) =>
          row[h] !== undefined ? String(row[h]) : undefined,
        )
        if (valsByHeader.some((v) => v !== undefined)) {
          return valsByHeader.map((v) => v || '')
        }
        return Object.values(row).map(String)
      }
      return [String(row)]
    })
    .map((row) => {
      const r = [...row]
      while (r.length < safeHeaders.length) r.push('')
      return r.slice(0, safeHeaders.length)
    })

  const safeTable = {
    title: safeTitle,
    headers: safeHeaders,
    rows: safeRows,
  }

  const addColumn = () => {
    onChange({
      ...safeTable,
      headers: [...safeTable.headers, `Coluna ${safeTable.headers.length + 1}`],
      rows: safeTable.rows.map((row) => [...row, '']),
    })
  }

  const removeColumn = (index: number) => {
    onChange({
      ...safeTable,
      headers: safeTable.headers.filter((_, i) => i !== index),
      rows: safeTable.rows.map((row) => row.filter((_, i) => i !== index)),
    })
  }

  const addRow = () => {
    onChange({
      ...safeTable,
      rows: [...safeTable.rows, new Array(safeTable.headers.length).fill('')],
    })
  }

  const removeRow = (index: number) => {
    onChange({
      ...safeTable,
      rows: safeTable.rows.filter((_, i) => i !== index),
    })
  }

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...safeTable.headers]
    newHeaders[index] = value
    onChange({ ...safeTable, headers: newHeaders })
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...safeTable.rows]
    newRows[rowIndex] = [...newRows[rowIndex]]
    newRows[rowIndex][colIndex] = value
    onChange({ ...safeTable, rows: newRows })
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-600">
          <TableIcon className="w-4 h-4" />
          Configuração de Tabela
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="flex-1 space-y-2">
            <Label>Título da Tabela</Label>
            <Input
              value={safeTable.title}
              onChange={(e) => onChange({ ...safeTable, title: e.target.value })}
              className="bg-white"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addColumn} className="bg-white">
              <Plus className="w-4 h-4 mr-1" /> Coluna
            </Button>
            <Button variant="outline" size="sm" onClick={addRow} className="bg-white">
              <Plus className="w-4 h-4 mr-1" /> Linha
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-x-auto bg-white">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                {safeTable.headers.map((h, i) => (
                  <TableHead key={i} className="min-w-[150px] p-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={h}
                        onChange={(e) => updateHeader(i, e.target.value)}
                        className="h-8 bg-white"
                      />
                      {safeTable.headers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-500 shrink-0"
                          onClick={() => removeColumn(i)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeTable.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <TableCell key={colIndex} className="p-2">
                      <Input
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="h-9"
                      />
                    </TableCell>
                  ))}
                  <TableCell className="p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-slate-400 hover:text-red-500"
                      onClick={() => removeRow(rowIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
