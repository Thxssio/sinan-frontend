"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { dashboardNavItems } from "@/components/layout/app-sidebar"
import { ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

export function AppHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  async function handleLogout() {
    await logout()
    router.replace(ROUTES.login)
  }

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 lg:static">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            type="button"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 lg:hidden">
              <Image
                src="/SINAN.png"
                alt="SINAN"
                width={947}
                height={305}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {user?.name ?? "Usuário"}
              </p>
            </div>
          </div>
        </div>
        <Button type="button" variant="outline" onClick={handleLogout}>
          <LogOut data-icon="inline-start" />
          Sair
        </Button>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            className="absolute inset-0 bg-foreground/30"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-16 h-[calc(100dvh-4rem)] w-72 max-w-[85vw] border-r border-border bg-background shadow-xl">
            <nav className="grid gap-1 p-3">
              {dashboardNavItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      isActive && "bg-muted font-medium text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  )
}
