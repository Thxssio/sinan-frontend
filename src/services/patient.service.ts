import { USE_MOCKS } from "@/lib/constants"
import { api } from "@/services/api"
import type { PatientSchema } from "@/schemas/patient.schema"
import type { ApiListResponse } from "@/types/api"
import type { Patient } from "@/types/patient"

const mockPatients: Patient[] = [
  {
    id: 1,
    name: "Maria Oliveira",
    document: "12345678900",
    birth_date: "1990-02-12",
    phone: "(11) 99999-0000",
    created_at: "2026-04-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Joao Santos",
    document: "98765432100",
    birth_date: "1984-07-21",
    created_at: "2026-04-02T10:00:00.000Z",
  },
]

export const patientService = {
  async list() {
    if (USE_MOCKS) {
      return { data: mockPatients } satisfies ApiListResponse<Patient>
    }

    const response = await api.get<ApiListResponse<Patient>>("/patients")
    return response.data
  },

  async create(payload: PatientSchema) {
    if (USE_MOCKS) {
      return {
        ...payload,
        id: mockPatients.length + 1,
        created_at: new Date().toISOString(),
      } satisfies Patient
    }

    const response = await api.post<Patient>("/patients", payload)
    return response.data
  },
}
