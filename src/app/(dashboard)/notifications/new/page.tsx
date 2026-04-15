"use client"

import { useRouter } from "next/navigation"

import { PageTitle } from "@/components/layout/page-title"
import { NotificationForm } from "@/components/notifications/notification-form"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"
import { useCreateNotification } from "@/hooks/use-notifications"
import type { NotificationSchema } from "@/schemas/notification.schema"

export default function NewNotificationPage() {
  const router = useRouter()
  const createNotification = useCreateNotification()

  async function handleSubmit(values: NotificationSchema) {
    await createNotification.mutateAsync(values)
    router.push(ROUTES.notifications)
  }

  return (
    <>
      <PageTitle title="Nova notificacao" />
      <Card>
        <CardContent>
          <NotificationForm
            onSubmit={handleSubmit}
            isSubmitting={createNotification.isPending}
          />
        </CardContent>
      </Card>
    </>
  )
}
