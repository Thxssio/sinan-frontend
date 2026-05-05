import { aidsNotificationDefinition } from "@/features/notifications/definitions/aids"
import { venomousAnimalNotificationDefinition } from "@/features/notifications/definitions/venomous-animal"

import { botulismNotificationDefinition } from "@/features/notifications/definitions/botulism"

export { aidsNotificationDefinition, venomousAnimalNotificationDefinition, botulismNotificationDefinition }
export * from "@/features/notifications/definitions/shared"

export const notificationTypeDefinitionList = [
  aidsNotificationDefinition,
  venomousAnimalNotificationDefinition,
  botulismNotificationDefinition,
] as const

export const notificationTypeDefinitions = {
  aids: aidsNotificationDefinition,
  venomous_animal: venomousAnimalNotificationDefinition,
  botulism: botulismNotificationDefinition,
} as const
