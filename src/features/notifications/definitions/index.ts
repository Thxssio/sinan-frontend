import { aidsChildrenNotificationDefinition } from "@/features/notifications/definitions/aids_under_13"
import { aidsNotificationDefinition } from "@/features/notifications/definitions/aids"
import { antiRabiesNotificationDefinition } from "@/features/notifications/definitions/anti_rabies"
import { botulismNotificationDefinition } from "@/features/notifications/definitions/botulism"
import { choleraNotificationDefinition } from "@/features/notifications/definitions/cholera"
import { chikungunyaFeverNotificationDefinition } from "@/features/notifications/definitions/Febre-de-Chikungunya"
import { leprosyNotificationDefinition } from "@/features/notifications/definitions/Hanseníase"
import { hantavirusNotificationDefinition } from "@/features/notifications/definitions/Hantavirose"
import { viralHepatitisNotificationDefinition } from "@/features/notifications/definitions/Hepatites Virais"
import { sragNotificationDefinition } from "@/features/notifications/definitions/Influenza"
import { exogenousPoisoningNotificationDefinition } from "@/features/notifications/definitions/Intoxicação Exógena"
import { exanthematicFeversNotificationDefinition } from "@/features/notifications/definitions/Sarampo"
import { dtaOutbreakNotificationDefinition } from "@/features/notifications/definitions/Surto Doenças Transmitidas por Alimentos - DTA"
import { congenitalSyphilisNotificationDefinition } from "@/features/notifications/definitions/Sífilis Congênita"
import { pregnantSyphilisNotificationDefinition } from "@/features/notifications/definitions/Sífilis em Gestante"
import { congenitalRubellaNotificationDefinition } from "@/features/notifications/definitions/Síndrome da Rubéola Congênita"
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
import { mentalDisordersNotificationDefinition } from "@/features/notifications/definitions/mental_disorder"
import { exanthematousDiseasesNotificationDefinition } from "@/features/notifications/definitions/exanthematous_diseases"
import { rotavirusNotificationDefinition } from "@/features/notifications/definitions/rotavirus"
import { rabiesNotificationDefinition } from "@/features/notifications/definitions/rabies"
import { plagueNotificationDefinition } from "@/features/notifications/definitions/plague"
import { polioNotificationDefinition } from "@/features/notifications/definitions/polio"
import { genericNotificationDefinition } from "@/features/notifications/definitions/generic"
import { individualNotificationDefinition } from "@/features/notifications/definitions/individual"
import { outbreakNotificationDefinition } from "@/features/notifications/definitions/surto"
export {
  aidsChildrenNotificationDefinition,
  aidsNotificationDefinition,
  antiRabiesNotificationDefinition,
  botulismNotificationDefinition,
  chikungunyaFeverNotificationDefinition,
  choleraNotificationDefinition,
  congenitalRubellaNotificationDefinition,
  congenitalSyphilisNotificationDefinition,
  dengueChikungunyaNotificationDefinition,
  dtaOutbreakNotificationDefinition,
  epizootyNotificationDefinition,
  exanthematicFeversNotificationDefinition,
  exogenousPoisoningNotificationDefinition,
  schistosomiasisNotificationDefinition,
  hantavirusNotificationDefinition,
  leprosyNotificationDefinition,
  yellowFeverNotificationDefinition,
  venomousAnimalNotificationDefinition,
  whoopingCoughNotificationDefinition,
  occupationalDermatosesNotificationDefinition,
  biologicalMaterialExposureNotificationDefinition,
  lerDortNotificationDefinition,
  pairNotificationDefinition,
  pneumoconiosesNotificationDefinition,
  mentalDisordersNotificationDefinition,
  exanthematousDiseasesNotificationDefinition,
  rotavirusNotificationDefinition,
  rabiesNotificationDefinition,
  plagueNotificationDefinition,
  polioNotificationDefinition,
  genericNotificationDefinition,
  individualNotificationDefinition,
  outbreakNotificationDefinition,
  pregnantSyphilisNotificationDefinition,
  sragNotificationDefinition,
  viralHepatitisNotificationDefinition
}
export * from "@/features/notifications/definitions/shared"

export const notificationTypeDefinitionList = [
  aidsChildrenNotificationDefinition,
  aidsNotificationDefinition,
  venomousAnimalNotificationDefinition,
  botulismNotificationDefinition,
  leprosyNotificationDefinition,
  hantavirusNotificationDefinition,
  viralHepatitisNotificationDefinition,
  sragNotificationDefinition,
  exogenousPoisoningNotificationDefinition,
  exanthematicFeversNotificationDefinition,
  dtaOutbreakNotificationDefinition,
  congenitalSyphilisNotificationDefinition,
  pregnantSyphilisNotificationDefinition,
  congenitalRubellaNotificationDefinition,
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
  pneumoconiosesNotificationDefinition,
  mentalDisordersNotificationDefinition,
  exanthematousDiseasesNotificationDefinition,
  rotavirusNotificationDefinition,
  rabiesNotificationDefinition,
  plagueNotificationDefinition,
  polioNotificationDefinition,
  genericNotificationDefinition,
  individualNotificationDefinition,
  outbreakNotificationDefinition
] as const

export const notificationTypeDefinitions = {
  aids_under_13: aidsChildrenNotificationDefinition,
  aids: aidsNotificationDefinition,
  venomous_animal: venomousAnimalNotificationDefinition,
  botulism: botulismNotificationDefinition,
  hanseniase: leprosyNotificationDefinition,
  hantavirose: hantavirusNotificationDefinition,
  "hepatites-virais": viralHepatitisNotificationDefinition,
  srag: sragNotificationDefinition,
  "intoxicacao-exogena": exogenousPoisoningNotificationDefinition,
  "doencas-exantematicas": exanthematicFeversNotificationDefinition,
  "surto-dta": dtaOutbreakNotificationDefinition,
  "sifilis-congenita": congenitalSyphilisNotificationDefinition,
  "sifilis-gestante": pregnantSyphilisNotificationDefinition,
  "rubeola-congenita": congenitalRubellaNotificationDefinition,
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
  pneumoconioses: pneumoconiosesNotificationDefinition,
  mental_disorder: mentalDisordersNotificationDefinition,
  exanthematous_diseases: exanthematousDiseasesNotificationDefinition,
  rotavirus: rotavirusNotificationDefinition,
  rabies: rabiesNotificationDefinition,
  plague: plagueNotificationDefinition,
  polio: polioNotificationDefinition,
  generic: genericNotificationDefinition,
  individual: individualNotificationDefinition,
  surto: outbreakNotificationDefinition
} as const
