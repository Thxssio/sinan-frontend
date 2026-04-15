import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { NotificationSchema } from "@/schemas/notification.schema"
import { notificationService } from "@/services/notification.service"

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.list,
  })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: NotificationSchema) =>
      notificationService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}
