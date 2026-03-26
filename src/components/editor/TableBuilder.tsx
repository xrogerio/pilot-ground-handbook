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

  const addColumn = () => {
    onChange({
      ...table,
      headers: [...table.headers, `Coluna ${table.headers.length + 1}`],
      rows: table.rows.map((row) => [...row, '']),
    })
  }

  const removeColumn = (index: number) => {
    onChange({
      ...table,
      headers: table.headers.filter((_, i) => i !== index),
      rows: table.rows.map((row) => row.filter((_, i) => i !== index)),
    })
  }

  const addRow = () => {
    onChange({
      ...table,
      rows: [...table.rows, new Array(table.headers.length).fill('')],
    })
  }

  const removeRow = (index: number) => {
    onChange({
      ...table,
      rows: table.rows.filter((_, i) => i !== index),
    })
  }

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...table.headers]
    newHeaders[index] = value
    onChange({ ...table, headers: newHeaders })
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...table.rows]
    newRows[rowIndex] = [...newRows[rowIndex]]
    newRows[rowIndex][colIndex] = value
    onChange({ ...table, rows: newRows })
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
              value={table.title}
              onChange={(e) => onChange({ ...table, title: e.target.value })}
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
                {table.headers.map((h, i) => (
                  <TableHead key={i} className="min-w-[150px] p-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={h}
                        onChange={(e) => updateHeader(i, e.target.value)}
                        className="h-8 bg-white"
                      />
                      {table.headers.length > 1 && (
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
              {table.rows.map((row, rowIndex) => (
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
