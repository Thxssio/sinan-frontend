import { aidsNotificationDefinition } from "@/features/notifications/definitions/aids"
import { venomousAnimalNotificationDefinition } from "@/features/notifications/definitions/venomous-animal"

export { aidsNotificationDefinition, venomousAnimalNotificationDefinition }
export * from "@/features/notifications/definitions/shared"

export const notificationTypeDefinitionList = [
  aidsNotificationDefinition,
  venomousAnimalNotificationDefinition,
] as const

export const notificationTypeDefinitions = {
  aids: aidsNotificationDefinition,
  venomous_animal: venomousAnimalNotificationDefinition,
} as const
