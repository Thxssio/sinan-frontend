import type { User } from "@/types/user"

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type AuthResponse = {
  token: string
  user: User
}
