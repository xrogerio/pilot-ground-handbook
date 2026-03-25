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
  if (!table) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-3 bg-slate-100 rounded-full">
            <TableIcon className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <p className="text-slate-600 font-medium">Nenhuma tabela configurada</p>
            <p className="text-sm text-slate-400 mb-4">
              Adicione uma tabela de especificações técnicas para esta seção.
            </p>
          </div>
          <Button
            onClick={() =>
              onChange({
                title: 'Nova Tabela',
                headers: ['Coluna 1', 'Coluna 2'],
                rows: [['', '']],
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar Tabela
          </Button>
        </CardContent>
      </Card>
    )
  }

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TableIcon className="w-5 h-5 text-primary" />
          Construtor de Tabela
        </CardTitle>
        <Button variant="destructive" size="sm" onClick={() => onChange(null)}>
          <Trash2 className="w-4 h-4 mr-2" /> Remover Tabela
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="flex-1 space-y-2">
            <Label>Título da Tabela</Label>
            <Input
              value={table.title}
              onChange={(e) => onChange({ ...table, title: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addColumn}>
              <Plus className="w-4 h-4 mr-2" /> Coluna
            </Button>
            <Button variant="outline" onClick={addRow}>
              <Plus className="w-4 h-4 mr-2" /> Linha
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-x-auto">
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
