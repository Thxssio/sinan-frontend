"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/tables/data-table"
import { NotificationStatusBadge } from "@/components/notifications/notification-status-badge"
import { PageTitle } from "@/components/layout/page-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/lib/constants"
import { useNotifications } from "@/hooks/use-notifications"
import { formatNotificationDate } from "@/lib/notification-types"
import type { NotificationWithRelations } from "@/types/notification"

const columns: DataTableColumn<NotificationWithRelations>[] = [
  {
    key: "id",
    header: "ID",
    cell: (row) => row.id,
  },
  {
    key: "patient",
    header: "Paciente",
    cell: (row) => row.patient_name,
  },
  {
    key: "type",
    header: "Tipo",
    cell: (row) => row.notification_type,
  },
  {
    key: "unit",
    header: "Unidade",
    cell: (row) => row.unit_name,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <NotificationStatusBadge status={row.status} />,
  },
  {
    key: "date",
    header: "Data",
    cell: (row) => formatNotificationDate(row.notification_date),
    className: "text-right",
  },
]

export default function NotificationsPage() {
  const notificationsQuery = useNotifications()

  return (
    <>
      <PageTitle
        title="Notificacoes"
        description="Registros digitais de AIDS e acidentes por animais peconhentos, com base preparada para novos formularios."
        action={
          <Button asChild>
            <Link href={`${ROUTES.notifications}/new`}>
              <Plus data-icon="inline-start" />
              Nova
            </Link>
          </Button>
        }
      />
      <Card>
        <CardContent>
          {notificationsQuery.isPending ? (
            <div className="grid gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <DataTable
              data={notificationsQuery.data?.data ?? []}
              columns={columns}
              getRowKey={(row) => row.id}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}
