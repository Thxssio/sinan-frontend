import { USE_MOCKS } from "@/lib/constants"
import { api } from "@/services/api"

export type DashboardSummary = {
  totalNotifications: number
  submittedNotifications: number
  inReviewNotifications: number
  completedNotifications: number
  monthly: Array<{
    month: string
    notifications: number
    completed: number
  }>
  byStatus: Array<{
    status: string
    total: number
  }>
}

const mockDashboardSummary: DashboardSummary = {
  totalNotifications: 84,
  submittedNotifications: 31,
  inReviewNotifications: 18,
  completedNotifications: 22,
  monthly: [
    { month: "Jan", notifications: 8, completed: 3 },
    { month: "Fev", notifications: 11, completed: 4 },
    { month: "Mar", notifications: 19, completed: 8 },
    { month: "Abr", notifications: 24, completed: 7 },
  ],
  byStatus: [
    { status: "Rascunho", total: 13 },
    { status: "Enviadas", total: 31 },
    { status: "Em analise", total: 18 },
    { status: "Concluidas", total: 22 },
  ],
}

export const dashboardService = {
  async summary() {
    if (USE_MOCKS) {
      return mockDashboardSummary
    }

    const response = await api.get<DashboardSummary>("/dashboard")
    return response.data
  },
}
