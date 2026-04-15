"use client"

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type LineChartProps<TData> = {
  data: TData[]
  xKey: keyof TData & string
  lines: Array<{
    key: keyof TData & string
    label: string
    color: string
  }>
  className?: string
}

export function LineChart<TData>({
  data,
  xKey,
  lines,
  className,
}: LineChartProps<TData>) {
  const config = lines.reduce<ChartConfig>((acc, line) => {
    acc[line.key] = {
      label: line.label,
      color: line.color,
    }

    return acc
  }, {})

  return (
    <ChartContainer config={config} className={className}>
      <RechartsLineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey as string}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={36} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {lines.map((line) => (
          <Line
            key={line.key}
            dataKey={line.key as string}
            type="monotone"
            stroke={`var(--color-${line.key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  )
}
