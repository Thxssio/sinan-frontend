"use client"

import { Bell, CheckCircle2, ClipboardList, Search } from "lucide-react"

import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageTitle } from "@/components/layout/page-title"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboard } from "@/hooks/use-dashboard"

const numberFormatter = new Intl.NumberFormat("pt-BR")

export default function DashboardPage() {
  const dashboardQuery = useDashboard()
  const summary = dashboardQuery.data

  return (
    <>
      <PageTitle title="Dashboard" description="Resumo operacional do sistema." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Notificacoes"
          value={summary?.totalNotifications}
          loading={dashboardQuery.isLoading}
          icon={Bell}
        />
        <MetricCard
          title="Enviadas"
          value={summary?.submittedNotifications}
          loading={dashboardQuery.isLoading}
          icon={ClipboardList}
        />
        <MetricCard
          title="Em analise"
          value={summary?.inReviewNotifications}
          loading={dashboardQuery.isLoading}
          icon={Search}
        />
        <MetricCard
          title="Concluidas"
          value={summary?.completedNotifications}
          loading={dashboardQuery.isLoading}
          icon={CheckCircle2}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolucao mensal</CardTitle>
            <CardDescription>Notificacoes registradas por mes.</CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardQuery.isLoading ? (
              <Skeleton className="h-72 w-full" />
            ) : (
              <LineChart
                data={summary?.monthly ?? []}
                xKey="month"
                className="h-72 w-full"
                lines={[
                  {
                    key: "notifications",
                    label: "Notificacoes",
                    color: "var(--chart-1)",
                  },
                  {
                    key: "completed",
                    label: "Concluidas",
                    color: "var(--chart-2)",
                  },
                ]}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Distribuicao das notificacoes.</CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardQuery.isLoading ? (
              <Skeleton className="h-72 w-full" />
            ) : (
              <BarChart
                data={summary?.byStatus ?? []}
                xKey="status"
                valueKey="total"
                label="Total"
                color="var(--chart-3)"
                className="h-72 w-full"
              />
            )}
          </CardContent>
        </Card>
      </section>
    </>
  )
}

function MetricCard({
  title,
  value,
  loading,
  icon: Icon,
}: {
  title: string
  value?: number
  loading: boolean
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardAction>
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <p className="text-3xl font-semibold tracking-tight">
            {numberFormatter.format(value ?? 0)}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
