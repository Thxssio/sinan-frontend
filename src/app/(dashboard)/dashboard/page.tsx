"use client"

import { Bell, CheckCircle2, ClipboardList, Search } from "lucide-react"

import { DashboardLoadingState } from "@/app/(dashboard)/dashboard/dashboard-loading"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageTitle } from "@/components/layout/page-title"
import { DiseaseMap } from "@/components/maps/disease-map"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDashboard } from "@/hooks/use-dashboard"
import { useNotifications } from "@/hooks/use-notifications"
import { useUnits } from "@/hooks/use-units"

const numberFormatter = new Intl.NumberFormat("pt-BR")

export default function DashboardPage() {
  const dashboardQuery = useDashboard()
  const notificationsQuery = useNotifications()
  const unitsQuery = useUnits()
  const summary = dashboardQuery.data

  if (dashboardQuery.isPending && !summary) {
    return <DashboardLoadingState />
  }

  return (
    <>
      <PageTitle title="Dashboard" description="Resumo operacional do sistema." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Notificações"
          value={summary?.totalNotifications}
          icon={Bell}
        />
        <MetricCard
          title="Enviadas"
          value={summary?.submittedNotifications}
          icon={ClipboardList}
        />
        <MetricCard
          title="Em análise"
          value={summary?.inReviewNotifications}
          icon={Search}
        />
        <MetricCard
          title="Concluídas"
          value={summary?.completedNotifications}
          icon={CheckCircle2}
        />
      </section>

      <DiseaseMap
        notifications={notificationsQuery.data?.data ?? []}
        units={unitsQuery.data?.data ?? []}
        isLoading={notificationsQuery.isPending || unitsQuery.isPending}
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução mensal</CardTitle>
            <CardDescription>Notificações registradas por mês.</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={summary?.monthly ?? []}
              xKey="month"
              className="h-72 w-full"
              lines={[
                {
                  key: "notifications",
                  label: "Notificações",
                  color: "var(--chart-1)",
                },
                {
                  key: "completed",
                  label: "Concluídas",
                  color: "var(--chart-2)",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Distribuição das notificações.</CardDescription>
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
