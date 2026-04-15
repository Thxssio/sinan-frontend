"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

import { APP_NAME, ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Notificacoes",
    href: ROUTES.notifications,
    icon: Bell,
  },
  {
    label: "Pacientes",
    href: ROUTES.patients,
    icon: Users,
  },
  {
    label: "Unidades",
    href: ROUTES.units,
    icon: Building2,
  },
  {
    label: "Relatorios",
    href: ROUTES.reports,
    icon: FileText,
  },
  {
    label: "Configuracoes",
    href: ROUTES.settings,
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-64 border-r bg-background lg:block">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BarChart3 className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{APP_NAME}</p>
          <p className="text-xs text-muted-foreground">Vigilancia em saude</p>
        </div>
      </div>
      <nav className="grid gap-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "bg-muted font-medium text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
