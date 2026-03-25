import { ContentBlock } from '@/types/handbook'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

interface HandbookContentProps {
  blocks: ContentBlock[]
}

export function HandbookContent({ blocks }: HandbookContentProps) {
  if (!blocks || blocks.length === 0) {
    return <p className="text-slate-500 italic py-8 text-center">Nenhum dado disponível.</p>
  }

  return (
    <div className="space-y-8 pb-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <p key={index} className="text-slate-700 leading-relaxed text-lg">
                {block.content}
              </p>
            )

          case 'image':
            return (
              <div key={index} className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex justify-center p-2">
                  <img
                    src={block.url}
                    alt={block.caption || 'Aircraft diagram'}
                    className="max-w-full h-auto max-h-[400px] object-contain rounded-lg mix-blend-multiply"
                    loading="lazy"
                  />
                </div>
                {block.caption && (
                  <p className="text-sm text-center text-slate-500 italic font-medium">
                    {block.caption}
                  </p>
                )}
              </div>
            )

          case 'table':
            return (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">{block.title}</h3>
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        {block.headers.map((header, i) => (
                          <TableHead key={i} className="font-bold text-slate-700">
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {block.rows.map((row, i) => (
                        <TableRow key={i} className="hover:bg-slate-50/50">
                          {row.map((cell, j) => (
                            <TableCell key={j} className={j === 0 ? 'font-semibold' : ''}>
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )

          case 'chart':
            return (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">{block.title}</h3>
                <div className="aspect-video w-full border border-slate-200 rounded-xl bg-slate-50/30 p-6 shadow-sm">
                  <ChartContainer config={block.config} className="h-full w-full">
                    <LineChart
                      data={block.data}
                      margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="hsl(var(--muted-foreground)/0.2)"
                      />
                      <XAxis
                        dataKey={block.xKey}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        dy={10}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      {block.lines.map((line) => (
                        <Line
                          key={line.key}
                          type="monotone"
                          dataKey={line.key}
                          stroke={line.color}
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
