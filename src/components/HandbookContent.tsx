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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

interface HandbookContentProps {
  blocks: ContentBlock[]
}

const PIE_COLORS = [
  'hsl(var(--chart-1, 220 70% 50%))',
  'hsl(var(--chart-2, 160 60% 45%))',
  'hsl(var(--chart-3, 30 80% 55%))',
  'hsl(var(--chart-4, 280 65% 60%))',
  'hsl(var(--chart-5, 340 75% 55%))',
]

export function HandbookContent({ blocks }: HandbookContentProps) {
  if (!blocks || blocks.length === 0) {
    return <p className="text-muted-foreground italic py-8 text-center">Nenhum dado disponível.</p>
  }

  return (
    <div className="space-y-8 pb-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'subsection_title':
            return (
              <h3 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4 first:mt-0">
                {block.title}
              </h3>
            )

          case 'text':
            return (
              <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                {block.content}
              </p>
            )

          case 'image':
            return (
              <div key={index} className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-border bg-muted/30 flex justify-center p-2">
                  <img
                    src={block.url}
                    alt={block.caption || 'Aircraft diagram'}
                    className="max-w-full h-auto max-h-[400px] object-contain rounded-lg dark:mix-blend-normal mix-blend-multiply"
                    loading="lazy"
                  />
                </div>
                {block.caption && (
                  <p className="text-sm text-center text-muted-foreground italic font-medium">
                    {block.caption}
                  </p>
                )}
              </div>
            )

          case 'table':
            return (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">{block.title}</h3>
                <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        {block.headers.map((header, i) => (
                          <TableHead key={i} className="font-bold text-foreground">
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {block.rows.map((row, i) => (
                        <TableRow key={i} className="hover:bg-muted/30">
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

          case 'chart': {
            const isPie = block.chartType === 'pie'
            const isBar = block.chartType === 'bar'

            return (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">{block.title}</h3>
                <div className="w-full min-h-[350px] border border-border rounded-xl bg-card p-6 shadow-sm flex flex-col justify-center items-center">
                  <ChartContainer config={block.config} className="h-[300px] w-full">
                    {isPie ? (
                      <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={block.data}
                          dataKey={block.lines[0]?.key || 'value'}
                          nameKey={block.xKey}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          fill="var(--color-value)"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {block.data.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    ) : isBar ? (
                      <BarChart
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
                        <ChartTooltip
                          cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                          content={<ChartTooltipContent />}
                        />
                        {block.lines.map((line) => (
                          <Bar
                            key={line.key}
                            dataKey={line.key}
                            fill={line.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={60}
                          />
                        ))}
                      </BarChart>
                    ) : (
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
                    )}
                  </ChartContainer>
                </div>
              </div>
            )
          }

          default:
            return null
        }
      })}
    </div>
  )
}
