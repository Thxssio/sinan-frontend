"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { NotificationStatusBadge } from "@/components/notifications/notification-status-badge"
import { PageTitle } from "@/components/layout/page-title"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { notificationService } from "@/services/notification.service"

export default function NotificationDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const notificationQuery = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => notificationService.get(id),
    enabled: Number.isFinite(id),
  })

  const notification = notificationQuery.data

  return (
    <>
      <PageTitle title={`Notificacao #${params.id}`} />
      <Card>
        <CardHeader>
          <CardTitle>
            {notification ? notification.patient_name : "Carregando"}
          </CardTitle>
          <CardDescription>
            {notification ? notification.notification_type : "Aguarde"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          {notificationQuery.isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : notification ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Status</span>
                <NotificationStatusBadge status={notification.status} />
              </div>
              <p>
                <span className="text-muted-foreground">Unidade:</span>{" "}
                {notification.unit_name}
              </p>
              <p>
                <span className="text-muted-foreground">Observacoes:</span>{" "}
                {notification.notes ?? "Sem observacoes."}
              </p>
            </>
          ) : (
            <p>Registro nao encontrado.</p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
