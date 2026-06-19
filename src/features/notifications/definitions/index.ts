import { aidsChildrenNotificationDefinition } from "@/features/notifications/definitions/aids"
import { antiRabiesNotificationDefinition } from "@/features/notifications/definitions/anti_rabies"
import { botulismNotificationDefinition } from "@/features/notifications/definitions/botulism"
import { choleraNotificationDefinition } from "@/features/notifications/definitions/cholera"
import { chikungunyaFeverNotificationDefinition } from "@/features/notifications/definitions/Febre-de-Chikungunya"
import { dengueChikungunyaNotificationDefinition } from "@/features/notifications/definitions/dengue"
import { epizootyNotificationDefinition } from "@/features/notifications/definitions/epizootia"
import { schistosomiasisNotificationDefinition } from "@/features/notifications/definitions/esquistossomose"
import { yellowFeverNotificationDefinition } from "@/features/notifications/definitions/febre-amarela"
import { venomousAnimalNotificationDefinition } from "@/features/notifications/definitions/venomous-animal"
import { whoopingCoughNotificationDefinition } from "@/features/notifications/definitions/whooping-cough"
import { occupationalDermatosesNotificationDefinition } from "@/features/notifications/definitions/occupational_dermatoses"
import { biologicalMaterialExposureNotificationDefinition } from "@/features/notifications/definitions/exposure_to_biological_material"
import { lerDortNotificationDefinition } from "@/features/notifications/definitions/ler_dort"
import { pairNotificationDefinition } from "@/features/notifications/definitions/pair"
import { pneumoconiosesNotificationDefinition } from "@/features/notifications/definitions/pneumoconiose"
export {
  aidsChildrenNotificationDefinition,
  antiRabiesNotificationDefinition,
  botulismNotificationDefinition,
  chikungunyaFeverNotificationDefinition,
  choleraNotificationDefinition,
  dengueChikungunyaNotificationDefinition,
  epizootyNotificationDefinition,
  schistosomiasisNotificationDefinition,
  yellowFeverNotificationDefinition,
  venomousAnimalNotificationDefinition,
  whoopingCoughNotificationDefinition,
  occupationalDermatosesNotificationDefinition,
  biologicalMaterialExposureNotificationDefinition,
  lerDortNotificationDefinition,
  pairNotificationDefinition,
  pneumoconiosesNotificationDefinition
}
export * from "@/features/notifications/definitions/shared"

export const notificationTypeDefinitionList = [
  aidsChildrenNotificationDefinition,
  venomousAnimalNotificationDefinition,
  botulismNotificationDefinition,
  epizootyNotificationDefinition,
  schistosomiasisNotificationDefinition,
  yellowFeverNotificationDefinition,
  choleraNotificationDefinition,
  whoopingCoughNotificationDefinition,
  dengueChikungunyaNotificationDefinition,
  antiRabiesNotificationDefinition,
  chikungunyaFeverNotificationDefinition,
  occupationalDermatosesNotificationDefinition,
  biologicalMaterialExposureNotificationDefinition,
  lerDortNotificationDefinition,
  pairNotificationDefinition,
  pneumoconiosesNotificationDefinition
] as const

export const notificationTypeDefinitions = {
  aids: aidsChildrenNotificationDefinition,
  venomous_animal: venomousAnimalNotificationDefinition,
  botulism: botulismNotificationDefinition,
  epizooty: epizootyNotificationDefinition,
  schistosomiasis: schistosomiasisNotificationDefinition,
  yellow_fever: yellowFeverNotificationDefinition,
  cholera: choleraNotificationDefinition,
  whooping_cough: whoopingCoughNotificationDefinition,
  dengue_chikungunya: dengueChikungunyaNotificationDefinition,
  anti_rabies: antiRabiesNotificationDefinition,
  chikungunya_fever: chikungunyaFeverNotificationDefinition,
  occupational_dermatoses: occupationalDermatosesNotificationDefinition,
  biological_material_exposure: biologicalMaterialExposureNotificationDefinition,
  ler_dort: lerDortNotificationDefinition,
  pair: pairNotificationDefinition,
  pneumoconioses: pneumoconiosesNotificationDefinition
} as const
