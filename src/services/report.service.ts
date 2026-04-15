import { USE_MOCKS } from "@/lib/constants"
import { api } from "@/services/api"

export type ReportSummary = {
  generatedAt: string
  totalNotifications: number
  totalPatients: number
  totalUnits: number
}

export const reportService = {
  async summary() {
    if (USE_MOCKS) {
      return {
        generatedAt: new Date().toISOString(),
        totalNotifications: 84,
        totalPatients: 2,
        totalUnits: 2,
      } satisfies ReportSummary
    }

    const response = await api.get<ReportSummary>("/reports/summary")
    return response.data
  },
}
