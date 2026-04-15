import { Badge } from "@/components/ui/badge"
import type { NotificationStatus } from "@/types/notification"

const statusMap: Record<
  NotificationStatus,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  draft: {
    label: "Rascunho",
    variant: "outline",
  },
  submitted: {
    label: "Enviada",
    variant: "secondary",
  },
  in_review: {
    label: "Em analise",
    variant: "default",
  },
  returned: {
    label: "Devolvida",
    variant: "destructive",
  },
  completed: {
    label: "Concluida",
    variant: "default",
  },
  archived: {
    label: "Arquivada",
    variant: "outline",
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
