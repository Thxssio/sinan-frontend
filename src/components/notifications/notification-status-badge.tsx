import { Badge } from "@/components/ui/badge"
import type { NotificationStatus } from "@/types/notification"

const statusMap: Record<
  NotificationStatus,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  pending: {
    label: "Pendente",
    variant: "outline",
  },
  in_review: {
    label: "Em análise",
    variant: "default",
  },
  resolved: {
    label: "Resolvida",
    variant: "secondary",
  },
}

export function NotificationStatusBadge({
  status,
}: {
  status: NotificationStatus
}) {
  const config = statusMap[status]

  return <Badge variant={config.variant}>{config.label}</Badge>
}
