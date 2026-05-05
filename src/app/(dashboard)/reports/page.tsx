"use client"

import { useQuery } from "@tanstack/react-query"

import { PageTitle } from "@/components/layout/page-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { reportService } from "@/services/report.service"

export default function ReportsPage() {
  const reportQuery = useQuery({
    queryKey: ["reports", "summary"],
    queryFn: reportService.summary,
  })

  return (
    <>
      <PageTitle title="Relatorios" />
      <Card>
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent>
          {reportQuery.isPending ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <dl className="grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Notificacoes</dt>
                <dd className="text-2xl font-semibold">
                  {reportQuery.data?.totalNotifications}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Pacientes</dt>
                <dd className="text-2xl font-semibold">
                  {reportQuery.data?.totalPatients}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Unidades</dt>
                <dd className="text-2xl font-semibold">
                  {reportQuery.data?.totalUnits}
                </dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>
    </>
  )
}
