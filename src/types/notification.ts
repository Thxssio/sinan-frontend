import { notificationTypeDefinitions } from "@/features/notifications/definitions"

export const notificationStatuses = [
  "pending",
  "in_review",
  "resolved",
] as const

export type NotificationStatus = (typeof notificationStatuses)[number]

type NotificationTypeDefinitionMap = typeof notificationTypeDefinitions

export type NotificationTypeSlug = keyof NotificationTypeDefinitionMap

export const notificationTypeSlugs = Object.keys(
  notificationTypeDefinitions
) as NotificationTypeSlug[]

type NotificationBaseFields = {
  patient_id: number
  unit_id: number
  status: NotificationStatus
  notification_date: string
  occurrence_date?: string
  notes?: string
}

export type NotificationFormData = Record<string, unknown>

export type NotificationInput = {
  notification_type_slug: NotificationTypeSlug
  form_data: NotificationFormData
} & NotificationBaseFields

type NotificationMetadata = {
  id: number
  notification_type_id: number
  created_at: string
}

export type Notification = NotificationInput & NotificationMetadata

export type NotificationWithRelations = Notification & {
  patient_name: string
  unit_name: string
  notification_type: string
}
