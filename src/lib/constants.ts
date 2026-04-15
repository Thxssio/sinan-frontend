export const APP_NAME = "SINAN"

export const AUTH_TOKEN_KEY = "sinan.token"
export const AUTH_USER_KEY = "sinan.user"

export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  notifications: "/notifications",
  patients: "/patients",
  units: "/units",
  reports: "/reports",
  settings: "/settings",
} as const

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"

export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false"
