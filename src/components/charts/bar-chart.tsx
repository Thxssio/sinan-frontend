"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type BarChartProps<TData> = {
  data: TData[]
  xKey: keyof TData & string
  valueKey: keyof TData & string
  label: string
  color: string
  className?: string
}

export function BarChart<TData>({
  data,
  xKey,
  valueKey,
  label,
  color,
  className,
}: BarChartProps<TData>) {
  const config = {
    [valueKey]: {
      label,
      color,
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={config} className={className}>
      <RechartsBarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey as string}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={36} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey={valueKey as string}
          fill={`var(--color-${valueKey})`}
          radius={6}
        />
      </RechartsBarChart>
    </ChartContainer>
  )
}
