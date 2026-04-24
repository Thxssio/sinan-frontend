"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { PageTitle } from "@/components/layout/page-title"
import { NotificationStatusBadge } from "@/components/notifications/notification-status-badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useUpdateNotificationStatus } from "@/hooks/use-notifications"
import {
  formatNotificationDate,
  formatNotificationFieldValue,
  getNotificationTypeDefinition,
  type NotificationFieldDefinition,
  type NotificationSectionDefinition,
} from "@/lib/notification-types"
import { notificationService } from "@/services/notification.service"
import type { NotificationStatus } from "@/types/notification"

const workflowCopy: Record<
  NotificationStatus,
  {
    stage: string
    description: string
    actions: Array<{
      label: string
      nextStatus: NotificationStatus
      variant?: "default" | "outline"
    }>
  }
> = {
  pending: {
    stage: "Editando",
    description:
      "A notificacao ainda esta em preenchimento e pode receber complementos.",
    actions: [
      {
        label: "Enviar para analise",
        nextStatus: "in_review",
      },
    ],
  },
  in_review: {
    stage: "Completando",
    description:
      "A equipe esta revisando dados laboratoriais, classificacao e desfecho.",
    actions: [
      {
        label: "Finalizar notificacao",
        nextStatus: "resolved",
      },
      {
        label: "Voltar para pendente",
        nextStatus: "pending",
        variant: "outline",
      },
    ],
  },
  resolved: {
    stage: "Finalizada",
    description:
      "Caso consolidado. Use a reabertura apenas quando surgir nova informacao clinica.",
    actions: [
      {
        label: "Reabrir em analise",
        nextStatus: "in_review",
        variant: "outline",
      },
    ],
  },
}

function getSectionGridClass(columns: 1 | 2 | 3 = 2) {
  if (columns === 1) {
    return "grid-cols-1"
  }

  if (columns === 3) {
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
  }

  return "grid-cols-1 md:grid-cols-2"
}

function getFieldSpanClass(columns: 1 | 2 | 3 = 2) {
  if (columns === 3) {
    return "md:col-span-2 xl:col-span-3"
  }

  if (columns === 2) {
    return "md:col-span-2"
  }

  return "col-span-1"
}

export default function NotificationDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const updateStatus = useUpdateNotificationStatus()

  const notificationQuery = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => notificationService.get(id),
    enabled: Number.isFinite(id),
  })

  const notification = notificationQuery.data
  const workflow = notification ? workflowCopy[notification.status] : null
  const definition = notification
    ? getNotificationTypeDefinition(notification.notification_type_slug)
    : null

  return (
    <>
      <PageTitle
        title={`Notificacao #${params.id}`}
        description="Acompanhe a evolucao da notificacao e os dados especificos do formulario."
      />
      <Card>
        <CardHeader>
          <CardTitle>
            {notification ? notification.patient_name : "Carregando"}
          </CardTitle>
          <CardDescription>
            {notification
              ? `${notification.notification_type} - ${notification.unit_name}`
              : "Aguarde"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {notificationQuery.isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : notification && definition && workflow ? (
            <>
              <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                <div className="grid gap-3 rounded-2xl border border-border bg-muted/30 p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status</span>
                    <NotificationStatusBadge status={notification.status} />
                  </div>
                  <p>
                    <span className="text-muted-foreground">
                      Data da notificacao:
                    </span>{" "}
                    {formatNotificationDate(notification.notification_date)}
                  </p>
                  <p>
                    <span className="text-muted-foreground">
                      Data da ocorrencia:
                    </span>{" "}
                    {formatNotificationDate(notification.occurrence_date)}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Formulario:</span>{" "}
                    {definition.label}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Observacoes:</span>{" "}
                    {notification.notes || "Sem observacoes gerais."}
                  </p>
                </div>

                <div className="grid gap-3 rounded-2xl border border-border bg-card p-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">{workflow.stage}</p>
                    <p className="text-sm text-muted-foreground">
                      {workflow.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {workflow.actions.map((action) => (
                      <Button
                        key={action.nextStatus}
                        type="button"
                        variant={action.variant ?? "default"}
                        disabled={updateStatus.isPending}
                        onClick={() =>
                          updateStatus.mutate({
                            id,
                            status: action.nextStatus,
                          })
                        }
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </section>

              {definition.sections.map((section: NotificationSectionDefinition) => (
                <section
                  key={section.id}
                  className="grid gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <div className="grid gap-1">
                    <h2 className="text-base font-semibold">{section.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <div
                    className={`grid gap-4 ${getSectionGridClass(section.columns)}`}
                  >
                    {section.fields.map((field: NotificationFieldDefinition) => (
                      <div
                        key={field.name}
                        className={
                          field.fullWidth ? getFieldSpanClass(section.columns) : ""
                        }
                      >
                        <p className="text-sm text-muted-foreground">
                          {field.label}
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {formatNotificationFieldValue(
                            field,
                            notification.form_data[
                              field.name as keyof typeof notification.form_data
                            ]
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </>
          ) : (
            <p>Registro nao encontrado.</p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
