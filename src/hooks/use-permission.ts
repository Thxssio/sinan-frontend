import { hasPermission, type Permission } from "@/lib/permissions"
import { useAuth } from "@/hooks/use-auth"

export function usePermission(permission: Permission) {
  const { user } = useAuth()

  return hasPermission(user, permission)
}
