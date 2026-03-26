import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { BarChart2, Settings2, Activity, Scale, Zap, PlaneTakeoff } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { EditSpecsDialog } from '@/components/EditSpecsDialog'

export default function ComparisonDashboard() {
  const { aircrafts, role } = useAppContext()
  const [editId, setEditId] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const chartData = useMemo(() => {
    return aircrafts.map((a) => ({
      name: a.name,
      maxSpeed: a.specs?.maxSpeed || 0,
      range: a.specs?.range || 0,
      maxWeight: a.specs?.maxWeight || 0,
      fuelCapacity: a.specs?.fuelCapacity || 0,
    }))
  }, [aircrafts])

  if (aircrafts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-dashed border-slate-300 animate-fade-in">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <PlaneTakeoff className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">Nenhuma aeronave disponível</h3>
        <p className="text-muted-foreground max-w-sm">
          {role === 'adm'
            ? 'Adicione aeronaves à frota para visualizar o comparativo.'
            : 'Você não possui aeronaves vinculadas para comparar os manuais.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="relative rounded-2xl overflow-hidden shadow-md">
        <img
          src="https://img.usecurling.com/p/1200/300?q=cockpit%20instruments%20dashboard"
          alt="Dashboard Comparativo"
          className="w-full h-40 md:h-56 object-cover opacity-80 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/60 flex flex-col justify-center px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
            <BarChart2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
            Comparativo de Frota
          </h1>
          <p className="text-blue-100 mt-2 text-base md:text-lg max-w-2xl">
            Visualize e compare lado a lado os limites operacionais, performance e capacidades das
            aeronaves.
          </p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
            <Activity className="w-5 h-5 text-blue-500" /> Tabela de Especificações
          </CardTitle>
          <CardDescription>
            Resumo dos principais dados técnicos de cada modelo.{' '}
            {role === 'adm' && 'Utilize a ação Editar para atualizar.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700 pl-6">Aeronave</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">
                  Vel. Máxima (KIAS)
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">
                  Autonomia (NM)
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">
                  Peso Máx. (lbs)
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">
                  Combustível (Gal)
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Assentos</TableHead>
                {role === 'adm' && (
                  <TableHead className="font-semibold text-slate-700 text-right pr-6">
                    Ações
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {aircrafts.map((a) => (
                <TableRow key={a.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="pl-6 font-bold text-slate-800">{a.name}</TableCell>
                  <TableCell className="text-right text-slate-600 font-mono">
                    {a.specs?.maxSpeed || '-'}
                  </TableCell>
                  <TableCell className="text-right text-slate-600 font-mono">
                    {a.specs?.range || '-'}
                  </TableCell>
                  <TableCell className="text-right text-slate-600 font-mono">
                    {a.specs?.maxWeight || '-'}
                  </TableCell>
                  <TableCell className="text-right text-slate-600 font-mono">
                    {a.specs?.fuelCapacity || '-'}
                  </TableCell>
                  <TableCell className="text-center text-slate-600">
                    {a.specs?.seating || '-'}
                  </TableCell>
                  {role === 'adm' && (
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          setEditId(a.id)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Settings2 className="w-4 h-4 mr-1.5" /> Editar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <Zap className="w-5 h-5 text-amber-500" /> Performance: Velocidade Máxima
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ maxSpeed: { label: 'KIAS', color: '#f59e0b' } }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="maxSpeed" fill="var(--color-maxSpeed)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <Scale className="w-5 h-5 text-indigo-500" /> Capacidade: Autonomia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ range: { label: 'Milhas (NM)', color: '#6366f1' } }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="range"
                    stroke="var(--color-range)"
                    strokeWidth={3}
                    activeDot={{ r: 8, fill: '#6366f1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <EditSpecsDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        aircraftId={editId}
      />
    </div>
  )
}
