"use client"

import * as React from "react"

import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  ROUTES,
} from "@/lib/constants"
import { authService } from "@/services/auth.service"
import type { LoginCredentials } from "@/types/auth"
import type { User } from "@/types/user"

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

function setAuthCookie(token: string) {
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`
}

function clearAuthStorage() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem(AUTH_USER_KEY)
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const storedUser = window.localStorage.getItem(AUTH_USER_KEY)
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY)

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser) as User)
      } catch {
        clearAuthStorage()
      }
    }

    setIsLoading(false)
  }, [])

  const login = React.useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)

    try {
      const response = await authService.login(credentials)

      window.localStorage.setItem(AUTH_TOKEN_KEY, response.token)
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user))
      setAuthCookie(response.token)
      setUser(response.user)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = React.useCallback(async () => {
    setIsLoading(true)

    try {
      await authService.logout()
    } finally {
      clearAuthStorage()
      setUser(null)
      setIsLoading(false)
    }
  }, [])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [isLoading, login, logout, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within <AuthProvider>")
  }

  return context
}

export function redirectToLogin() {
  window.location.assign(ROUTES.login)
}
