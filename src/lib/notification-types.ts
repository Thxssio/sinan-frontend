import {
  notificationTypeDefinitions,
  type NotificationFieldDefinition,
  type NotificationSectionDefinition,
} from "@/features/notifications/definitions"
import type { NotificationTypeSlug } from "@/types/notification"

export type { NotificationFieldDefinition, NotificationSectionDefinition }

export type NotificationTypeDefinition =
  (typeof notificationTypeDefinitions)[NotificationTypeSlug]

type NotificationTypeDefinitionMap = typeof notificationTypeDefinitions

export const notificationStatusOptions = [
  { label: "Pendente", value: "pending" },
  { label: "Em analise", value: "in_review" },
  { label: "Resolvida", value: "resolved" },
] as const

export const notificationTypeRegistry = notificationTypeDefinitions

export const notificationTypeOptions = Object.values(
  notificationTypeDefinitions
).map((definition) => ({
  label: definition.label,
  value: definition.slug,
}))

export function getNotificationTypeDefinition<Slug extends NotificationTypeSlug>(
  slug: Slug
): NotificationTypeDefinitionMap[Slug] {
  return notificationTypeDefinitions[slug]
}

export function getNotificationTypeId(slug: NotificationTypeSlug) {
  return notificationTypeDefinitions[slug].id
}

export function getNotificationTypeLabel(slug: NotificationTypeSlug) {
  return notificationTypeDefinitions[slug].label
}

export function getNotificationTypeDescription(slug: NotificationTypeSlug) {
  return notificationTypeDefinitions[slug].description
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) {
    return value
  }

  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(year, month - 1, day)
  )
}

export function formatNotificationFieldValue(
  field: NotificationFieldDefinition,
  rawValue: unknown
) {
  if (
    rawValue === undefined ||
    rawValue === null ||
    rawValue === "" ||
    (typeof rawValue === "number" && Number.isNaN(rawValue))
  ) {
    return "Nao informado"
  }

  if (field.kind === "select") {
    return (
      field.options?.find((option) => option.value === rawValue)?.label ??
      String(rawValue)
    )
  }

  if (field.kind === "date" && typeof rawValue === "string") {
    return formatDate(rawValue)
  }

  if (field.kind === "number" && typeof rawValue === "number") {
    return new Intl.NumberFormat("pt-BR").format(rawValue)
  }

  return String(rawValue)
}

export function formatNotificationDate(value?: string) {
  if (!value) {
    return "Nao informada"
  }

  return formatDate(value)
}
