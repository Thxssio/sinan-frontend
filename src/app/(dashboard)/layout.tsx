import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[256px_1fr]">
      <AppSidebar />
      <div className="flex min-w-0 flex-col">
        <AppHeader />
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  )
}
