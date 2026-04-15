import { USE_MOCKS } from "@/lib/constants"
import { api } from "@/services/api"
import type { UnitSchema } from "@/schemas/unit.schema"
import type { ApiListResponse } from "@/types/api"
import type { Unit } from "@/types/unit"

const mockUnits: Unit[] = [
  {
    id: 1,
    name: "UBS Centro",
    city: "Sao Paulo",
    state: "SP",
    created_at: "2026-04-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "UPA Norte",
    city: "Sao Paulo",
    state: "SP",
    created_at: "2026-04-02T10:00:00.000Z",
  },
]

export const unitService = {
  async list() {
    if (USE_MOCKS) {
      return { data: mockUnits } satisfies ApiListResponse<Unit>
    }

    const response = await api.get<ApiListResponse<Unit>>("/units")
    return response.data
  },

  async create(payload: UnitSchema) {
    if (USE_MOCKS) {
      return {
        ...payload,
        id: mockUnits.length + 1,
        created_at: new Date().toISOString(),
      } satisfies Unit
    }

    const response = await api.post<Unit>("/units", payload)
    return response.data
  },
}
