"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { APP_NAME, ROUTES } from "@/lib/constants"
import { useAuth } from "@/hooks/use-auth"

export function AppHeader() {
  const router = useRouter()
  const { logout, user } = useAuth()

  async function handleLogout() {
    await logout()
    router.replace(ROUTES.login)
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" asChild>
          <Link href={ROUTES.dashboard} aria-label="Abrir menu">
            <Menu />
          </Link>
        </Button>
        <div>
          <p className="text-sm font-semibold lg:hidden">{APP_NAME}</p>
          <p className="text-xs text-muted-foreground">
            {user?.name ?? "Usuario"}
          </p>
        </div>
      </div>
      <Button type="button" variant="outline" onClick={handleLogout}>
        <LogOut data-icon="inline-start" />
        Sair
      </Button>
    </header>
  )
}
