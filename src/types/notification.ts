import { z } from "zod"

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

export type NotificationFormDataMap = {
  [Slug in NotificationTypeSlug]: z.infer<
    NotificationTypeDefinitionMap[Slug]["formSchema"]
  >
}

export type NotificationDraftFormDataMap = {
  [Slug in NotificationTypeSlug]: z.input<
    NotificationTypeDefinitionMap[Slug]["draftFormSchema"]
  >
}

export type NotificationFormData =
  NotificationFormDataMap[NotificationTypeSlug]

export type NotificationInput = {
  [Slug in NotificationTypeSlug]: NotificationBaseFields & {
    notification_type_slug: Slug
    form_data: NotificationFormDataMap[Slug]
  }
}[NotificationTypeSlug]

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
