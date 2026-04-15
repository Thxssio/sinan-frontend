import type { User } from "@/types/user"

export type Permission =
  | "dashboard:read"
  | "notifications:read"
  | "notifications:create"
  | "notifications:update"
  | "patients:read"
  | "patients:manage"
  | "units:read"
  | "units:manage"
  | "reports:read"
  | "settings:read"

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    "dashboard:read",
    "notifications:read",
    "notifications:create",
    "notifications:update",
    "patients:read",
    "patients:manage",
    "units:read",
    "units:manage",
    "reports:read",
    "settings:read",
  ],
  manager: [
    "dashboard:read",
    "notifications:read",
    "notifications:create",
    "notifications:update",
    "patients:read",
    "units:read",
    "reports:read",
  ],
  operator: [
    "dashboard:read",
    "notifications:read",
    "notifications:create",
    "patients:read",
    "units:read",
  ],
}

export function hasPermission(user: User | null, permission: Permission) {
  if (!user) {
    return false
  }

  return rolePermissions[user.role]?.includes(permission) ?? false
}
