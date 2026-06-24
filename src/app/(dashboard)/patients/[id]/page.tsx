"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { CalendarDays, FileText, User } from "lucide-react"

import { PageTitle } from "@/components/layout/page-title"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/lib/constants"
import {
  formatNotificationDate,
  getNotificationTypeDefinition,
} from "@/lib/notification-types"
import { useNotifications } from "@/hooks/use-notifications"
import { usePatients } from "@/hooks/use-patients"
import type {
  NotificationTypeSlug,
  NotificationWithRelations,
} from "@/types/notification"
import type { Patient } from "@/types/patient"

type PatientTimelineItem = {
  date: string
  title: string
  description: string
  href?: string
}

function normalizeDate(value?: string) {
  if (!value) {
    return undefined
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined
  }

  return parsedDate.toISOString().slice(0, 10)
}

function addTimelineItem(
  items: PatientTimelineItem[],
  item: Omit<PatientTimelineItem, "date"> & { date?: string }
) {
  const date = normalizeDate(item.date)

  if (!date) {
    return
  }

  items.push({
    date,
    title: item.title,
    description: item.description,
    href: item.href,
  })
}

function getNotificationDateItems(notification: NotificationWithRelations) {
  const items: PatientTimelineItem[] = []
  const definition = getNotificationTypeDefinition(
    notification.notification_type_slug as NotificationTypeSlug
  )
  const formData = notification.form_data ?? {}

  addTimelineItem(items, {
    date: notification.occurrence_date,
    title: "Ocorrência do agravo",
    description: notification.notification_type,
    href: `${ROUTES.notifications}/${notification.id}`,
  })

  definition.sections.forEach((section) => {
    section.fields.forEach((field) => {
      const value = formData[field.name]

      if (field.kind !== "date" || typeof value !== "string") {
        return
      }

      addTimelineItem(items, {
        date: value,
        title: field.label,
        description: `${notification.notification_type} · ${section.title}`,
        href: `${ROUTES.notifications}/${notification.id}`,
      })
    })
  })

  addTimelineItem(items, {
    date: notification.notification_date,
    title: "Notificação registrada",
    description: notification.notification_type,
    href: `${ROUTES.notifications}/${notification.id}`,
  })

  addTimelineItem(items, {
    date: notification.created_at,
    title: "Registro criado no sistema",
    description: notification.notification_type,
    href: `${ROUTES.notifications}/${notification.id}`,
  })

  return items
}

function buildPatientTimeline(
  patient: Patient,
  notifications: NotificationWithRelations[]
) {
  const items: PatientTimelineItem[] = []

  addTimelineItem(items, {
    date: patient.birth_date,
    title: "Nascimento",
    description: "Cadastro do paciente",
  })

  addTimelineItem(items, {
    date: patient.created_at,
    title: "Paciente cadastrado",
    description: "Registro administrativo",
  })

  notifications.forEach((notification) => {
    items.push(...getNotificationDateItems(notification))
  })

  return items
    .filter(
      (item, index, list) =>
        list.findIndex(
          (current) =>
            current.date === item.date &&
            current.title === item.title &&
            current.description === item.description &&
            current.href === item.href
        ) === index
    )
    .sort((left, right) => left.date.localeCompare(right.date))
}

export default function PatientDetailsPage() {
  const params = useParams<{ id: string }>()
  const patientId = Number(params.id)
  const patientsQuery = usePatients()
  const notificationsQuery = useNotifications()
  const patients = patientsQuery.data?.data ?? []
  const notifications = notificationsQuery.data?.data ?? []
  const patient = patients.find((item) => item.id === patientId)
  const patientNotifications = notifications.filter(
    (notification) => notification.patient_id === patientId
  )
  const timelineItems = patient
    ? buildPatientTimeline(patient, patientNotifications)
    : []
  const isLoading = patientsQuery.isPending || notificationsQuery.isPending

  if (isLoading) {
    return (
      <>
        <PageTitle title="Paciente" />
        <div className="grid gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      </>
    )
  }

  if (!patient) {
    return (
      <>
        <PageTitle title="Paciente não encontrado" />
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Não localizamos um paciente com esse identificador.
            </p>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageTitle
        title={patient.name}
        description="Cronologia clínica e administrativa consolidada do paciente."
      />

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-4 text-brand" />
              Dados do paciente
            </CardTitle>
            <CardDescription>Informações básicas do cadastro.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm">
              <div className="grid gap-1">
                <dt className="text-muted-foreground">Documento</dt>
                <dd className="font-medium">{patient.document ?? "-"}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-muted-foreground">Nascimento</dt>
                <dd className="font-medium">
                  {formatNotificationDate(patient.birth_date)}
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-muted-foreground">Telefone</dt>
                <dd className="font-medium">{patient.phone ?? "-"}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-muted-foreground">Notificações</dt>
                <dd className="font-medium">{patientNotifications.length}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="size-4 text-brand" />
              Cronologia do paciente
            </CardTitle>
            <CardDescription>
              Eventos ordenados por data a partir das fichas e notificações.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {timelineItems.length > 0 ? (
              <ol className="relative grid gap-4 before:absolute before:bottom-3 before:left-[5.25rem] before:top-3 before:w-px before:bg-border">
                {timelineItems.map((item) => (
                  <li
                    className="relative grid grid-cols-[4.5rem_1fr] gap-4 text-sm"
                    key={`${item.date}-${item.title}-${item.description}-${item.href ?? ""}`}
                  >
                    <time className="pt-1 text-xs font-medium text-muted-foreground">
                      {formatNotificationDate(item.date)}
                    </time>
                    <div className="rounded-xl border border-border bg-background px-4 py-3">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.href ? (
                        <Link
                          className="mt-2 inline-flex text-xs font-medium text-brand transition-colors hover:text-brand-hover"
                          href={item.href}
                        >
                          Abrir notificação
                        </Link>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                Ainda não há datas suficientes para montar a cronologia.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-4 text-brand" />
            Notificações vinculadas
          </CardTitle>
          <CardDescription>Fichas registradas para este paciente.</CardDescription>
        </CardHeader>
        <CardContent>
          {patientNotifications.length > 0 ? (
            <div className="grid gap-3">
              {patientNotifications.map((notification) => (
                <Link
                  className="grid gap-1 rounded-xl border border-border px-4 py-3 transition-colors hover:border-brand/40 hover:bg-muted/50 sm:grid-cols-[1fr_auto] sm:items-center"
                  href={`${ROUTES.notifications}/${notification.id}`}
                  key={notification.id}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {notification.notification_type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.unit_name}
                    </p>
                  </div>
                  <time className="text-xs font-medium text-muted-foreground">
                    {formatNotificationDate(notification.notification_date)}
                  </time>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
              Nenhuma notificação vinculada a este paciente.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
