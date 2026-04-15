import { USE_MOCKS } from "@/lib/constants"
import { api } from "@/services/api"
import type { AuthResponse, LoginCredentials } from "@/types/auth"
import type { User } from "@/types/user"

const mockUser: User = {
  id: 1,
  name: "Administrador",
  email: "admin@sinan.local",
  role: "admin",
  unit_id: 1,
}

export const authService = {
  async login(credentials: LoginCredentials) {
    if (USE_MOCKS) {
      return {
        token: "mock-token",
        user: {
          ...mockUser,
          email: credentials.email,
        },
      } satisfies AuthResponse
    }

    const response = await api.post<AuthResponse>("/auth/login", credentials)
    return response.data
  },

  async logout() {
    if (USE_MOCKS) {
      return
    }

    await api.post("/auth/logout")
  },

  async me() {
    if (USE_MOCKS) {
      return mockUser
    }

    const response = await api.get<User>("/auth/me")
    return response.data
  },
}
