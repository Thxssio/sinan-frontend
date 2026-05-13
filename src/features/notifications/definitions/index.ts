import { aidsNotificationDefinition } from "@/features/notifications/definitions/aids"
import { venomousAnimalNotificationDefinition } from "@/features/notifications/definitions/venomous-animal"

import { botulismNotificationDefinition } from "@/features/notifications/definitions/botulism"
import { choleraNotificationDefinition } from "@/features/notifications/definitions/cholera"

export { aidsNotificationDefinition, venomousAnimalNotificationDefinition, botulismNotificationDefinition, choleraNotificationDefinition }
export * from "@/features/notifications/definitions/shared"

export const notificationTypeDefinitionList = [
  aidsNotificationDefinition,
  venomousAnimalNotificationDefinition,
  botulismNotificationDefinition,
  choleraNotificationDefinition,
] as const

export const notificationTypeDefinitions = {
  aids: aidsNotificationDefinition,
  venomous_animal: venomousAnimalNotificationDefinition,
  botulism: botulismNotificationDefinition,
  cholera: choleraNotificationDefinition,
} as const
