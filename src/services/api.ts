import axios, { AxiosError } from "axios"

import {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  ROUTES,
} from "@/lib/constants"
import type { ApiErrorResponse } from "@/types/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_TOKEN_KEY)
      window.localStorage.removeItem(AUTH_USER_KEY)
      document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`

      if (window.location.pathname !== ROUTES.login) {
        window.location.assign(ROUTES.login)
      }
    }

    return Promise.reject(error)
  }
)

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      error.message ??
      "Erro ao comunicar com a API"
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Erro inesperado"
}
