export type NotificationStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "returned"
  | "completed"
  | "archived"

export type Notification = {
  id: number
  patient_id: number
  unit_id: number
  notification_type_id: number
  status: NotificationStatus
  notification_date: string
  occurrence_date?: string
  notes?: string
  created_at: string
}

export type NotificationWithRelations = Notification & {
  patient_name: string
  unit_name: string
  notification_type: string
}
