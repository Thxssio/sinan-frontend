"use client"

import { Bell, CheckCircle2, ClipboardList, Search } from "lucide-react"

import { DashboardLoadingState } from "@/app/(dashboard)/dashboard/dashboard-loading"
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
import { useDashboard } from "@/hooks/use-dashboard"

const numberFormatter = new Intl.NumberFormat("pt-BR")

export default function DashboardPage() {
  const dashboardQuery = useDashboard()
  const summary = dashboardQuery.data

  if (dashboardQuery.isPending && !summary) {
    return <DashboardLoadingState />
  }

  return (
    <>
      <PageTitle title="Dashboard" description="Resumo operacional do sistema." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Notificacoes"
          value={summary?.totalNotifications}
          icon={Bell}
        />
        <MetricCard
          title="Enviadas"
          value={summary?.submittedNotifications}
          icon={ClipboardList}
        />
        <MetricCard
          title="Em analise"
          value={summary?.inReviewNotifications}
          icon={Search}
        />
        <MetricCard
          title="Concluidas"
          value={summary?.completedNotifications}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Distribuicao das notificacoes.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={summary?.byStatus ?? []}
              xKey="status"
              valueKey="total"
              label="Total"
              color="var(--chart-3)"
              className="h-72 w-full"
            />
          </CardContent>
        </Card>
      </section>
    </>
  )
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value?: number
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
        <p className="text-3xl font-semibold tracking-tight">
          {numberFormatter.format(value ?? 0)}
        </p>
      </CardContent>
    </Card>
  )
}
