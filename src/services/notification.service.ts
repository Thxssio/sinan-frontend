import { USE_MOCKS } from "@/lib/constants"
import {
  getNotificationTypeId,
  getNotificationTypeLabel,
} from "@/lib/notification-types"
import type { NotificationSchema } from "@/schemas/notification.schema"
import { api } from "@/services/api"
import type { ApiListResponse } from "@/types/api"
import type {
  NotificationStatus,
  NotificationWithRelations,
} from "@/types/notification"

const mockPatientNames: Record<number, string> = {
  1: "Maria Oliveira",
  2: "Joao Santos",
  3: "Ana Souza",
}

const mockUnitNames: Record<number, string> = {
  1: "UBS Centro",
  2: "UPA Norte",
}

const mockNotifications: NotificationWithRelations[] = [
  {
    id: 1,
    patient_id: 1,
    patient_name: "Maria Oliveira",
    unit_id: 1,
    unit_name: "UBS Centro",
    notification_type_id: 1,
    notification_type_slug: "aids",
    notification_type: "AIDS",
    status: "in_review",
    notification_date: "2026-04-12",
    occurrence_date: "2026-04-10",
    notes:
      "Paciente em acompanhamento com infectologia e equipe multiprofissional.",
    form_data: {
      patient_name: "Maria Oliveira",
      patient_cpf: "12345678900",
      patient_birth_date: "1990-02-12",
      sex: "female",
      race_color: "brown",
      education_level: "high_school_complete",
      sus_card_number: "898001234567890",
      residence_city: "Sao Paulo",
      residence_state: "SP",
      vertical_transmission: "no",
      sexual_exposure: "yes",
      injecting_drug_use: "no",
      other_exposure_notes: "Parceiro fixo em investigação sorológica.",
      diagnosis_date: "2026-04-11",
      screening_test_result: "positive",
      ministry_protocol_status: "confirmed",
      hiv_lab_evidence:
        "Carga viral detectavel e sorologia reagente em testes confirmatorios.",
      treatment_performed:
        "Inicio de terapia antirretroviral e acolhimento pela equipe.",
      health_outcome: "stable",
      outcome_details: "Retorno agendado para 30 dias.",
    },
    created_at: "2026-04-12T10:00:00.000Z",
  },
  {
    id: 2,
    patient_id: 2,
    patient_name: "Joao Santos",
    unit_id: 2,
    unit_name: "UPA Norte",
    notification_type_id: 2,
    notification_type_slug: "venomous_animal",
    notification_type: "Acidente por animal peçonhento",
    status: "in_review",
    notification_date: "2026-04-13",
    occurrence_date: "2026-04-11",
    notes:
      "Observacao mantida por 24 horas devido a sintomas sistêmicos leves.",
    form_data: {
      accident_type: "scorpion",
      accident_location: "Residência do paciente",
      bite_site: "Pe direito",
      time_to_care_hours: 1,
      local_symptoms: "Dor intensa, edema discreto e parestesia local.",
      systemic_symptoms: "Nauseas e sudorese.",
      antivenom_administered: "yes",
      antivenom_ampoules: 2,
      case_classification: "moderate",
      local_complications: "",
      systemic_complications: "",
      final_diagnosis: "cured",
      outcome_details: "Alta após observação e orientações de retorno.",
    },
    created_at: "2026-04-13T13:20:00.000Z",
  },
  {
    id: 3,
    patient_id: 3,
    patient_name: "Ana Souza",
    unit_id: 1,
    unit_name: "UBS Centro",
    notification_type_id: 2,
    notification_type_slug: "venomous_animal",
    notification_type: "Acidente por animal peçonhento",
    status: "resolved",
    notification_date: "2026-04-14",
    occurrence_date: "2026-04-14",
    notes: "Caso encerrado sem sequelas.",
    form_data: {
      accident_type: "snake",
      accident_location: "Area rural",
      bite_site: "Perna esquerda",
      time_to_care_hours: 3,
      local_symptoms: "Edema progressivo, dor e equimose.",
      systemic_symptoms: "Sem hemorragias ou insuficiencia renal.",
      antivenom_administered: "yes",
      antivenom_ampoules: 8,
      case_classification: "severe",
      local_complications: "Necrose superficial controlada.",
      systemic_complications: "",
      final_diagnosis: "cured",
      outcome_details:
        "Evoluiu com melhora clinica e sem necessidade de amputacao.",
    },
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
    const notificationTypeId = getNotificationTypeId(
      payload.notification_type_slug
    )

    if (USE_MOCKS) {
      const createdNotification = {
        ...payload,
        notification_type_id: notificationTypeId,
        id: mockNotifications.length + 1,
        patient_name:
          mockPatientNames[payload.patient_id] ?? `Paciente #${payload.patient_id}`,
        unit_name: mockUnitNames[payload.unit_id] ?? `Unidade #${payload.unit_id}`,
        notification_type: getNotificationTypeLabel(payload.notification_type_slug),
        created_at: new Date().toISOString(),
      } satisfies NotificationWithRelations

      mockNotifications.unshift(createdNotification)

      return createdNotification
    }

    const response = await api.post<NotificationWithRelations>(
      "/notifications",
      {
        ...payload,
        notification_type_id: notificationTypeId,
      }
    )
    return response.data
  },

  async updateStatus(id: number, status: NotificationStatus) {
    if (USE_MOCKS) {
      const currentIndex = mockNotifications.findIndex(
        (notification) => notification.id === id
      )

      if (currentIndex === -1) {
        return undefined
      }

      mockNotifications[currentIndex] = {
        ...mockNotifications[currentIndex],
        status,
      }

      return mockNotifications[currentIndex]
    }

    const response = await api.patch<NotificationWithRelations>(
      `/notifications/${id}/status`,
      { status }
    )
    return response.data
  },
}
