"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

import { ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"

export const dashboardNavItems = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Notificações",
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
    label: "Relatórios",
    href: ROUTES.reports,
    icon: FileText,
  },
  {
    label: "Configurações",
    href: ROUTES.settings,
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-64 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-5">
        <Image
          src="/SINAN.png"
          alt="SINAN"
          width={947}
          height={305}
          className="h-12 w-auto object-contain"
          priority
        />
      </div>
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
