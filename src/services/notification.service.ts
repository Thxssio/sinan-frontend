import { USE_MOCKS } from "@/lib/constants"
import { api } from "@/services/api"
import type { NotificationSchema } from "@/schemas/notification.schema"
import type { ApiListResponse } from "@/types/api"
import type {
  NotificationStatus,
  NotificationWithRelations,
} from "@/types/notification"

const mockNotifications: NotificationWithRelations[] = [
  {
    id: 1,
    patient_id: 1,
    patient_name: "Maria Oliveira",
    unit_id: 1,
    unit_name: "UBS Centro",
    notification_type_id: 1,
    notification_type: "Dengue",
    status: "submitted",
    notification_date: "2026-04-12",
    occurrence_date: "2026-04-10",
    notes: "Paciente com febre e dor no corpo.",
    created_at: "2026-04-12T10:00:00.000Z",
  },
  {
    id: 2,
    patient_id: 2,
    patient_name: "Joao Santos",
    unit_id: 2,
    unit_name: "UPA Norte",
    notification_type_id: 2,
    notification_type: "Chikungunya",
    status: "in_review",
    notification_date: "2026-04-13",
    occurrence_date: "2026-04-11",
    created_at: "2026-04-13T13:20:00.000Z",
  },
  {
    id: 3,
    patient_id: 3,
    patient_name: "Ana Souza",
    unit_id: 1,
    unit_name: "UBS Centro",
    notification_type_id: 3,
    notification_type: "Zika",
    status: "completed",
    notification_date: "2026-04-14",
    created_at: "2026-04-14T09:35:00.000Z",
  },
]

export const notificationService = {
  async list() {
    if (USE_MOCKS) {
      return {
        data: mockNotifications,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: mockNotifications.length,
        },
      } satisfies ApiListResponse<NotificationWithRelations>
    }

    const response =
      await api.get<ApiListResponse<NotificationWithRelations>>(
        "/notifications"
      )
    return response.data
  },

  async get(id: number) {
    if (USE_MOCKS) {
      return mockNotifications.find((notification) => notification.id === id)
    }

    const response = await api.get<NotificationWithRelations>(
      `/notifications/${id}`
    )
    return response.data
  },

  async create(payload: NotificationSchema) {
    if (USE_MOCKS) {
      return {
        ...mockNotifications[0],
        ...payload,
        id: mockNotifications.length + 1,
        status: "draft" as const,
        patient_name: "Paciente mockado",
        unit_name: "Unidade mockada",
        notification_type: "Tipo mockado",
        created_at: new Date().toISOString(),
      }
    }

    const response = await api.post<NotificationWithRelations>(
      "/notifications",
      payload
    )
    return response.data
  },

  async updateStatus(id: number, status: NotificationStatus) {
    if (USE_MOCKS) {
      const current = mockNotifications.find(
        (notification) => notification.id === id
      )
      return current ? { ...current, status } : undefined
    }

    const response = await api.patch<NotificationWithRelations>(
      `/notifications/${id}/status`,
      { status }
    )
    return response.data
  },
}
